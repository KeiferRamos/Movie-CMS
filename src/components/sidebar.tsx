import React, { ReactNode, useEffect } from 'react';
import { Modal, Menu } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  AppstoreTwoTone,
  VideoCameraTwoTone,
  LeftSquareTwoTone,
  UserOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';

const StyledMenu = styled(Menu)`
  height: 100vh;
  width: 300px;
`;

function getItem(label: string, key: string, icon: ReactNode, children?: any) {
  return {
    key,
    icon,
    children,
    label,
  };
}

function SideBar() {
  const { confirm } = Modal;
  const navigate = useNavigate();

  const items = [
    getItem('Manage Content', 'items', <AppstoreTwoTone />, [
      getItem(
        'Manage Users',
        '/manage-users',
        <UserOutlined style={{ color: '#1677ff' }} />,
      ),
      getItem('Manage Movies', '/manage-movies', <VideoCameraTwoTone />),
    ]),
    getItem('Log out', 'logout', <LeftSquareTwoTone />),
  ];

  useEffect(() => {
    const accessToken = sessionStorage.getItem('access_token');
    if (!accessToken) {
      navigate('/login', { replace: true });
    }
  }, []);

  const navigateUser = ({ key }: any) => {
    if (key === 'logout') {
      return confirm({
        title: 'Are you sure you want to logout?',
        icon: <ExclamationCircleFilled />,
        onOk() {
          sessionStorage.clear();
          navigate('/login', { replace: true });
        },
      });
    }
    if (key === 'items') {
      return;
    }
    navigate(key);
  };
  return (
    <StyledMenu
      defaultOpenKeys={['items']}
      defaultSelectedKeys={[window.location.pathname]}
      mode="inline"
      items={items}
      onClick={navigateUser}
    ></StyledMenu>
  );
}

export default SideBar;
