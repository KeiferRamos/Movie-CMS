import axios from 'axios';
import { setConfig } from '../../utils/setConfig';

export const editMovie = async (values, id, state) => {
  await axios.put(
    `${process.env.REACT_APP_BASE_URL}/movies/${values._id}`,
    values,
    setConfig(),
  );

  await axios.post(`${process.env.REACT_APP_BASE_URL}/activities`, {
    type: 'movie',
    id: id,
    user: state.id,
    summary: `updated movie with id ${id}`,
    action: 'update',
  });
};

export const createMovie = async (values, id, state) => {
  await axios.post(
    `${process.env.REACT_APP_BASE_URL}/movies/create`,
    values,
    setConfig(),
  );

  await axios.post(`${process.env.REACT_APP_BASE_URL}/activities`, {
    type: 'movie',
    id: id,
    user: state.id,
    summary: `added item from movie list`,
    action: 'Add',
  });
};

export const getAllMovies = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/movies`,
    setConfig(),
  );

  return data;
};

export const deleteMovieById = async (username, id, movie) => {
  await axios.delete(
    `${process.env.REACT_APP_BASE_URL}/movies/${id}`,
    setConfig(),
  );

  await axios.post(`${process.env.REACT_APP_BASE_URL}/activities`, {
    type: 'movie',
    id: movie._id,
    user: username,
    summary: `You added item from movie list`,
    action: 'Add',
  });
};

export const getMovie = async (id) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/movies/${id}`,
    setConfig(),
  );

  return data;
};

export const getSimilar = async (id: string) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/movies/similar/${id}`,
  );

  return data;
};
