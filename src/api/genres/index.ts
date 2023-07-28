import axios from 'axios';

export const getAllMovieGenres = async () => {
  const { data: genreList } = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/genres`,
  );

  return genreList;
};

export const getGenreById = async (id) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/genres/${id}`,
  );
  return data;
};

export const editGenre = async (id, values) => {
  await axios.put(`${process.env.REACT_APP_BASE_URL}/genres/${id}`, values);
};

export const createGenre = async (values) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/genres`, values);
};

export const deleteGenre = async (id) => {
  await axios.delete(`${process.env.REACT_APP_BASE_URL}/genres/${id}`);
};
