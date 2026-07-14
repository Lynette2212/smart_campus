import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Statistic, Typography } from 'antd'
import { TeamOutlined, UserOutlined, BookOutlined } from '@ant-design/icons'
import { getStudentStats, getTeacherStats, getCourseStats } from '../../services/api'

export default function LeaderDashboard() {
  const [studentStats, setStudentStats] = useState({})
  const [teacherStats, setTeacherStats] = useState({})
  const [courseStats, setCourseStats] = useState({})

  useEffect(() => {
    getStudentStats().then(res => { if (res.code === 200) setStudentStats(res.data) })
    getTeacherStats().then(res => { if (res.code === 200) setTeacherStats(res.data) })
    getCourseStats().then(res => { if (res.code === 200) setCourseStats(res.data) })
  }, [])

  return (
    <div>
      <Typography.Title level={4}>领导首页 - 数据概览</Typography.Title>
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={8}><Card><Statistic title="在校学生总数" value={studentStats.totalStudents || 0} prefix={<UserOutlined />} /></Card></Col>
        <Col span={8}><Card><Statistic title="教师总数" value={teacherStats.totalTeachers || 0} prefix={<TeamOutlined />} /></Card></Col>
        <Col span={8}><Card><Statistic title="开设课程" value={courseStats.totalCourses || 0} prefix={<BookOutlined />} /></Card></Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Card title="学生按院系分布">
            {studentStats.byDepartment && Object.entries(studentStats.byDepartment).map(([k, v]) => (
              <p key={k}>{k}：{v}人</p>
            ))}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="教师按类型分布">
            {teacherStats.byType && Object.entries(teacherStats.byType).map(([k, v]) => (
              <p key={k}>{k}：{v}人</p>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  )
}
