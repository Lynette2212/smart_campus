import React, { useEffect, useState } from 'react'
import { Table, Typography, Empty } from 'antd'
import { getMyCourses } from '../../services/api'

const { Title } = Typography

const DAYS = ['周一', '周二', '周三', '周四', '周五']
const PERIODS = ['1-2节', '3-4节', '5-6节', '7-8节', '9-10节']
const DAY_MAP = Object.fromEntries(DAYS.map((d, i) => [d, i]))

const parseSchedule = (schedule) => {
  if (!schedule || schedule === '待定') return []
  return schedule.split(',').map(s => {
    const m = s.trim().match(/^(.+?)(\d+-\d+节)$/)
    return m ? { day: DAY_MAP[m[1]], period: m[2] } : null
  }).filter(Boolean)
}

export default function Schedule() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    getMyCourses().then(res => { if (res.code === 200) setCourses(res.data) })
  }, [])

  const cells = Object.fromEntries(PERIODS.map(p => [p, {}]))
  courses.forEach(({ course }) => {
    parseSchedule(course?.schedule).forEach(({ day, period }) => {
      if (cells[period]) cells[period][day] = course
    })
  })

  const columns = [
    { title: '节次', dataIndex: 'period', width: 90, fixed: 'left' },
    ...DAYS.map((name, idx) => ({
      title: name,
      render: (_, { period }) => {
        const c = cells[period][idx]
        return c ? (
          <div>
            <div style={{ fontWeight: 'bold', color: '#1890ff' }}>{c.name}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{c.classroom}</div>
            <div style={{ fontSize: 12, color: '#999' }}>{c.teacher?.realName}</div>
          </div>
        ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description=" " />
      }
    }))
  ]

  return (
    <div>
      <Title level={4}>我的课程表</Title>
      <Table
        columns={columns}
        dataSource={PERIODS.map(p => ({ period: p, key: p }))}
        pagination={false}
        bordered
        scroll={{ x: 800 }}
      />
    </div>
  )
}
