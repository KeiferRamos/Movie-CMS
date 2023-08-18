import React, { useState, useEffect } from 'react';
import Layout from '../../layout/main';
import { Link, useParams } from 'react-router-dom';
import { setConfig } from '../../utils/setConfig';
import { initialValues } from './constant';
import axios from 'axios';
import {
  SimilarContainer,
  StyledArrow,
  StyledFeatured,
  ViewContainer,
} from './styled';
import { Carousel, Empty } from 'antd';
import { CaretLeftFilled, CaretRightFilled } from '@ant-design/icons';
import NoImageIcon from '../../global/images/no-picture-taking.png';
import { getMovie } from '../../api/movies';

const ArrowNext = (props) => {
  return (
    <StyledArrow style={{ right: '10px' }}>
      <CaretRightFilled onClick={props.onClick} />
    </StyledArrow>
  );
};

const ArrowPrev = (props) => {
  return (
    <StyledArrow style={{ left: '10px' }}>
      <CaretLeftFilled onClick={props.onClick} />
    </StyledArrow>
  );
};

function ViewMovie() {
  const [movie, setMovie] = useState<any>(initialValues);
  const [fetch, setFetch] = useState(true);
  const { id }: any = useParams();

  const settings = {
    slidesToShow: 1,
    arrows: true,
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrev />,
  };

  useEffect(() => {
    if (fetch) {
      getMovie(id).then((data) => {
        console.log(data);
        setMovie(data);
        setFetch(false);
      });
    }
  }, [fetch]);

  const routes = [
    {
      title: <Link to="/manage-movies">Manage Movies</Link>,
    },
    {
      title: <Link to={`/manage-movies/edit/${id}`}>Edit</Link>,
    },
    {
      title: movie.title,
    },
  ];
  return (
    <Layout isSpinning={!movie._id} routes={routes}>
      <ViewContainer>
        <header>
          <div>
            {movie.rank ? (
              <span className="rank">{movie.rank.rankNumber}</span>
            ) : null}
            <h1 className="title">{movie.title}</h1>
          </div>
          <div>
            {movie.genres.map((genre, i) => (
              <span key={i}>{genre}</span>
            ))}
          </div>
          {movie.featured ? <StyledFeatured>Featured</StyledFeatured> : null}
        </header>
        <h2>Story Plot</h2>
        {movie.plot ? (
          <div
            className="plot"
            dangerouslySetInnerHTML={{
              __html: movie.plot,
            }}
          />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
        <br />
        <div className="image-container">
          <div>
            {movie.mobileImage ? (
              <img src={movie.mobileImage} alt="" />
            ) : (
              <img src={NoImageIcon} className="no-image" />
            )}
            <span>Mobile</span>
          </div>
          <div>
            {movie.image ? (
              <img src={movie.image} alt="" />
            ) : (
              <img src={NoImageIcon} className="no-image" />
            )}
            <span>Desktop</span>
          </div>
        </div>
        <h2>Cast</h2>
        {movie.cast.length ? (
          <div className="cast">
            {movie.cast.map(({ image, name, asCharacter, _id }: any) => {
              return (
                <div key={_id}>
                  <img src={image} alt="" />
                  <p>{name}</p>
                  <p>
                    as <span>{asCharacter}</span>
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
        <br />
        <h2>Similars</h2>
        {movie.similar.length ? (
          <Carousel {...settings}>
            {movie.similar.map(({ image, title, _id }) => {
              return (
                <SimilarContainer key={_id}>
                  <img src={image} alt="" />
                  <span>
                    <p>{title}</p>
                  </span>
                </SimilarContainer>
              );
            })}
          </Carousel>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </ViewContainer>
    </Layout>
  );
}

export default ViewMovie;
