import React from 'react'
import { Layout, Menu, Button, Typography } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { HomeOutlined, TeamOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'

const { Header, Sider, Content } = Layout
const { Title } = Typography

export default function LeaderLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const name = localStorage.getItem('realName') || '领导'

  const menuItems = [
    { key: '/leader', icon: <HomeOutlined />, label: '首页概览' },
    { key: '/leader/students', icon: <UserOutlined />, label: '学生管理' },
    { key: '/leader/teachers', icon: <TeamOutlined />, label: '教师管理' },
  ]

  const handleLogout = () => { localStorage.clear(); navigate('/login') }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark" width={200}>
        <div style={{ padding: '20px', textAlign: 'center', color: '#fff' }}>
          <Title level={5} style={{ color: '#fff', margin: 0 }}>智慧校园</Title>
          <small>领导门户</small>
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}
              items={menuItems} onClick={({ key }) => navigate(key)} />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
          <span>欢迎，{name}</span>
          <Button icon={<LogoutOutlined />} onClick={handleLogout}>退出登录</Button>
        </Header>
        <Content style={{ margin: 24, padding: 24, background: '#fff', borderRadius: 8, minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
