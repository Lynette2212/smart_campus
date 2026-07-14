import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Statistic, Typography } from 'antd'
import { BookOutlined, TrophyOutlined, DollarOutlined } from '@ant-design/icons'
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
      {profile && (
        <Card style={{ marginBottom: 24 }}>
          <p>学号：{profile.studentNo} | 姓名：{profile.user?.realName} | 院系：{profile.department} | 专业：{profile.major}</p>
          <p>班级：{profile.className} | 状态：{profile.status} | 一卡通余额：¥{profile.cardBalance}</p>
        </Card>
      )}
      <Row gutter={24}>
        <Col span={8}><Card><Statistic title="已选课程" value={courseCount} prefix={<BookOutlined />} /></Card></Col>
        <Col span={8}><Card><Statistic title="已修课程" value={gradeCount} prefix={<TrophyOutlined />} /></Card></Col>
        <Col span={8}><Card><Statistic title="已修学分" value={profile?.totalCredits || 0} prefix={<DollarOutlined />} /></Card></Col>
      </Row>
    </div>
  )
}
