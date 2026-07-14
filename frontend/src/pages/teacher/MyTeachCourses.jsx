import React, { useEffect, useState } from 'react'
import { Table, Button, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { getTeacherCourses } from '../../services/api'

export default function MyTeachCourses() {
  const [courses, setCourses] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getTeacherCourses().then(res => { if (res.code === 200) setCourses(res.data) })
  }, [])

  const columns = [
    { title: '课程名称', dataIndex: 'name' },
    { title: '课程代码', dataIndex: 'code' },
    { title: '学分', dataIndex: 'credits' },
    { title: '学时', dataIndex: 'hours' },
    { title: '学期', dataIndex: 'semester' },
    { title: '上课时间', dataIndex: 'schedule' },
    { title: '教室', dataIndex: 'classroom' },
    { title: '选课人数', render: (_, r) => `${r.currentStudents}/${r.maxStudents}` },
    { title: '操作', render: (_, r) => (
      <Button type="primary" size="small" onClick={() => navigate(`/teacher/grades/${r.id}`)}>成绩管理</Button>
    )}
  ]

  return <div><Typography.Title level={4}>我的授课</Typography.Title><Table columns={columns} dataSource={courses} rowKey="id" /></div>
}
