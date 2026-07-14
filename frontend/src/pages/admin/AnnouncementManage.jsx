import React, { useEffect, useState } from 'react'
import { Table, Button, Typography, Tag, Modal, Form, Input, Select, message, Popconfirm } from 'antd'
import { createAnnouncement, getAnnouncements } from '../../services/api'

const { Title } = Typography

export default function AnnouncementManage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [form] = Form.useForm()

  const load = () => {
    setLoading(true)
    getAnnouncements().then(res => { if (res.code === 200) setData(res.data) }).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const handleCreate = async (values) => {
    const res = await createAnnouncement({ ...values, publishTime: new Date() })
    if (res.code === 200) {
      message.success('发布成功')
      setModalVisible(false)
      form.resetFields()
      load()
    } else {
      message.error(res.message)
    }
  }

  const columns = [
    { title: '标题', dataIndex: 'title', ellipsis: true },
    { title: '类型', dataIndex: 'type', width: 100 },
    { title: '置顶', dataIndex: 'top', width: 80, render: v => v ? <Tag color="red">置顶</Tag> : '-' },
    { title: '发布人', render: (_, r) => r.publisher?.realName, width: 120 },
    { title: '发布时间', dataIndex: 'publishTime', width: 160 },
    { title: '操作', width: 100, render: () => (
      <Popconfirm title="确定删除？">
        <Button danger size="small">删除</Button>
      </Popconfirm>
    )},
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>公告管理</Title>
        <Button type="primary" onClick={() => setModalVisible(true)}>发布公告</Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" loading={loading}
             pagination={{ pageSize: 10, showTotal: t => `共 ${t} 条` }} />

      <Modal title="发布新公告" open={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
        <Form form={form} onFinish={handleCreate} layout="vertical">
          <Form.Item name="title" label="标题" rules={[{ required: true }]}>
            <Input placeholder="请输入公告标题" />
          </Form.Item>
          <Form.Item name="content" label="内容" rules={[{ required: true }]}>
            <Input.TextArea rows={6} placeholder="请输入公告内容" />
          </Form.Item>
          <Form.Item name="type" label="类型" initialValue="学校公告">
            <Select options={[{ value: '学校公告' }, { value: '院系公告' }]} />
          </Form.Item>
          <Form.Item name="top" label="是否置顶" initialValue={false}>
            <Select options={[{ value: true, label: '是' }, { value: false, label: '否' }]} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>发布</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}