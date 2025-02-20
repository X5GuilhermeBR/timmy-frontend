import React, { useEffect, useState } from 'react'
import './index.css'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { Button, Layout, theme } from 'antd'
import Board from '../../components/List'
import { fetchMembers } from '../../services/api'
import Navigation from '../../components/Menu'
import { ListItem } from './types'
import { useNavigate } from 'react-router-dom'

const { Header, Sider, Content } = Layout

const Member: React.FC = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const [list, setList] = useState<ListItem[]>([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const members = await fetchMembers()
      setList(members.data)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Navigation />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px', background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
        <div style={{ padding: '16px', paddingLeft: '24px' }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate(`/criar-membro`)}>
            Criar Novo Membro
          </Button>
        </div>
        <Content
          style={{
            margin: '0px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Board list={list} loading={loading} />
        </Content>
      </Layout>
    </Layout>
  )
}

export default Member
