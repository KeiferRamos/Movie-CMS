import axios from 'axios';
import { setConfig } from '../../utils/setConfig';

export const getAllUsers = async () => {
  const { data } = await axios({
    method: 'GET',
    url: '/users',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
    },
  });
  return data;
};

export const getUser = async (id) => {
  const { data } = await axios({
    method: 'GET',
    url: `/users/${id}`,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
    },
  });

  return data;
};

export const editUser = async (values, id) => {
  const { data } = await axios({
    method: 'PUT',
    url: `/users/${id}`,
    data: values,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
    },
  });

  return data;
};

export const deleteUserById = async (id) => {
  const { data } = await axios({
    method: 'DELETE',
    url: `/users/${id}`,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
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
