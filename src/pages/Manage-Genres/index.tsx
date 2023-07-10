import React, { useEffect, useState } from 'react';
import Layout from '../../layout/main';
import axios from 'axios';
import { StyledButton, StyledGenre } from './style';
import { Dropdown, Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

function GenreList() {
  const [genre, setGenre] = useState([]);
  const [fetch, setFetch] = useState(true);

  const getAllGenre = async () => {
    const { data } = await axios.get('http://localhost:3001/genres');
    return data;
  };

  const deleteGenreById = async (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this item?',
      onOk: async () => {
        await axios.delete(`http://localhost:3001/genres/${id}`);
        setFetch(true);
        message.success('Genre Deleted Successfully');
      },
    });
  };

  useEffect(() => {
    if (fetch) {
      getAllGenre()
        .then((response) => {
          setGenre(response);
          setFetch(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [fetch]);

  const routes = [
    {
      title: 'Manage Genre',
    },
  ];

  return (
    <Layout routes={routes} isSpinning={!genre.length}>
      <Link style={{ textDecoration: 'none' }} to="/manage-genres/add-genre">
        <StyledButton type="dashed">
          <PlusOutlined /> Add Genre
        </StyledButton>
      </Link>
      {genre.map(({ image, name, description, _id }) => {
        return (
          <StyledGenre>
            <div className="buttons">
              <Link to={`/manage-genres/edit/${_id}`}>
                <EditTwoTone />
                Edit
              </Link>
              <button>
                <DeleteTwoTone
                  twoToneColor={'#ea8484'}
                  onClick={() => deleteGenreById(_id)}
                />
                Delete
              </button>
            </div>
            <div className="info">
              <h2>{name}</h2>
              <p>{description}</p>
            </div>
            <img src={image} alt="" />
          </StyledGenre>
        );
      })}
    </Layout>
  );
}

export default GenreList;
