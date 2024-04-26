import React, { useState, useEffect } from 'react';
import { Input, Form } from 'antd';
import SubmitBtn from './components/submitBtn';
interface FieldType {
  username: string;
  sex: string;
}
const App: React.FC = () => {
  const handleSubmit = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1);
      },4000)
    })
  }
  return (
    <div className='app-wrap'>
      <Form layout="inline">
        <Form.Item<FieldType>
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          name="sex"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
        >
          <SubmitBtn isConfirm onSubmit={handleSubmit}>test</SubmitBtn>
          <SubmitBtn onSubmit={handleSubmit}>test</SubmitBtn>
        </Form.Item>
      </Form>
    </div>
  )
}
export default App;