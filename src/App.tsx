import React, { useState, useEffect } from 'react';
import { Input, Form } from 'antd';
import SubmitBtn from './components/submitBtn';
import DescriptionTable from './components/DescriptionTable';
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
      <br />
      <br />
      <DescriptionTable
        hiddedTh={true}
        columns={
          [
            { fieldKey: 'fieldTitle', title: '字段标题',  style: { width: '10%', textAlign: 'right', background: '#FAFAFA' }},
            { fieldKey: 'fieldVal1', title: '字段值1',  style: { width: '45%' }},
            { fieldKey: 'fieldVal2', title: '字段值2',  style: { width: '45%' }}
          ]
        }
        items={
          [
            { key: '1', fieldTitle: 'fieldTitle', fieldVal1: (<div>test<br/>tetest</div>), fieldVal2: '字段值2' },
            { key: '2', fieldTitle: 'fieldTitle', fieldVal1: '字段值1', fieldVal2: '字段值2' },
            { key: '3', fieldTitle: 'fieldTitle', fieldVal1: '字段值1', fieldVal2: '字段值2' },
          ]
        }
      />
    </div>
  )
}
export default App;