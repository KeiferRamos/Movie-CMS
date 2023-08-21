import axios from 'axios';
import { setConfig } from '../../utils/setConfig';

export const editMovie = async (values, id, state) => {
  await axios({
    method: 'PUT',
    url: `/movies/${values._id}`,
    data: values,
  });

  await axios({
    url: '/activities',
    method: 'POST',
    data: {
      type: 'movie',
      id: id,
      user: state.id,
      summary: `updated movie with id ${id}`,
      action: 'update',
    },
  });
};

export const createMovie = async (values, state) => {
  await axios({
    method: 'POST',
    url: '/movies',
    data: values,
  });

  await axios({
    method: 'POST',
    url: '/activities',
    data: {
      type: 'movie',
      user: state.id,
      summary: `added item from movie list`,
      action: 'Add',
    },
  });
};

export const getAllMovies = async () => {
  const { data } = await axios({
    method: 'GET',
    url: '/movies',
  });

  return data;
};

export const deleteMovieById = async (username, id, movie) => {
  await axios({
    method: 'DELETE',
    url: `/movies/${id}`,
  });

  await axios({
    method: 'POST',
    url: '/activities',
    data: {
      type: 'movie',
      id: movie._id,
      user: username,
      summary: `You added item from movie list`,
      action: 'Add',
    },
  });
};

export const getMovie = async (id) => {
  const { data } = await axios({
    method: 'GET',
    url: `/movies/${id}`,
  });

  return data;
};

export const getSimilar = async (id: string) => {
  const { data } = await axios({
    method: 'GET',
    url: `/movies/similar/${id}`,
  });

  return data;
};
