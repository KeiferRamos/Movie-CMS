import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Modal, Menu } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  AppstoreTwoTone,
  VideoCameraTwoTone,
  LeftSquareTwoTone,
  UserOutlined,
  ExclamationCircleFilled,
  BarsOutlined,
} from '@ant-design/icons';

import { GlobalContext } from '../context/context';

const StyledDiv = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background: #f4f1f1;
  width: calc(100% - 20px);
  display: flex;
  gap: 10px;
  padding: 10px;
  margin: 10px;
  align-items: flex-end;

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
  }

  p {
    font-size: 15px;
  }

  svg {
    font-size: 35px;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 10px;
  }

  span {
    font-size: 12px;
    text-transform: capitalize;
    color: #4b8ff6;
  }
`;

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
  const { state }: any = useContext(GlobalContext);
  const { confirm } = Modal;
  const navigate = useNavigate();
  const { image, role, username } = state;

  const items = [
    getItem('Manage Content', 'items', <AppstoreTwoTone />, [
      getItem(
        'Manage Users',
        '/manage-users',
        <UserOutlined style={{ color: '#1677ff' }} />,
      ),
      getItem('Manage Movies', '/manage-movies', <VideoCameraTwoTone />),
      getItem(
        'Manage Genres',
        '/manage-genres',
        <BarsOutlined style={{ color: '#1677ff' }} />,
      ),
    ]),
  ];

  useEffect(() => {
    const accessToken = sessionStorage.getItem('access_token');
    if (!accessToken) {
      navigate('/login', { replace: true });
    }
  }, []);

  const navigateUser = ({ key }: any) => {
    navigate(key);
  };

  return (
    <div style={{ position: 'relative' }}>
      <StyledMenu
        defaultOpenKeys={['items']}
        defaultSelectedKeys={[window.location.pathname]}
        mode="inline"
        items={items}
        onClick={navigateUser}
      ></StyledMenu>
      <StyledDiv>
        <img
          src={
            image
              ? image
              : `https://api.dicebear.com/6.x/initials/svg?seed=${username}`
          }
          alt=""
        />
        <div>
          <p>{username}</p>
          <span>{role}</span>
        </div>
        <LeftSquareTwoTone
          onClick={() =>
            confirm({
              title: 'Are you sure you want to logout?',
              icon: <ExclamationCircleFilled />,
              onOk() {
                sessionStorage.clear();
                navigate('/login', { replace: true });
              },
            })
          }
        />
      </StyledDiv>
    </div>
  );
}

export default SideBar;
