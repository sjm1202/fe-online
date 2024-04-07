import React, { useEffect, useState, useRef } from 'react';
import { Select, Input, Table, Avatar } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import userApi from '@/api/user';
import type { User } from '@/api/user'
import './style.scss';
const columns: ColumnsType<User> = [
  {
    title: '姓名',
    dataIndex: 'name',
    sorter: (a, b) => a.name > b.name ? 1 : -1,
    render: (text: string) => (
      <>
        <Avatar style={{marginRight: '8px'}}>{text}</Avatar>
        {text}
      </>
    ),
  },
  {
    title: '用户名',
    sorter: (a, b) => a.userName > b.userName ? 1 : -1,
    dataIndex: 'id',
  },
];
interface Iprops {
  orgId: string;
  onUpdateCount: (val: number) => void
}
const UserTable: React.FC<Iprops> = (props) => {
  const [data, setData] = useState<User[]>([]);
  const [ filterInput, setFilterInput ] = useState<string>('');
  const timerRef = useRef<number | null>(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<User> = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  const loadData = (orgId: string, name?: string, inint = false): void => {
    if (orgId === '') {
      setData([]);
      return;
    }
    let params: { orgId: string, name?: string } = {
      orgId: props.orgId,
    }
    if (name) {
      params.name = name;
    }
    userApi.query(params).then((users: User[]) => {
      if (inint) {
        props.onUpdateCount(users.length)
      }
      setData(users);
    })
  }
  useEffect(() => {
    setFilterInput('');
    loadData(props.orgId, '', true )
  }, [ props.orgId ])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilterInput(value);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null
    }
    timerRef.current = setTimeout(() => {
      loadData(props.orgId, value);
    }, 300)
  }
  let count = data.length;
  return (
    <div className='user-table-wrap'>
      <div className='search-bar'>
        <Input
          value={filterInput}
          className='no-border'
          prefix={<SearchOutlined />}
          placeholder='搜索'
          style={{width: '260px'}}
          onChange={handleInputChange}
        />
        <span className='split-line'>|</span>
        <Select
          className='no-border'
          placeholder='登陆状态'
        ></Select>
        <span style={{marginLeft: '8px'}}>{count}个成员</span>
      </div>
      <div className='table'>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={false}
        ></Table>
      </div>
    </div>
  )
}
export default UserTable;