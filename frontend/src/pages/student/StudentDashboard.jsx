import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Statistic, Typography, Descriptions, Tag, Space } from 'antd'
import { BookOutlined, TrophyOutlined, FileTextOutlined, UserOutlined, TeamOutlined, IdcardOutlined, ReadOutlined } from '@ant-design/icons'
import { getStudentProfile, getMyCourses, getMyGrades } from '../../services/api'

const { Title } = Typography

export default function StudentDashboard() {
  const [profile, setProfile] = useState(null)
  const [courseCount, setCourseCount] = useState(0)
  const [gradeCount, setGradeCount] = useState(0)

  useEffect(() => {
    getStudentProfile().then(res => { if (res.code === 200) setProfile(res.data) })
    getMyCourses().then(res => { if (res.code === 200) setCourseCount(res.data?.length || 0) })
    getMyGrades().then(res => { if (res.code === 200) setGradeCount(res.data?.length || 0) })
  }, [])

  return (
    <div>
      <Title level={4}>学生首页</Title>

      {/* 个人信息卡片 */}
      {profile && (
        <Card style={{ marginBottom: 24 }} title={<Space><UserOutlined /> 个人信息</Space>}>
          <Descriptions bordered column={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }} size="small">
            <Descriptions.Item label={<Space><IdcardOutlined /> 学号</Space>}>
              {profile.studentNo}
            </Descriptions.Item>
            <Descriptions.Item label={<Space><UserOutlined /> 姓名</Space>}>
              {profile.user?.realName}
            </Descriptions.Item>
            <Descriptions.Item label={<Space><TeamOutlined /> 院系</Space>}>
              {profile.department}
            </Descriptions.Item>
            <Descriptions.Item label={<Space><ReadOutlined /> 专业</Space>}>
              {profile.major}
            </Descriptions.Item>
            <Descriptions.Item label={<Space><TeamOutlined /> 班级</Space>}>
              {profile.className}
            </Descriptions.Item>
            <Descriptions.Item label={<Space><UserOutlined /> 状态</Space>}>
              <Tag color={profile.status === '在读' ? 'green' : 'orange'}>{profile.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label={<Space><FileTextOutlined /> 一卡通余额</Space>}>
              <Tag color="blue">¥{profile.cardBalance}</Tag>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}

      {/* 数据统计卡片 */}
      <Row gutter={24}>
        <Col xs={24} sm={24} md={8}>
          <Card>
            <Statistic
              title="已选课程"
              value={courseCount}
              prefix={<BookOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card>
            <Statistic
              title="已修课程"
              value={gradeCount}
              prefix={<TrophyOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card>
            <Statistic
              title="已修学分"
              value={profile?.totalCredits || 0}
              suffix="学分"
              prefix={<FileTextOutlined style={{ color: '#fa8c16' }} />}
              valueStyle={{ color: '#fa8c16', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
