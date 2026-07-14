import React, { useEffect, useState } from 'react'
import { Typography, Card, Row, Col, List, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { getAnnouncements, getNews } from '../../services/api'

const { Title } = Typography

export default function Home() {
  const [announcements, setAnnouncements] = useState([])
  const [news, setNews] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getAnnouncements().then(res => { if (res.code === 200) setAnnouncements(res.data) }).catch(() => {})
    getNews().then(res => { if (res.code === 200) setNews(res.data) }).catch(() => {})
  }, [])

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <Title level={2}>智慧校园服务平台</Title>
        <p style={{ color: '#666', fontSize: 16 }}>整合校园信息，提供便捷服务</p>
        <Button type="primary" size="large" onClick={() => navigate('/login')}>登录系统</Button>
      </div>
      <Row gutter={24}>
        <Col span={12}>
          <Card title="系统公告" size="small">
            <List dataSource={announcements} renderItem={item => (
              <List.Item><List.Item.Meta title={item.title} description={item.publishTime} /></List.Item>
            )} locale={{ emptyText: '暂无公告' }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="学校新闻" size="small">
            <List dataSource={news} renderItem={item => (
              <List.Item><List.Item.Meta title={item.title} description={`${item.publishTime} 浏览:${item.viewCount}`} /></List.Item>
            )} locale={{ emptyText: '暂无新闻' }} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
