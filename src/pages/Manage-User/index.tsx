import axios from 'axios';
import Layout from '../../layout/main';
import { useEffect, useState } from 'react';
import {
  EditTwoTone,
  DeleteTwoTone,
  PlaySquareTwoTone,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import jwt from 'jwt-decode';
import { Modal, message } from 'antd';
import { setAddress } from '../../utils/setAdress';
import { setConfig } from '../../utils/setConfig';
import CustomTable from '../../components/table';

const StyledActions = styled.div`
  display: flex;
  gap: 10px;

  svg {
    font-size: 18px;
  }
`;

function ManageUser() {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [fetch, setFetch] = useState(true);

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => {
        return a.username.localeCompare(b.username);
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => {
        return <a href={`mailto: ${text}`}>{text}</a>;
      },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'Administrator', value: 'administrator' },
        { text: 'Developer', value: 'developer' },
        { text: 'Project Manager', value: 'manager' },
      ],
      onFilter: (val, record) => record.role && record.role === val,
      render: (text: string) => {
        return <p className={`role ${text}`}>{text}</p>;
      },
    },
    {
      title: 'Adress',
      dataIndex: 'address',
      key: 'address',
      render: (_, record) => setAddress(record.address),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const token: any = jwt(sessionStorage.getItem('access_token'));

        const deleteUser = async () => {
          const { id, username }: any = jwt(
            sessionStorage.getItem('access_token'),
          );

          await axios.delete(
            `http://localhost:3001/users/${record._id}`,
            setConfig(),
          );

          await axios.post(`http://localhost:3001/activities`, {
            type: 'user',
            action: 'delete',
            user: id,
            summary: `You deleted user with id ${record._id}`,
            id: record._id,
          });
        };

        return (
          <StyledActions>
            {token.id === record._id ? (
              <Link to={`/manage-users/edit/${record._id}`}>
                <EditTwoTone />
              </Link>
            ) : null}
            {token.role === 'administrator' || token.id === record._id ? (
              <DeleteTwoTone
                twoToneColor="#eb2f96"
                onClick={() =>
                  Modal.confirm({
                    title: 'Are you sure you want to delete this user?',
                    icon: <ExclamationCircleFilled />,
                    onOk: () => {
                      deleteUser().then(() => {
                        message.success('user deleted successfully!');
                        setFetch(true);
                      });
                    },
                  })
                }
              />
            ) : null}
            {(token.role === 'administrator' || token.id === record._id) &&
            record.bio ? (
              <Link to={`/manage-users/${record._id}`}>
                <PlaySquareTwoTone twoToneColor="#52c41a" />
              </Link>
            ) : null}
          </StyledActions>
        );
      },
    },
  ];

  const getAllUsers = async () => {
    const token = sessionStorage.getItem('access_token');

    const { data } = await axios.get('http://localhost:3001/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  };

  useEffect(() => {
    if (fetch) {
      getAllUsers()
        .then((data) => {
          setData(data);
          setList(data);
          setFetch(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [fetch]);

  const onSearch = (value) => {
    if (value) {
      const filteredList = [];

      data.forEach((item) => {
        const { fullName, address } = item;

        let name = '';
        let location = '';

        const { firstName, lastName, middleName } = fullName;
        name = `${firstName} ${middleName} ${lastName}`;

        const { blockNumber, Street, Barangay, City, Province } = address;
        location = `${blockNumber} ${Street} ${Barangay} ${City} ${Province}`;

        const data = {
          ...item,
          name,
          location,
        };

        const itemsKey = Object.keys(data);

        const searchedItem = itemsKey.find((key) => data[key] === value);
        if (searchedItem) {
          filteredList.push(item);
        }
      });
      if (filteredList.length) {
        setList(filteredList);
      }
    } else {
      setList(data);
    }
  };

  return (
    <Layout
      isSpinning={!list.length}
      routes={[
        {
          title: <Link to="/manage-users">Manage User</Link>,
        },
      ]}
    >
      <CustomTable dataSource={list} columns={columns} onSearch={onSearch} />
    </Layout>
  );
}

export default ManageUser;
