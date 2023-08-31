import * as yup from 'yup';
import { ActionBtn } from './style';
import {
  AppstoreAddOutlined,
  DeleteTwoTone,
  EditTwoTone,
} from '@ant-design/icons';

export const ValidationSchema = yup.object().shape({
  firstName: yup.string().required('this field is required!'),
  lastName: yup.string().required('this field is required!'),
  email: yup.string().required('this field is required!'),
});

export const initialValues = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  contactNumber: '',
  role: '',
  activities: [],
  permissions: [],
  image: '',
};

export const permissions = [
  'create:movie',
  'create:blog',
  'create:genre',
  'edit:movie',
  'edit:blog',
  'edit:genre',
  'delete:movie',
  'delete:blog',
  'delete:genre',
  'delete:user',
  'view:users',
  'view:movie',
  'edit:user',
];

function setTime(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

export const columns = [
  {
    title: 'Type',
    dataIndex: 'model',
    key: 'model',
    render: (value) => {
      return <p className={`model model-${value}`}>{value}</p>;
    },
  },
  {
    title: 'Method',
    dataIndex: 'method',
    key: 'method',
    render: (text) => {
      switch (text) {
        case 'DELETE':
          return (
            <ActionBtn>
              <DeleteTwoTone twoToneColor="#f7078b" />
              <p>DELETE</p>
            </ActionBtn>
          );
        case 'CREATE':
          return (
            <ActionBtn>
              <AppstoreAddOutlined twoToneColor="#eaac0f" />
              <p>CREATE</p>
            </ActionBtn>
          );
        case 'UPDATE':
          return (
            <ActionBtn>
              <EditTwoTone />
              <p>UPDATE</p>
            </ActionBtn>
          );
      }
    },
  },
  {
    title: 'Item ID',
    dataIndex: 'id',
    key: 'id',
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
