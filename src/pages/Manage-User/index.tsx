import axios from 'axios';
import Layout from '../../layout/main';
import { useContext, useEffect, useState } from 'react';
import {
  EditTwoTone,
  DeleteTwoTone,
  PlaySquareTwoTone,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Modal, message } from 'antd';
import { setAddress } from '../../utils/setAdress';
import CustomTable from '../../components/table';
import { StyledActions } from './style';
import { GlobalContext } from '../../context/context';
import { deleteUserById, getAllUsers } from '../../api/users';

function ManageUser() {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [fetch, setFetch] = useState(true);
  const {
    state: { id, role },
  }: any = useContext(GlobalContext);

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
        return (
          <StyledActions>
            {id === record._id ? (
              <Link to={`/manage-users/edit/${record._id}`}>
                <EditTwoTone />
              </Link>
            ) : null}
            {role === 'administrator' || id === record._id ? (
              <DeleteTwoTone
                twoToneColor="#eb2f96"
                onClick={() =>
                  Modal.confirm({
                    title: 'Are you sure you want to delete this user?',
                    icon: <ExclamationCircleFilled />,
                    onOk: async () => {
                      await deleteUserById(record._id);
                      message.success('user deleted successfully!');
                      setFetch(true);
                    },
                  })
                }
              />
            ) : null}
            {record.bio ? (
              <Link to={`/manage-users/${record._id}`}>
                <PlaySquareTwoTone twoToneColor="#52c41a" />
              </Link>
            ) : null}
          </StyledActions>
        );
      },
    },
  ];

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
          title: 'Manage User',
        },
      ]}
    >
      <CustomTable dataSource={list} columns={columns} onSearch={onSearch} />
    </Layout>
  );
}

export default ManageUser;
