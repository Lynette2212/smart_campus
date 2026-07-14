import React, { useEffect, useState } from 'react'
import { Typography, Card, Row, Col, List, Button, Modal, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import { getAnnouncements, getNews, getAnnouncement, getNewsDetail } from '../../services/api'

const { Title } = Typography

export default function Home() {
  const [announcements, setAnnouncements] = useState([])
  const [news, setNews] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [modalData, setModalData] = useState(null)
  const [modalType, setModalType] = useState('') // 'announcement' or 'news'
  const navigate = useNavigate()

  useEffect(() => {
    getAnnouncements().then(res => { if (res.code === 200) setAnnouncements(res.data) }).catch(() => {})
    getNews().then(res => { if (res.code === 200) setNews(res.data) }).catch(() => {})
  }, [])

  const handleAnnouncementClick = async (id) => {
    const res = await getAnnouncement(id)
    if (res.code === 200) {
      setModalData(res.data)
      setModalType('announcement')
      setModalVisible(true)
    }
  }

  const handleNewsClick = async (id) => {
    const res = await getNewsDetail(id)
    if (res.code === 200) {
      setModalData(res.data)
      setModalType('news')
      setModalVisible(true)
    }
  }

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
              <List.Item>
                <List.Item.Meta
                  title={
                    <a onClick={() => handleAnnouncementClick(item.id)} style={{ cursor: 'pointer', color: '#1890ff' }}>
                      {item.top && <Tag color="red" style={{ marginRight: 8 }}>置顶</Tag>}
                      {item.title}
                    </a>
                  }
                  description={item.publishTime}
                />
              </List.Item>
            )} locale={{ emptyText: '暂无公告' }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="学校新闻" size="small">
            <List dataSource={news} renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <a onClick={() => handleNewsClick(item.id)} style={{ cursor: 'pointer', color: '#1890ff' }}>
                      {item.title}
                    </a>
                  }
                  description={`${item.publishTime} 浏览:${item.viewCount}`}
                />
              </List.Item>
            )} locale={{ emptyText: '暂无新闻' }} />
          </Card>
        </Col>
      </Row>

      {/* 详情弹窗 */}
      <Modal
        title={modalType === 'announcement' ? '公告详情' : '新闻详情'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={700}
      >
        {modalData && (
          <div>
            <Title level={4}>{modalData.title}</Title>
            <p style={{ color: '#999', marginBottom: 16 }}>
              {modalType === 'announcement'
                ? <>类型：{modalData.type} | 发布时间：{modalData.publishTime}</>
                : <>分类：{modalData.category} | 发布时间：{modalData.publishTime} | 浏览：{modalData.viewCount}</>
              }
            </p>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>{modalData.content}</div>
          </div>
        )}
      </Modal>
    </div>
  )
}
