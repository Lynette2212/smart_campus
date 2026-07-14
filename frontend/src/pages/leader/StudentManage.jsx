import React, { useEffect, useState } from 'react'
import { Table, Typography, Tag } from 'antd'
import { getAllStudents } from '../../services/api'

export default function StudentManage() {
  const [data, setData] = useState([])

  useEffect(() => {
    getAllStudents().then(res => { if (res.code === 200) setData(res.data) })
  }, [])

  const columns = [
    { title: '学号', dataIndex: 'studentNo' },
    { title: '姓名', render: (_, r) => r.user?.realName },
    { title: '院系', dataIndex: 'department' },
    { title: '专业', dataIndex: 'major' },
    { title: '班级', dataIndex: 'className' },
    { title: '入学年份', dataIndex: 'enrollmentYear' },
    { title: '状态', dataIndex: 'status', render: v => <Tag color={v === '在读' ? 'green' : 'default'}>{v}</Tag> },
    { title: '已修学分', dataIndex: 'totalCredits' },
    { title: '一卡通余额', render: (_, r) => `¥${r.cardBalance}` },
  ]

  return <div><Typography.Title level={4}>学生管理</Typography.Title><Table columns={columns} dataSource={data} rowKey="id" /></div>
}
