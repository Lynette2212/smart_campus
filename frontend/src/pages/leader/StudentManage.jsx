import React, { useEffect, useState } from 'react'
import { Table, Typography, Tag, Input } from 'antd'
import { getAllStudents } from '../../services/api'
import { SearchOutlined } from '@ant-design/icons'

export default function StudentManage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    setLoading(true)
    getAllStudents().then(res => { if (res.code === 200) setData(res.data) }).finally(() => setLoading(false))
  }, [])

  const filteredData = searchText
    ? data.filter(r =>
        r.studentNo?.toLowerCase().includes(searchText.toLowerCase()) ||
        r.user?.realName?.toLowerCase().includes(searchText.toLowerCase()) ||
        r.department?.toLowerCase().includes(searchText.toLowerCase()) ||
        r.major?.toLowerCase().includes(searchText.toLowerCase()) ||
        r.className?.toLowerCase().includes(searchText.toLowerCase())
      )
    : data

  const columns = [
    { title: '学号', dataIndex: 'studentNo', width: 120 },
    { title: '姓名', render: (_, r) => r.user?.realName, width: 100 },
    { title: '院系', dataIndex: 'department', width: 180 },
    { title: '专业', dataIndex: 'major', width: 150 },
    { title: '班级', dataIndex: 'className', width: 120 },
    { title: '入学年份', dataIndex: 'enrollmentYear', width: 100 },
    { title: '状态', dataIndex: 'status', render: v => <Tag color={v === '在读' ? 'green' : 'default'}>{v}</Tag>, width: 80 },
    { title: '已修学分', dataIndex: 'totalCredits', width: 90 },
    { title: '一卡通余额', render: (_, r) => `¥${r.cardBalance}`, width: 110 },
  ]

  return (
    <div>
      <Typography.Title level={4}>学生管理</Typography.Title>
      <Input
        placeholder="搜索学号、姓名、院系、专业或班级"
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        style={{ width: 350, marginBottom: 16 }}
        allowClear
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: t => `共 ${t} 人` }}
        scroll={{ x: 1100 }}
      />
    </div>
  )
}
