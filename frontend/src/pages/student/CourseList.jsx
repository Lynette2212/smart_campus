import React, { useEffect, useState } from 'react'
import { Table, Button, message, Typography, Tag, Input } from 'antd'
import { getCourses, selectCourse } from '../../services/api'
import { SearchOutlined } from '@ant-design/icons'

export default function CourseList() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')

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

  const filteredCourses = searchText
    ? courses.filter(c => c.name?.toLowerCase().includes(searchText.toLowerCase()) ||
                        c.code?.toLowerCase().includes(searchText.toLowerCase()) ||
                        c.teacher?.realName?.toLowerCase().includes(searchText.toLowerCase()))
    : courses

  const columns = [
    { title: '课程名称', dataIndex: 'name' },
    { title: '课程代码', dataIndex: 'code' },
    { title: '学分', dataIndex: 'credits' },
    { title: '学时', dataIndex: 'hours' },
    { title: '类型', dataIndex: 'type', render: t => <Tag color={t === '必修' ? 'blue' : 'green'}>{t}</Tag> },
    { title: '学期', dataIndex: 'semester' },
    { title: '上课时间', dataIndex: 'schedule' },
    { title: '教室', dataIndex: 'classroom' },
    { title: '人数', render: (_, r) => <Tag color={r.currentStudents >= r.maxStudents ? 'red' : 'green'}>{r.currentStudents}/{r.maxStudents}</Tag> },
    { title: '操作', render: (_, r) => (
      <Button type="primary" size="small" disabled={r.currentStudents >= r.maxStudents} onClick={() => handleSelect(r.id)}>选课</Button>
    )}
  ]

  return (
    <div>
      <Typography.Title level={4}>课程列表</Typography.Title>
      <Input
        placeholder="搜索课程名称、代码或教师"
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        style={{ width: 300, marginBottom: 16 }}
        allowClear
      />
      <Table
        columns={columns}
        dataSource={filteredCourses}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: t => `共 ${t} 门课程` }}
      />
    </div>
  )
}
