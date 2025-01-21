import React, { useState } from "react"
import "./index.css"
import {
    DatePicker,
    Form,
    Input,
    Select,
    Switch,
} from "antd"

type SizeType = Parameters<typeof Form>[0]["size"]

const Forms: React.FC = () => {
    const [componentSize, setComponentSize] = useState<SizeType | "default">(
        "default"
    )

    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size)
    }

    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{ size: componentSize }}
            onValuesChange={onFormLayoutChange}
        >
            <Form.Item label="Nome">
                <Input />
            </Form.Item>
            <Form.Item label="Estado Civil">
                <Select>
                    <Select.Option value="demo">Solteiro</Select.Option>
                    <Select.Option value="demo">Casado</Select.Option>
                    <Select.Option value="demo">Viúvo</Select.Option>
                    <Select.Option value="demo">Divorciado</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Data de Nascimento">
                <DatePicker />
            </Form.Item>
            <Form.Item label="Data do Batismo">
                <DatePicker />
            </Form.Item>
            <Form.Item label="Membro" valuePropName="checked">
                <Switch />
            </Form.Item>
        </Form>
    )
}

export default Forms
