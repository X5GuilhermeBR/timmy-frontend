import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchMemberById } from '../../services/api'
import './index.css'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout, theme, Spin } from 'antd'
import Navigation from '../../components/Menu'
import Forms from '../../components/Forms'

const { Header, Sider, Content } = Layout

const EditMember: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [memberData, setMemberData] = useState(null)
  const { id } = useParams<{ id: string }>()

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        if (id) {
          const data = await fetchMemberById(id)
          setMemberData(data)
        }
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchMemberData()
    }
  }, [id])

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
          {loading ? (
            <Spin size="large" />
          ) : (
            <Forms initialValues={memberData} />
          )}
        </Content>
      </Layout>
    </Layout>
  )
}

export default EditMember
