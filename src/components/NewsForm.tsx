import React from 'react';
import { Form, Input, Button } from 'antd';

interface NewsFormProps {
  initialValues?: any;
  onSubmit: (values: any) => void;
}

const NewsForm: React.FC<NewsFormProps> = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onSubmit(values);
  };

  return (
    <Form form={form} initialValues={initialValues} onFinish={handleFinish} layout="vertical">
      <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the title' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="content" label="Content" rules={[{ required: true, message: 'Please enter the content' }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="author" label="Author" rules={[{ required: true, message: 'Please enter the author' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="published_date" label="Published Date" rules={[{ required: true, message: 'Please enter the published date' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="img" label="Image URL" rules={[{ required: true, message: 'Please enter the image URL' }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default NewsForm;
