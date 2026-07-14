import React, { useEffect, useState } from 'react'
import { Table, Button, message, Typography, Popconfirm, Input } from 'antd'
import { getMyCourses, dropCourse } from '../../services/api'
import { SearchOutlined } from '@ant-design/icons'

export default function MyCourses() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')

  const load = () => {
    setLoading(true)
    getMyCourses().then(res => { if (res.code === 200) setData(res.data) }).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const handleDrop = (courseId) => {
    dropCourse(courseId).then(res => {
      if (res.code === 200) { message.success('退选成功'); load() }
      else message.error(res.message)
    })
  }

  const filteredData = searchText
    ? data.filter(r => r.course?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
                      r.course?.code?.toLowerCase().includes(searchText.toLowerCase()))
    : data

  const columns = [
    { title: '课程名称', render: (_, r) => r.course?.name },
    { title: '课程代码', render: (_, r) => r.course?.code },
    { title: '学分', render: (_, r) => r.course?.credits },
    { title: '上课时间', render: (_, r) => r.course?.schedule },
    { title: '教室', render: (_, r) => r.course?.classroom },
    { title: '选课时间', dataIndex: 'createTime' },
    { title: '操作', render: (_, r) => (
      <Popconfirm title="确定退选该课程？" onConfirm={() => handleDrop(r.course?.id)}>
        <Button danger size="small">退选</Button>
      </Popconfirm>
    )}
  ]

  return (
    <div>
      <Typography.Title level={4}>我的选课</Typography.Title>
      <Input
        placeholder="搜索课程名称或代码"
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        style={{ width: 300, marginBottom: 16 }}
        allowClear
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: t => `共 ${t} 门课程` }}
      />
    </div>
  )
}
