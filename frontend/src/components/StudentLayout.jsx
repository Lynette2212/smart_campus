import React from 'react'
import { Layout, Menu, Button, Typography } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { HomeOutlined, BookOutlined, ScheduleOutlined, TrophyOutlined, LogoutOutlined } from '@ant-design/icons'

const { Header, Sider, Content } = Layout
const { Title } = Typography

export default function StudentLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const name = localStorage.getItem('realName') || '同学'

  const menuItems = [
    { key: '/student', icon: <HomeOutlined />, label: '首页' },
    { key: '/student/courses', icon: <BookOutlined />, label: '课程列表' },
    { key: '/student/my-courses', icon: <ScheduleOutlined />, label: '我的选课' },
    { key: '/student/grades', icon: <TrophyOutlined />, label: '我的成绩' },
  ]

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark" width={200}>
        <div style={{ padding: '20px', textAlign: 'center', color: '#fff' }}>
          <Title level={5} style={{ color: '#fff', margin: 0 }}>智慧校园</Title>
          <small>学生门户</small>
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
