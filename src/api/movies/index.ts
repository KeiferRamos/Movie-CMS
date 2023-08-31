import axios from 'axios';

export const editMovie = async (values, id, state) => {
  await axios({
    method: 'PUT',
    url: `/movies/${values._id}`,
    data: values,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
    },
  });
};

export const createMovie = async (values, state) => {
  await axios({
    method: 'POST',
    url: '/movies',
    data: values,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
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
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
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
