import { useContext, useEffect, useState } from 'react';
import Layout from '../../layout/main';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ValidationSchema, initialValues } from './constant';
import { Row, Col, message, Input } from 'antd';
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
  const navigate = useNavigate();
  const { id }: any = useParams();

  useEffect(() => {
    const similars = id ? getSimilar(id) : getAllMovies();

    const selectedMovie = id ? getMovie(id) : null;
    const genres = getAllMovieGenres();

    Promise.all([similars, selectedMovie, genres]).then(
      ([similars, selectedMovie, genres]) => {
        if (id) {
          setMovie(selectedMovie);
        }
        setGenres(genres.map(({ name }) => name));
        setSimilarOptions(
          similars.map((similar) => {
            const { _id, ...rest } = similar;
            return {
              label: similar.title,
              value: { ...rest, movieId: _id },
            };
          }),
        );
      },
    );
  }, []);

  const submitForm = async (values) => {
    const { similar, rank, year, ...rest } = values;

    const similarTitles = similarOptions.map(({ label }) => label);
    const similarItems = values.similar.filter(({ title }) =>
      similarTitles.includes(title),
    );

    const data = {
      similar: similarItems,
      year: parseInt(year),
      rank: parseInt(rank),
      ...rest,
    };

    if (id) {
      await editMovie(data, id, state);
      message.success('item updated successfully');
      navigate('/manage-movies');
    } else {
      await createMovie(data, state);
      message.success('item added successfully');
      navigate('/manage-movies');
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
                    style={{ height: '450px' }}
                    value={values.mobileImage}
                    onchange={(value) => setFieldValue('mobileImage', value)}
                  ></Upload>
                </UploadContainer>
                <UploadContainer span={18}>
                  <Upload
                    style={{ height: '450px' }}
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
                <CustomInput name="rank" placeholder="Rank" span={2} />
                <Col span={22}>
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
                <Input.TextArea
                  value={values.plot}
                  onChange={(e) => setFieldValue('plot', e.target.value)}
                  name="plot"
                  placeholder="plot here..."
                  autoSize={{
                    minRows: 8,
                    maxRows: 8,
                  }}
                ></Input.TextArea>
              </Row>
              <br />
              <SubmitButton disabled={!dirty || !isValid}>Save</SubmitButton>
            </Form>
          );
        }}
      </Formik>
    </Layout>
  );
}

export default Forms;
