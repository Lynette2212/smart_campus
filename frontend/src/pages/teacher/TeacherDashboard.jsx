import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Statistic, Typography } from 'antd'
import { BookOutlined, TeamOutlined } from '@ant-design/icons'
import { getTeacherProfile, getTeacherCourses } from '../../services/api'

export default function TeacherDashboard() {
  const [profile, setProfile] = useState(null)
  const [courseCount, setCourseCount] = useState(0)

  useEffect(() => {
    getTeacherProfile().then(res => { if (res.code === 200) setProfile(res.data) })
    getTeacherCourses().then(res => { if (res.code === 200) setCourseCount(res.data?.length || 0) })
  }, [])

  return (
    <div>
      <Typography.Title level={4}>教师首页</Typography.Title>
      {profile && (
        <Card style={{ marginBottom: 24 }}>
          <p>工号：{profile.teacherNo} | 姓名：{profile.user?.realName} | 院系：{profile.department}</p>
          <p>职称：{profile.title} | 研究方向：{profile.researchArea} | 办公地点：{profile.office}</p>
        </Card>
      )}
      <Row gutter={24}>
        <Col span={12}><Card><Statistic title="授课门数" value={courseCount} prefix={<BookOutlined />} /></Card></Col>
        <Col span={12}><Card><Statistic title="教师类型" value={profile?.teacherType || '-'} prefix={<TeamOutlined />} /></Card></Col>
      </Row>
    </div>
  )
}
