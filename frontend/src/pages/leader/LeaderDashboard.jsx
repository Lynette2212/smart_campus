import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Statistic, Typography, Descriptions, Tag, Space, Badge } from 'antd'
import { TeamOutlined, UserOutlined, BookOutlined, PieChartOutlined, ReadOutlined, DollarOutlined, ExperimentOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { getStudentStats, getTeacherStats, getCourseStats } from '../../services/api'

const { Title } = Typography

const COLORS = ['#1890ff', '#52c41a', '#fa8c16', '#f5222d', '#722ed1', '#13c2c2']

export default function LeaderDashboard() {
  const [studentStats, setStudentStats] = useState({})
  const [teacherStats, setTeacherStats] = useState({})
  const [courseStats, setCourseStats] = useState({})

  useEffect(() => {
    getStudentStats().then(res => { if (res.code === 200) setStudentStats(res.data) })
    getTeacherStats().then(res => { if (res.code === 200) setTeacherStats(res.data) })
    getCourseStats().then(res => { if (res.code === 200) setCourseStats(res.data) })
  }, [])

  // 分布数据转描述项
  const buildDescItems = (dataObj, colorBase = 0) => {
    if (!dataObj) return []
    return Object.entries(dataObj).map(([k, v], idx) => ({
      label: k,
      children: <Tag color={COLORS[(colorBase + idx) % COLORS.length]}>{v} 人</Tag>
    }))
  }

  return (
    <div>
      <Title level={4}>领导首页 - 数据概览</Title>

      {/* 统计卡片 */}
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={24} md={8}>
          <Card>
            <Statistic
              title={<Space><UserOutlined /> 在校学生总数</Space>}
              value={studentStats.totalStudents || 0}
              prefix={<UserOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff', fontWeight: 'bold' }}
              suffix="人"
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card>
            <Statistic
              title={<Space><TeamOutlined /> 教师总数</Space>}
              value={teacherStats.totalTeachers || 0}
              prefix={<TeamOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a', fontWeight: 'bold' }}
              suffix="人"
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card>
            <Statistic
              title={<Space><BookOutlined /> 开设课程</Space>}
              value={courseStats.totalCourses || 0}
              prefix={<BookOutlined style={{ color: '#fa8c16' }} />}
              valueStyle={{ color: '#fa8c16', fontWeight: 'bold' }}
              suffix="门"
            />
          </Card>
        </Col>
      </Row>

      {/* 分布数据 */}
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Card
            title={<Space><PieChartOutlined /> 学生按院系分布</Space>}
            style={{ marginBottom: 24 }}
          >
            <Descriptions
              bordered
              column={{ xs: 1, sm: 2, md: 2 }}
              size="small"
              items={buildDescItems(studentStats.byDepartment, 0)}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title={<Space><ExperimentOutlined /> 教师按类型分布</Space>}
            style={{ marginBottom: 24 }}
          >
            <Descriptions
              bordered
              column={{ xs: 1, sm: 2, md: 2 }}
              size="small"
              items={buildDescItems(teacherStats.byType, 2)}
            />
          </Card>
        </Col>
      </Row>

      {/* 额外统计 */}
      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Card title={<Space><ReadOutlined /> 学生按状态分布</Space>}>
            <Space wrap>
              {studentStats.byStatus && Object.entries(studentStats.byStatus).map(([k, v], idx) => (
                <Badge
                  key={k}
                  count={`${k}: ${v}人`}
                  style={{ backgroundColor: COLORS[idx % COLORS.length], fontSize: '14px', padding: '0 8px' }}
                />
              ))}
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title={<Space><EnvironmentOutlined /> 教师按院系分布</Space>}>
            <Space wrap>
              {teacherStats.byDepartment && Object.entries(teacherStats.byDepartment).map(([k, v], idx) => (
                <Badge
                  key={k}
                  count={`${k}: ${v}人`}
                  style={{ backgroundColor: COLORS[(idx + 3) % COLORS.length], fontSize: '14px', padding: '0 8px' }}
                />
              ))}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
