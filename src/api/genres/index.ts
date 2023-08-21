import axios from 'axios';

export const getAllMovieGenres = async () => {
  const { data } = await axios({
    method: 'GET',
    url: '/genres',
  });

  return data;
};

export const getGenreById = async (id) => {
  const { data } = await axios({
    method: 'GET',
    url: `/genres/${id}`,
  });

  return data;
};

export const editGenre = async (id, values) => {
  await axios({
    method: 'PUT',
    url: `/genres/${id}`,
    data: values,
  });
};

export const createGenre = async (values) => {
  await axios({
    method: 'POST',
    url: '/genres',
    data: values,
  });
};

export const deleteGenre = async (id) => {
  await axios({
    method: 'DELETE',
    url: `/genres/${id}`,
  });
};
