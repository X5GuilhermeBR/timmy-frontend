import { Button, Flex, Form, Input, message } from 'antd';
import React from 'react';
import { AuthProps } from './types';
import { useAuth } from '../../hooks/useAuth';


const Login: React.FC = () => {

    const [form] = Form.useForm<AuthProps>();
    const { login } = useAuth();


    const handleFormSubmit = (values: AuthProps) => {
        const { user, password } = values;
        const result = login(user, password);

        if (!result) message.error('Usuário e/ou senha inválidos!')
    }

    return <Flex justify='center' align='center' style={{
        height: '100dvh',
        width: '100dvw'
    }}>
        <Form name='login' onFinish={handleFormSubmit} form={form} requiredMark='optional' layout='vertical'>
            <Form.Item label='Usuário' name='user' rules={[{ required: true, message: "Informe seu usuário" }]}>
                <Input placeholder='Insira seu usuário' />
            </Form.Item>
            <Form.Item label='Senha' name='password' rules={[{ required: true, message: "Insira sua senha" }]}>
                <Input type='password' placeholder='Insira sua senha' />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit">Entrar</Button>
            </Form.Item>
        </Form>
    </Flex>;
}

export default Login;