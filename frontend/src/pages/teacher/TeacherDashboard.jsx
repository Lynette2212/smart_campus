import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Statistic, Typography, Descriptions, Tag, Space } from 'antd'
import { BookOutlined, TeamOutlined, UserOutlined, IdcardOutlined, ExperimentOutlined, EnvironmentOutlined, ReadOutlined, DollarOutlined } from '@ant-design/icons'
import { getTeacherProfile, getTeacherCourses } from '../../services/api'

const { Title } = Typography

export default function TeacherDashboard() {
  const [profile, setProfile] = useState(null)
  const [courseCount, setCourseCount] = useState(0)
  const [totalStudents, setTotalStudents] = useState(0)

  useEffect(() => {
    getTeacherProfile().then(res => { if (res.code === 200) setProfile(res.data) })
    getTeacherCourses().then(res => {
      if (res.code === 200) {
        const courses = res.data || []
        setCourseCount(courses.length)
        // 统计选课总人数
        const total = courses.reduce((sum, c) => sum + (c.currentStudents || 0), 0)
        setTotalStudents(total)
      }
    })
  }, [])

  return (
    <div>
      <Title level={4}>教师首页</Title>

      {/* 个人信息卡片 */}
      {profile && (
        <Card style={{ marginBottom: 24 }} title={<Space><UserOutlined /> 个人信息</Space>}>
          <Descriptions bordered column={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }} size="small">
            <Descriptions.Item label={<Space><IdcardOutlined /> 工号</Space>}>
              {profile.teacherNo}
            </Descriptions.Item>
            <Descriptions.Item label={<Space><UserOutlined /> 姓名</Space>}>
              {profile.user?.realName}
            </Descriptions.Item>
            <Descriptions.Item label={<Space><TeamOutlined /> 院系</Space>}>
              {profile.department}
            </Descriptions.Item>
            <Descriptions.Item label={<Space><ExperimentOutlined /> 职称</Space>}>
              <Tag color="blue">{profile.title}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label={<Space><ReadOutlined /> 研究方向</Space>}>
              {profile.researchArea}
            </Descriptions.Item>
            <Descriptions.Item label={<Space><EnvironmentOutlined /> 办公地点</Space>}>
              {profile.office}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}

      {/* 数据统计卡片 */}
      <Row gutter={24}>
        <Col xs={24} sm={24} md={8}>
          <Card>
            <Statistic
              title="授课门数"
              value={courseCount}
              prefix={<BookOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card>
            <Statistic
              title="选课学生"
              value={totalStudents}
              prefix={<TeamOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a', fontWeight: 'bold' }}
              suffix="人"
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card>
            <Statistic
              title="教师类型"
              value={profile?.teacherType || '-'}
              prefix={<DollarOutlined style={{ color: '#fa8c16' }} />}
              valueStyle={{ color: '#fa8c16', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
