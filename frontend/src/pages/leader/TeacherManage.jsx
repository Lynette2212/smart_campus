import React, { useEffect, useState } from 'react'
import { Table, Typography, Tag, Input } from 'antd'
import { getAllTeachers } from '../../services/api'
import { SearchOutlined } from '@ant-design/icons'

export default function TeacherManage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    setLoading(true)
    getAllTeachers().then(res => { if (res.code === 200) setData(res.data) }).finally(() => setLoading(false))
  }, [])

  const filteredData = searchText
    ? data.filter(r =>
        r.teacherNo?.toLowerCase().includes(searchText.toLowerCase()) ||
        r.user?.realName?.toLowerCase().includes(searchText.toLowerCase()) ||
        r.department?.toLowerCase().includes(searchText.toLowerCase()) ||
        r.title?.toLowerCase().includes(searchText.toLowerCase()) ||
        r.researchArea?.toLowerCase().includes(searchText.toLowerCase())
      )
    : data

  const columns = [
    { title: '工号', dataIndex: 'teacherNo', width: 120 },
    { title: '姓名', render: (_, r) => r.user?.realName, width: 100 },
    { title: '院系', dataIndex: 'department', width: 180 },
    { title: '职称', dataIndex: 'title', width: 120 },
    { title: '类型', dataIndex: 'teacherType', render: v => <Tag color="blue">{v}</Tag>, width: 100 },
    { title: '研究方向', dataIndex: 'researchArea', width: 150 },
    { title: '办公地点', dataIndex: 'office', width: 120 },
    { title: '政治面貌', dataIndex: 'politicalStatus', width: 100 },
  ]

  return (
    <div>
      <Typography.Title level={4}>教师管理</Typography.Title>
      <Input
        placeholder="搜索工号、姓名、院系、职称或研究方向"
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
