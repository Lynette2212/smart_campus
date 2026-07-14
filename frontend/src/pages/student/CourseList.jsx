import React, { useEffect, useState } from 'react'
import { Table, Button, message, Typography, Tag } from 'antd'
import { getCourses, selectCourse } from '../../services/api'

export default function CourseList() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  const load = () => {
    setLoading(true)
    getCourses().then(res => { if (res.code === 200) setCourses(res.data) }).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const handleSelect = (id) => {
    selectCourse(id).then(res => {
      if (res.code === 200) { message.success('选课成功'); load() }
      else message.error(res.message)
    }).catch(err => message.error(err.message))
  }

  const columns = [
    { title: '课程名称', dataIndex: 'name' },
    { title: '课程代码', dataIndex: 'code' },
    { title: '学分', dataIndex: 'credits' },
    { title: '学时', dataIndex: 'hours' },
    { title: '类型', dataIndex: 'type', render: t => <Tag color={t === '必修' ? 'blue' : 'green'}>{t}</Tag> },
    { title: '学期', dataIndex: 'semester' },
    { title: '上课时间', dataIndex: 'schedule' },
    { title: '教室', dataIndex: 'classroom' },
    { title: '人数', render: (_, r) => `${r.currentStudents}/${r.maxStudents}` },
    { title: '操作', render: (_, r) => (
      <Button type="primary" size="small" disabled={r.currentStudents >= r.maxStudents} onClick={() => handleSelect(r.id)}>选课</Button>
    )}
  ]

  return <div><Typography.Title level={4}>课程列表</Typography.Title><Table columns={columns} dataSource={courses} rowKey="id" loading={loading} /></div>
}
