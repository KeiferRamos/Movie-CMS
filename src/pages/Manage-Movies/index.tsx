import { useEffect, useState } from 'react';
import { CardContainer, Featured, StyledAddBtn } from './styled';
import Layout from '../../layout/main';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { setConfig } from '../../utils/setConfig';
import { Card, Modal, message } from 'antd';
import NoImageIcon from '../../global/images/no-picture-taking.png';
import jwt from 'jwt-decode';
import AddBtn from '../../global/images/plus.png';
import {
  EditTwoTone,
  DeleteTwoTone,
  PlaySquareTwoTone,
} from '@ant-design/icons';
import { GlobalContext } from '../../context/context';

function ManageMovies() {
  const [movies, setMovies] = useState([]);
  const {
    state: { username },
  }: any = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [fetch, setFetch] = useState(true);
  const navigate = useNavigate();

  const getAllMovies = async () => {
    const { data } = await axios.get(
      'http://localhost:3001/movies',
      setConfig(),
    );

    return data;
  };

  useEffect(() => {
    if (fetch) {
      getAllMovies()
        .then((data) => {
          setMovies(data);
          setIsLoading(false);
          setData(data);
          setFetch(false);
        })
        .catch((err) => console.log(err));
    }
  }, [fetch]);

  const onSearch = (value) => {
    console.log(value);
  };

  return (
    <Layout
      isSpinning={isLoading}
      routes={[
        {
          title: 'Manage Movies',
        },
      ]}
    >
      <CardContainer>
        <StyledAddBtn onClick={() => navigate('/manage-movies/add-movie')}>
          <img src={AddBtn} alt="" />
          <p>Add Movie</p>
        </StyledAddBtn>
        {movies.map((movie) => {
          const { image, title, genres, _id, featured } = movie;
          return (
            <Card
              key={_id}
              cover={
                image ? (
                  <img alt="example" src={image} />
                ) : (
                  <img className="no-image" src={NoImageIcon} />
                )
              }
              actions={[
                <EditTwoTone
                  onClick={() => {
                    navigate(`/manage-movies/edit/${_id}`);
                  }}
                />,
                <DeleteTwoTone
                  twoToneColor="#eb2f96"
                  onClick={() => {
                    return Modal.confirm({
                      title: 'Are you sure you want to delete this Item?',
                      onOk: async () => {
                        await axios.delete(
                          `http://localhost:3001/movies/${_id}`,
                          setConfig(),
                        );

                        await axios.post(`http://localhost:3001/activities`, {
                          type: 'movie',
                          id: movie._id,
                          user: username,
                          summary: `You added item from movie list`,
                          action: 'Add',
                        });

                        setFetch(true);
                        message.success('item deleted successfully');
                      },
                    });
                  }}
                />,
                <PlaySquareTwoTone
                  twoToneColor="#52c41a"
                  onClick={() => {
                    navigate(`/manage-movies/${_id}`);
                  }}
                />,
              ]}
            >
              {featured ? <Featured>Featured</Featured> : null}
              <Card.Meta
                title={title}
                description={genres.slice(0, 3).map((text) => {
                  return (
                    <span key={text} style={{ marginRight: 4 }}>
                      {text}
                    </span>
                  );
                })}
              />
            </Card>
          );
        })}
      </CardContainer>
    </Layout>
  );
}

export default ManageMovies;
