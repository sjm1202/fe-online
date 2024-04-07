import React, { useRef, useState } from 'react';
import OrgTree from './components/orgTree';
import UserTable from './components/userTable'
import { PlusOutlined, ApartmentOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import './style.scss';
type pathItem = {
  key: string;
  title: string
}
const Members: React.FC = (props) => {
  let [ currentPath, setCurrentPath ] = useState<pathItem[]>([])
  let orgRef = useRef<any>(null)
  let orgId = currentPath.length ? currentPath[currentPath.length - 1].key : '';
  let handleCurrentPathChange = (val: pathItem[]) => {
    setCurrentPath(val);
  }
  let handleUpdateCount = (count: number) => {
    orgRef.current?.updateOrgUserCount(currentPath, count)
  }
  return (
    <div className='member-wrap'>
      <div className='member-sider'>
        <div className='title'>
          <span>部门</span>
          <PlusOutlined />
        </div>
        <div  className='content'>
          <OrgTree ref={orgRef} onSelect={handleCurrentPathChange}></OrgTree>
        </div>
      </div>
      <div className='member-content'>
        <div className='title'>
          <Breadcrumb>
            {
              currentPath.map(item => {
                return <Breadcrumb.Item key={item.key}><ApartmentOutlined style={{marginRight: '8px'}}/>{item.title}</Breadcrumb.Item>
              })
            }
          </Breadcrumb>
        </div>
        <div  className='content'>
          <UserTable orgId={orgId} onUpdateCount={handleUpdateCount}></UserTable>
        </div>
      </div>
    </div>
  )
}
export default Members;