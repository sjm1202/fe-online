import React, { useState, useEffect } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import './app.scss';
import { Navigate, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Menbers from './pages/members';
import Teams from './pages/teams';
import Jobs from './pages/jobs';
const App: React.FC = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const [navItems, setNavItems ] = useState<MenuProps['items']>([
    {
      label: '成员管理',
      key: '/menbers',
    },
    {
      label: '团队管理',
      key: '/teams',
    },
    {
      label: '职位维护',
      key: '/jobs',
    },
  ])
  const [current, setCurrent] = useState('/');
  const handleNavItemClick: MenuProps['onClick'] = e => {
    navigate(e.key)
  };
  useEffect(() => {
    setCurrent(location.pathname)
  }, [location.pathname])
  return (
    <div className='app-wrap'>
      <div className='app-header'>
        <Menu 
          onClick={handleNavItemClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={navItems} 
        />
      </div>
      <div className='app-body'>
      <Routes>
        <Route path="menbers" element={<Menbers />} />
        <Route path="teams" element={<Teams />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="*" element={<Navigate to='menbers' />} />
      </Routes>
      </div>
    </div>
  )
}
export default App;