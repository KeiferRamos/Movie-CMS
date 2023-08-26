import axios from 'axios';

export const createBlog = async (data) => {
  await axios({
    method: 'POST',
    url: '/blogs',
    data,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
    },
  });
};

export const UpdateBlog = async (data, id) => {
  await axios({
    method: 'PUT',
    url: `/blogs/${id}`,
    data,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
    },
  });
};

export const getAllblogs = async () => {
  const { data } = await axios({
    method: 'GET',
    url: `/blogs`,
  });

  return data;
};

export const getBlogById = async (id) => {
  const { data } = await axios({
    method: 'GET',
    url: `/blogs/${id}`,
  });

  return data;
};

export const deleteBlog = async (id) => {
  return axios({
    method: 'DELETE',
    url: `/blogs/${id}`,
  });
};
