import React, { useState } from 'react'
import './index.css'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout, theme } from 'antd'
import Navigation from '../../components/Menu'
import Forms from '../../components/Forms'

const { Header, Sider, Content } = Layout

const CreateMember: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const memberData = {
    name: '',
    email: '',
    role: '',
    isActive: true,
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Navigation />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Forms initialValues={memberData} />
        </Content>
      </Layout>
    </Layout>
  )
}

export default CreateMember
