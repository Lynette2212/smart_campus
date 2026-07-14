import React, { useEffect, useState } from 'react'
import { Table, Typography, Tag } from 'antd'
import { getAllTeachers } from '../../services/api'

export default function TeacherManage() {
  const [data, setData] = useState([])

  useEffect(() => {
    getAllTeachers().then(res => { if (res.code === 200) setData(res.data) })
  }, [])

  const columns = [
    { title: '工号', dataIndex: 'teacherNo' },
    { title: '姓名', render: (_, r) => r.user?.realName },
    { title: '院系', dataIndex: 'department' },
    { title: '职称', dataIndex: 'title' },
    { title: '类型', dataIndex: 'teacherType', render: v => <Tag color="blue">{v}</Tag> },
    { title: '研究方向', dataIndex: 'researchArea' },
    { title: '办公地点', dataIndex: 'office' },
    { title: '政治面貌', dataIndex: 'politicalStatus' },
  ]

  return <div><Typography.Title level={4}>教师管理</Typography.Title><Table columns={columns} dataSource={data} rowKey="id" /></div>
}
