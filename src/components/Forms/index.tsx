import React, { useEffect, useState } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import "./index.css"
import { DatePicker, Form, Input, Select, Switch, Button, message } from "antd"
import moment from "moment"
import { fetchMemberById, createMember, updateMember, updateMemberStatus, getCepData, createAddress } from "../../services/api"

type SizeType = Parameters<typeof Form>[0]["size"]

const Forms: React.FC = () => {
    const { id } = useParams<{ id?: string }>()
    const location = useLocation()
    const isCreating = location.pathname.includes("criar-membro")
    const [componentSize, setComponentSize] = useState<SizeType | "default">("default")
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const [currentId, setCurrentId] = useState<string | undefined>(id)

    useEffect(() => {
        setCurrentId(id)
    }, [id])

    useEffect(() => {
        if (!isCreating && currentId) {
            fetchData(currentId)
        }
    }, [currentId, isCreating])

    const fetchData = async (id: string) => {
        try {
            setLoading(true)
            const member = await fetchMemberById(id)
            form.setFieldsValue({
                nome: member.full_name,
                sexo: member.gender,
                celular: member.phone_number,
                estadoCivil: member.marital_status,
                dataDeNascimento: member.date_of_birth ? moment(member.date_of_birth, "YYYY-MM-DD") : null,
                dataDeBatismo: member.baptism_date ? moment(member.baptism_date, "YYYY-MM-DD") : null,
                membro: member.is_actived,
            })
        } catch (error) {
            message.error("Erro ao carregar os dados do membro!")
        } finally {
            setLoading(false)
        }
    }

    const onSubmit = async (values: any) => {
        try {
            setLoading(true)

            const memberData = {
                full_name: values.nome,
                gender: values.sexo,
                phone_number: values.celular,
                marital_status: values.estadoCivil,
                date_of_birth: values.dataDeNascimento ? values.dataDeNascimento.format("YYYY-MM-DD") : null,
                baptism_date: values.dataDeBatismo ? values.dataDeBatismo.format("YYYY-MM-DD") : null,
                is_actived: values.membro,
            }

            const addressData = {
                street: values.logradouro,
                number: values.numero,
                complement: values?.complemento,
                city: values.cidade,
                state: values.estado,
                zip_code: values.cep,
                country: "Brasil"
            }

            if (isCreating) {
                const uuid = crypto.randomUUID()

                const userData = {
                    email: `${uuid}@email.com`,
                    password: "123",
                    activated: true,
                    avatar_url: "https://example.com/avatar.jpg"
                }

                const payload = { user: userData, member: memberData }

                const response = await createMember(payload)

                if (response?.data?.member?.id) {

                    const result = await createAddress({ ...addressData, member_id: response.data.member.id })

                    if (result?.data?.address?.id) {
                        message.success("Membro criado com sucesso!")
                    } else {
                        message.warning("Não foi possível associar o endereço ao membro atual. Por favor, atualize-o mais tarde.")
                    }

                    navigate(`/editar-membro/${response.data.member.id}`, { replace: true })
                }
            } else {
                await Promise.all([
                    updateMember(currentId, memberData),
                    updateMemberStatus(currentId, values.membro),
                ])
                message.success("Membro atualizado com sucesso!")
                form.setFieldsValue(memberData)
            }
        } catch (error) {
            message.error("Erro ao salvar os dados do membro!")
        } finally {
            setLoading(false)
        }
    }

    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size)
    }

    const searchAddressInfo = async () => {

        const currentCep = form.getFieldValue('cep')

        if (currentCep) {
            const cepData = await getCepData(currentCep)
            form.setFieldsValue({
                ...form.getFieldsValue(),
                logradouro: cepData?.logradouro,
                cidade: cepData?.localidade,
                estado: cepData?.uf
            })
        }

    }

    return (
        <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{ size: componentSize, membro: true }}
            onValuesChange={onFormLayoutChange}
            onFinish={onSubmit}
            requiredMark={'optional'}
        >

            {loading && <p>Carregando...</p>}
            <Form.Item label="Nome completo" name="nome" rules={[{ required: true, message: "Nome completo é obrigatório." }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Sexo" name="sexo" rules={[{ required: true, message: "Campo obrigatório." }]}>
                <Select placeholder="Selecionar opção">
                    <Select.Option value="male">
                        Masculino
                    </Select.Option>
                    <Select.Option value="female">
                        Feminino
                    </Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Celular" name="celular" rules={[{ required: true, message: "Celular é obrigatório." }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Estado Civil" name="estadoCivil" rules={[{ required: true, message: "Estado civil é obrigatório." }]}>
                <Select placeholder='Selecionar opção'>
                    <Select.Option value="single">Solteiro</Select.Option>
                    <Select.Option value="married">Casado</Select.Option>
                    <Select.Option value="widowed">Viúvo</Select.Option>
                    <Select.Option value="divorced">Divorciado</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Data de Nascimento" name="dataDeNascimento" rules={[{ required: true, message: "Data de nascimento é obrigatório." }]}>
                <DatePicker format="DD/MM/YYYY" />
            </Form.Item>
            <Form.Item label="Data do Batismo" name="dataDeBatismo">
                <DatePicker format="DD/MM/YYYY" />
            </Form.Item>
            <Form.Item label="CEP" name="cep" rules={[{ required: true, message: "CEP é obrigatório." }]}>
                <Input onBlur={searchAddressInfo} />
            </Form.Item>
            <Form.Item label="Logradouro" name="logradouro" rules={[{ required: true, message: "Logradouro é obrigatório." }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Número" name="numero" rules={[{ required: true, message: "Número é obrigatório." }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Complemento" name="complemento" >
                <Input />
            </Form.Item>
            <Form.Item label="Cidade" name="cidade" rules={[{ required: true, message: "Cidade é obrigatório." }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Estado" name="estado" rules={[{ required: true, message: "Estado é obrigatório." }]}>
                <Input />
            </Form.Item>

            {!isCreating && (
                <Form.Item label="Ativo" name="membro" valuePropName="checked">
                    <Switch />
                </Form.Item>
            )}
            <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    {isCreating ? "Criar Membro" : "Atualizar"}
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Forms
