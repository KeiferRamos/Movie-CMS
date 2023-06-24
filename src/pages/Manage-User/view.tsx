import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import jwt from 'jwt-decode';
import Layout from '../../layout/main';
import { ActionBtn, Icons, StyledPageHeader, Info } from './style';
import {
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  DeleteTwoTone,
  EditTwoTone,
  HomeFilled,
  MailFilled,
  PhoneFilled,
  ExclamationCircleFilled,
  PlaySquareTwoTone,
} from '@ant-design/icons';
import { setAddress } from '../../utils/setAdress';
import { setName } from '../../utils/setName';
import { Table, Tag, Modal, message, Breadcrumb } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { initialValues } from './constant';
import { setConfig } from '../../utils/setConfig';
import { setTime } from '../../utils/setTime';

const { confirm } = Modal;

function ViewUser() {
  const [user, setUser] = useState(initialValues);
  const [activities, setActivities] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const getActivity = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/activities/${user._id}`,
      setConfig(),
    );
    return data;
  };

  useEffect(() => {
    if (user.username) {
      getActivity().then((data) => {
        setActivities(data);
      });
    }
  }, [user.username]);

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text) => {
        switch (text) {
          case 'delete':
            return (
              <ActionBtn>
                <DeleteTwoTone twoToneColor="#f7078b" />
                <p>DELETE</p>
              </ActionBtn>
            );
          case 'view':
            return (
              <ActionBtn>
                <PlaySquareTwoTone twoToneColor="#52c41a" />
                <p>VIEW</p>
              </ActionBtn>
            );
          default:
            <ActionBtn>
              <EditTwoTone />
              <p>EDIT</p>
            </ActionBtn>;
        }
      },
    },
    {
      title: 'Summary',
      dataIndex: 'summary',
      key: 'summary',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => `${new Date(text).toDateString()}`,
    },
    {
      title: 'Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => {
        return <span>{setTime(new Date(text))}</span>;
      },
    },
  ];

  const getUser = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/users/${id}`,
      setConfig(),
    );
    return data;
  };

  const deleteUserById = async () => {
    const { data } = await axios.delete(
      `http://localhost:3001/users/${user._id}`,
      setConfig(),
    );

    return data;
  };

  const deleteUser = () => {
    confirm({
      title: 'Are you sure you want to delete this user?',
      icon: <ExclamationCircleFilled />,
      onOk() {
        deleteUserById()
          .then((response) => {
            message.success(
              `successfully deleted user with username ${response.username}`,
            );
            const token = sessionStorage.getItem('access_token');
            const { id }: any = jwt(token);
            if (id === response.id) {
              sessionStorage.clear();
              return navigate('/login');
            }
            return navigate('/manage-users');
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });
  };

  const routes = [
    {
      title: <Link to="/manage-users">Manage User</Link>,
    },
    {
      title: user.username,
    },
  ];

  useEffect(() => {
    getUser()
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Layout isSpinning={!user.bio} routes={routes}>
      <StyledPageHeader
        title={user.username}
        subTitle={setName(user.fullName)}
        tags={<Tag color="#f56fb9">{user.role}</Tag>}
        extra={[
          <ActionBtn onClick={deleteUser}>
            <DeleteTwoTone twoToneColor={'#f7078b'} />
            <p>Delete User</p>
          </ActionBtn>,
          <ActionBtn
            onClick={() => {
              navigate(`/manage-users/edit/${user._id}`);
            }}
          >
            <EditTwoTone />
            <p>Edit User</p>
          </ActionBtn>,
        ]}
        avatar={{
          src: user.image.data,
        }}
      >
        <div style={{ padding: '0 10px' }}>
          <div style={{ gap: '10px' }}>
            <Info>
              <HomeFilled style={{ color: '#1eae0e' }} />
              {setAddress(user.address)}
            </Info>
            <Info>
              <MailFilled style={{ color: '#4379e4' }} />
              {user.email}
            </Info>
            <Info>
              <PhoneFilled style={{ color: '#f7078b' }} />
              {user.contactNumber}
            </Info>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: user.bio,
            }}
          />
          <Icons>
            <span>
              <FacebookFilled />
              <p>Facebook</p>
            </span>
            <span>
              <InstagramFilled />
              <p>Instagram</p>
            </span>
            <span>
              <LinkedinFilled />
              <p>LinkedIn</p>
            </span>
          </Icons>
        </div>
      </StyledPageHeader>
      <section>
        <PageHeader title="Activities" subTitle="Active participation in cms" />
        <Table dataSource={activities} columns={columns}></Table>
      </section>
    </Layout>
  );
}

export default ViewUser;
