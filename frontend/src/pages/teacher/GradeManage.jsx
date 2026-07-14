import React, { useEffect, useState } from 'react'
import { Table, Typography, Form, Input, InputNumber, Button, message, Modal } from 'antd'
import { useParams } from 'react-router-dom'
import { getCourseGrades, saveGrade, getCourseStudents } from '../../services/api'

export default function GradeManage() {
  const { courseId } = useParams()
  const [grades, setGrades] = useState([])
  const [students, setStudents] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [form] = Form.useForm()

  const load = () => {
    getCourseGrades(courseId).then(res => { if (res.code === 200) setGrades(res.data) })
    getCourseStudents(courseId).then(res => { if (res.code === 200) setStudents(res.data) })
  }
  useEffect(load, [courseId])

  const handleSubmit = () => {
    form.validateFields().then(values => {
      saveGrade(courseId, values).then(res => {
        if (res.code === 200) { message.success('成绩录入成功'); setModalOpen(false); form.resetFields(); load() }
        else message.error(res.message)
      })
    })
  }

  const columns = [
    { title: '学生', render: (_, r) => r.student?.user?.realName },
    { title: '学号', render: (_, r) => r.student?.studentNo },
    { title: '分数', dataIndex: 'score' },
    { title: '等级', dataIndex: 'gradeLevel' },
    { title: '学分', dataIndex: 'credits' },
    { title: '学期', dataIndex: 'semester' },
    { title: '状态', dataIndex: 'status' },
  ]

  return (
    <div>
      <Typography.Title level={4}>成绩管理</Typography.Title>
      <Button type="primary" onClick={() => setModalOpen(true)} style={{ marginBottom: 16 }}>录入成绩</Button>
      <Table columns={columns} dataSource={grades} rowKey="id" />
      <Modal title="录入成绩" open={modalOpen} onOk={handleSubmit} onCancel={() => setModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="studentId" label="学生" rules={[{ required: true }]}>
            <Input placeholder="学生ID" />
          </Form.Item>
          <Form.Item name="score" label="分数" rules={[{ required: true }]}>
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="semester" label="学期" rules={[{ required: true }]} initialValue="2025-2026-1">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
