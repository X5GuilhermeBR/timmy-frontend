import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./index.css"
import { DatePicker, Form, Input, Select, Switch, Button, message } from "antd"
import moment from "moment"
import { fetchMemberById, updateMember } from '../../services/api'

type SizeType = Parameters<typeof Form>[0]["size"]

const Forms: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [componentSize, setComponentSize] = useState<SizeType | "default">(
        "default"
    )
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setLoading(true)
            const member = await fetchMemberById(id)
            form.setFieldsValue({
                nome: member.full_name,
                celular: member.phone_number,
                estadoCivil: member.marital_status,
                dataDeNascimento: member.date_of_birth
                    ? moment(member.date_of_birth, "YYYY-MM-DD")
                    : null,
                dataDeBatismo: member.baptism_date
                    ? moment(member.baptism_date, "YYYY-MM-DD")
                    : null,
                membro: member.is_actived,
            })
        } catch (error) {
            message.error("Erro ao carregar os dados do membro!")
        } finally {
            setLoading(false)
        }
    }

    const onUpdate = async (values: any) => {
        try {
            setLoading(true)
            const updatedData = {
                full_name: values.nome,
                phone_number: values.celular,
                marital_status: values.estadoCivil,
                date_of_birth: values.dataDeNascimento
                    ? values.dataDeNascimento.format("YYYY-MM-DD")
                    : null,
                baptism_date: values.dataDeBatismo
                    ? values.dataDeBatismo.format("YYYY-MM-DD")
                    : null,
            }

            await updateMember(id, updatedData)
            message.success("Membro atualizado com sucesso!")
        } catch (error) {
            message.error("Erro ao atualizar o membro!")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id) {
            fetchData()
        }
    }, [id])

    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size)
    }

    return (
        <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{ size: componentSize }}
            onValuesChange={onFormLayoutChange}
            onFinish={onUpdate}
        >
            {loading && <p>Carregando...</p>}
            <Form.Item label="Nome" name="nome">
                <Input />
            </Form.Item>
            <Form.Item label="Celular" name="celular">
                <Input />
            </Form.Item>
            <Form.Item label="Estado Civil" name="estadoCivil">
                <Select>
                    <Select.Option value="single">Solteiro</Select.Option>
                    <Select.Option value="married">Casado</Select.Option>
                    <Select.Option value="widowed">Viúvo</Select.Option>
                    <Select.Option value="divorced">Divorciado</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Data de Nascimento" name="dataDeNascimento">
                <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item label="Data do Batismo" name="dataDeBatismo">
                <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item label="Ativo" name="membro" valuePropName="checked">
                <Switch />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Atualizar
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Forms
