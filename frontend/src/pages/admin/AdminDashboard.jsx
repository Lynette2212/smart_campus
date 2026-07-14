import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Statistic, Typography, Table, Tag } from 'antd'
import { UserOutlined, TeamOutlined, BookOutlined, NotificationOutlined, ReadOutlined, DollarOutlined } from '@ant-design/icons'
import { getStudentStats, getTeacherStats, getCourseStats, getAnnouncements, getNews } from '../../services/api'

const { Title } = Typography

export default function AdminDashboard() {
  const [studentStats, setStudentStats] = useState({})
  const [teacherStats, setTeacherStats] = useState({})
  const [courseStats, setCourseStats] = useState({})
  const [announcements, setAnnouncements] = useState([])
  const [news, setNews] = useState([])

  useEffect(() => {
    getStudentStats().then(res => { if (res.code === 200) setStudentStats(res.data) })
    getTeacherStats().then(res => { if (res.code === 200) setTeacherStats(res.data) })
    getCourseStats().then(res => { if (res.code === 200) setCourseStats(res.data) })
    getAnnouncements().then(res => { if (res.code === 200) setAnnouncements(res.data.slice(0, 5)) })
    getNews().then(res => { if (res.code === 200) setNews(res.data.slice(0, 5)) })
  }, [])

  return (
    <div>
      <Title level={4}>管理后台 - 数据概览</Title>

      {/* 统计卡片 */}
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="学生总数"
              value={studentStats.totalStudents || 0}
              prefix={<UserOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="教师总数"
              value={teacherStats.totalTeachers || 0}
              prefix={<TeamOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="课程总数"
              value={courseStats.totalCourses || 0}
              prefix={<BookOutlined style={{ color: '#fa8c16' }} />}
              valueStyle={{ color: '#fa8c16', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="选课记录"
              value={courseStats.totalSelections || 0}
              prefix={<DollarOutlined style={{ color: '#722ed1' }} />}
              valueStyle={{ color: '#722ed1', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 公告和新闻 */}
      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Card title={<span><NotificationOutlined /> 最新公告</span>} style={{ marginBottom: 24 }}>
            <Table
              dataSource={announcements}
              rowKey="id"
              pagination={false}
              columns={[
                { title: '标题', dataIndex: 'title', ellipsis: true },
                { title: '类型', dataIndex: 'type', width: 100, render: v => <Tag>{v}</Tag> },
                { title: '置顶', dataIndex: 'top', width: 60, render: v => v ? <Tag color="red">是</Tag> : '否' },
                { title: '时间', dataIndex: 'publishTime', width: 160 },
              ]}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title={<span><ReadOutlined /> 最新新闻</span>} style={{ marginBottom: 24 }}>
            <Table
              dataSource={news}
              rowKey="id"
              pagination={false}
              columns={[
                { title: '标题', dataIndex: 'title', ellipsis: true },
                { title: '分类', dataIndex: 'category', width: 100, render: v => <Tag color="blue">{v}</Tag> },
                { title: '浏览', dataIndex: 'viewCount', width: 80 },
                { title: '时间', dataIndex: 'publishTime', width: 160 },
              ]}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}