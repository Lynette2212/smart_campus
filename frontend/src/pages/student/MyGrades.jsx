import React, { useEffect, useState } from 'react'
import { Table, Typography, Tag, Select } from 'antd'
import { getMyGrades } from '../../services/api'

export default function MyGrades() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [semester, setSemester] = useState('')

  const load = (sem) => {
    setLoading(true)
    getMyGrades(sem || undefined).then(res => { if (res.code === 200) setData(res.data) }).finally(() => setLoading(false))
  }
  useEffect(() => load(), [])

  const colorMap = { '优': 'gold', '良': 'blue', '中': 'cyan', '及格': 'green', '不及格': 'red' }
  const columns = [
    { title: '课程名称', render: (_, r) => r.course?.name },
    { title: '学分', dataIndex: 'credits' },
    { title: '分数', dataIndex: 'score' },
    { title: '等级', dataIndex: 'gradeLevel', render: v => <Tag color={colorMap[v]}>{v}</Tag> },
    { title: '学期', dataIndex: 'semester' },
    { title: '状态', dataIndex: 'status', render: v => <Tag color={v === '正常' ? 'green' : 'orange'}>{v}</Tag> },
  ]

  return (
    <div>
      <Typography.Title level={4}>我的成绩</Typography.Title>
      <Select placeholder="按学期筛选" style={{ width: 200, marginBottom: 16 }} allowClear onChange={v => { setSemester(v || ''); load(v) }}
        options={[{ value: '2024-2025-2', label: '2024-2025-2学期' }, { value: '2024-2025-1', label: '2024-2025-1学期' }]} />
      <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
    </div>
  )
}
