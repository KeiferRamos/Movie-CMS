import Layout from '../../layout/main';
import { useEffect, useState } from 'react';
import CustomTable from '../../components/table';
import { deleteUserById, getAllUsers } from '../../api/users';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { Modal, message } from 'antd';
import { StyledActions } from './style';
import { Link } from 'react-router-dom';

function ManageUser() {
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [list, setList] = useState([]);
  const [fetch, setFetch] = useState(true);

  const columns = [
    {
      title: 'User ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (value, record) => {
        return (
          <p>
            {record.firstName} {record.lastName}
          </p>
        );
      },
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
        { text: 'Administrator', value: 'admin' },
        { text: 'Developer', value: 'dev' },
      ],
      onFilter: (val, record) => record.role && record.role === val,
      render: (text: string) => {
        return (
          <p className={`role ${text}`}>
            {text === 'admin' ? 'Administrator' : 'Developer'}
          </p>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (val, record) => {
        return (
          <StyledActions>
            <DeleteTwoTone
              twoToneColor={'#f7078b'}
              onClick={() => {
                setOpen(true);
                setIdToDelete(record._id);
              }}
            />
            <Link to={`/manage-users/edit/${record._id}`}>
              <EditTwoTone />
            </Link>
          </StyledActions>
        );
      },
    },
  ];

  const handleOk = () => {
    setConfirmLoading(true);
    deleteUserById(idToDelete).then(() => {
      setConfirmLoading(true);
      setOpen(false);
      setFetch(true);
      message.success('user deleted successfully');
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (fetch) {
      getAllUsers()
        .then((data) => {
          setList(data);
          setFetch(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [fetch]);

  return (
    <Layout
      isSpinning={!list.length}
      routes={[
        {
          title: 'Manage User',
        },
      ]}
    >
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete the user with id {idToDelete}</p>
      </Modal>
      <CustomTable dataSource={list} columns={columns} />
    </Layout>
  );
}

export default ManageUser;
