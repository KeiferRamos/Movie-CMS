import axios from 'axios';
import { setConfig } from '../../utils/setConfig';

export const getAllUsers = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`);
  return data;
};

export const getUser = async (id) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/users/${id}`,
    setConfig(),
  );

  return data;
};

export const editUser = async (values) => {
  const { data } = await axios.put(
    `${process.env.REACT_APP_BASE_URL}/users/${values._id}`,
    values,
    setConfig(),
  );

  return data;
};

export const deleteUserById = async (id) => {
  const { data } = await axios.delete(
    `${process.env.REACT_APP_BASE_URL}/users/${id}`,
    setConfig(),
  );

  await axios.post(`${process.env.REACT_APP_BASE_URL}/activities`, {
    type: 'user',
    id: id,
    user: id,
    summary: `deleted user with id ${id}`,
    action: 'delete',
  });

  return data;
};

export const createUser = async (values) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/users/login`,
    values,
  );

  return data;
};

export const register = async (values) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/users/register`,
    values,
  );

  return data;
};
