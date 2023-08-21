import axios from 'axios';
import { setConfig } from '../../utils/setConfig';

export const getAllUsers = async () => {
  const { data } = await axios({
    method: 'GET',
    url: '/users',
  });
  return data;
};

export const getUser = async (id) => {
  const { data } = await axios({
    method: 'GET',
    url: `/users/${id}`,
  });

  return data;
};

export const editUser = async (values) => {
  const { data } = await axios({
    method: 'PUT',
    url: `/users/${values._id}`,
    data: values,
  });

  return data;
};

export const deleteUserById = async (id) => {
  const { data } = await axios({
    method: 'DELETE',
    url: `/users/${id}`,
  });

  await axios({
    method: 'POST',
    url: '/activities',
    data: {
      type: 'user',
      id: id,
      user: id,
      summary: `deleted user with id ${id}`,
      action: 'delete',
    },
  });

  return data;
};

export const createUser = async (values) => {
  const { data } = await axios({
    method: 'POST',
    url: '/users/login',
    data: values,
  });

  return data;
};

export const register = async (values) => {
  const { data } = await axios({
    method: 'POST',
    url: '/users/register',
    data: values,
  });

  return data;
};
