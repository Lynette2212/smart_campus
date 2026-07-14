import React, { useEffect, useState } from 'react'
import { Table, Button, Typography, Tag, Modal, Form, Input, Select, message, Popconfirm } from 'antd'
import { createNews, getNews } from '../../services/api'

const { Title } = Typography

export default function NewsManage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [form] = Form.useForm()

  const load = () => {
    setLoading(true)
    getNews().then(res => { if (res.code === 200) setData(res.data) }).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const handleCreate = async (values) => {
    const res = await createNews({ ...values, publishTime: new Date() })
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
    { title: '分类', dataIndex: 'category', width: 100, render: v => <Tag color="blue">{v}</Tag> },
    { title: '浏览量', dataIndex: 'viewCount', width: 80 },
    { title: '作者', render: (_, r) => r.author?.realName, width: 120 },
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
        <Title level={4}>新闻管理</Title>
        <Button type="primary" onClick={() => setModalVisible(true)}>发布新闻</Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" loading={loading}
             pagination={{ pageSize: 10, showTotal: t => `共 ${t} 条` }} />

      <Modal title="发布新闻" open={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
        <Form form={form} onFinish={handleCreate} layout="vertical">
          <Form.Item name="title" label="标题" rules={[{ required: true }]}>
            <Input placeholder="请输入新闻标题" />
          </Form.Item>
          <Form.Item name="content" label="内容" rules={[{ required: true }]}>
            <Input.TextArea rows={6} placeholder="请输入新闻内容" />
          </Form.Item>
          <Form.Item name="category" label="分类" initialValue="校园动态">
            <Select options={[{ value: '校园动态' }, { value: '学术讲座' }, { value: '活动通知' }]} />
          </Form.Item>
          <Form.Item name="coverImage" label="封面图URL">
            <Input placeholder="可选，输入图片URL" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>发布</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
