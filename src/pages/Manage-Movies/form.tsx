import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../layout/main';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { setConfig } from '../../utils/setConfig';
import { ValidationSchema, genreOptions, initialValues } from './constant';
import { Row, Col, Checkbox, message } from 'antd';
import Upload from '../../components/upload';
import { Formik } from 'formik';
import CustomInput from '../../components/input';
import { Form, SubmitButton } from 'formik-antd';
import Select from '../../components/select';
import Richtext from '../../components/richtext';
import { StyledCheckbox, UploadContainer } from './styled';
import Cast from '../../components/castform';
import { GlobalContext } from '../../context/context';
import {
  createMovie,
  editMovie,
  getAllMovies,
  getMovie,
  getSimilar,
} from '../../api/movies';
import { getAllMovieGenres } from '../../api/genres';

function Forms() {
  const [genres, setGenres] = useState([]);
  const [similarOptions, setSimilarOptions] = useState([]);
  const [movie, setMovie] = useState<any>(initialValues);
  const { state }: any = useContext(GlobalContext);
  const { id }: any = useParams();

  useEffect(() => {
    const similars = getSimilar(id);
    const selectedMovie = getMovie(id);
    const genres = getAllMovieGenres();

    Promise.all([similars, selectedMovie, genres]).then(
      ([similars, selectedMovie, genres]) => {
        setMovie(selectedMovie);
        setGenres(genres.map(({ name }) => name));
        setSimilarOptions(
          similars.map((similar) => {
            const { _id, ...rest } = similar;
            return { label: similar.title, value: { ...rest, movieId: _id } };
          }),
        );
      },
    );
  }, []);

  const submitForm = async (values) => {
    if (id) {
      await editMovie(values, id, state);

      message.success('item updated successfully');
    } else {
      await createMovie(values, id, state);

      message.success('item added successfully');
    }
  };

  const addItemRoutes = [
    {
      title: <Link to="/manage-movies">Manage Movies</Link>,
    },
    {
      title: 'Add',
    },
  ];

  const routes = [
    {
      title: <Link to="/manage-movies">Manage Movies</Link>,
    },
    {
      title: <Link to={`/manage-movies/${movie._id}`}>{movie.title}</Link>,
    },
    {
      title: id ? 'Edit' : 'Add',
    },
  ];

  return (
    <Layout
      isSpinning={id ? !movie._id : false}
      routes={id ? routes : addItemRoutes}
    >
      <Formik
        initialValues={movie}
        onSubmit={submitForm}
        validationSchema={ValidationSchema}
      >
        {({ values, setFieldValue, dirty, isValid }) => {
          return (
            <Form>
              <Row>
                <UploadContainer span={6}>
                  <Upload
                    value={values.mobileImage}
                    onchange={(value) => setFieldValue('mobileImage', value)}
                  ></Upload>
                </UploadContainer>
                <UploadContainer span={18}>
                  <Upload
                    value={values.image}
                    onchange={(value) => setFieldValue('image', value)}
                  ></Upload>
                </UploadContainer>
              </Row>
              <Row gutter={10}>
                <CustomInput name="title" placeholder="Title" span={11} />
                <CustomInput name="trailer" placeholder="Trailer" span={7} />
                <CustomInput
                  name="year"
                  placeholder="Year Published"
                  span={3}
                />
                <Col span={3}>
                  <Select
                    labelText={'Featured'}
                    options={[
                      { label: 'true', value: true },
                      { label: 'false', value: false },
                    ]}
                    value={values.featured}
                    onClick={(value) => setFieldValue('featured', value)}
                  />
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={3}>
                  <Select
                    labelText={'is Ranked?'}
                    options={[
                      { label: 'true', value: true },
                      { label: 'false', value: false },
                    ]}
                    value={values.rank.isRanked}
                    onClick={(value) => setFieldValue('rank.isRanked', value)}
                  />
                </Col>
                <CustomInput
                  name="rank.rankNumber"
                  placeholder="Rank Number"
                  span={3}
                />

                <Col span={18}>
                  <Select
                    labelText="similar"
                    removeItem={(value) => {
                      setFieldValue(
                        'similar',
                        values.similar.filter(
                          ({ title }) => value.title !== title,
                        ),
                      );
                    }}
                    value={values.similar}
                    options={similarOptions}
                    onClick={(value) =>
                      setFieldValue('similar', [...values.similar, value])
                    }
                  />
                </Col>
              </Row>
              <br />
              <h2>Casts</h2>
              <Row>
                <Cast setFieldValue={setFieldValue} cast={values.cast} />
              </Row>
              <br />
              <Row style={{ background: '#f9fbfc', padding: 20 }}>
                <h2 style={{ margin: 0 }}>Genres</h2>
                <StyledCheckbox
                  options={genres}
                  value={values.genres}
                  onChange={(e) => setFieldValue('genres', e)}
                />
              </Row>
              <br />
              <Row>
                <Richtext
                  data={values.plot}
                  onchange={(value) => setFieldValue('plot', value)}
                ></Richtext>
              </Row>
              <SubmitButton disabled={!dirty || !isValid}>Save</SubmitButton>
            </Form>
          );
        }}
      </Formik>
    </Layout>
  );
}

export default Forms;
