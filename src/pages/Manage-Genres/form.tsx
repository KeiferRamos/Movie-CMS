import React, { useEffect, useState } from 'react';
import Layout from '../../layout/main';
import { Link, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import { initialValues } from './constant';
import { Row, Col, message } from 'antd';
import Upload from '../../components/upload';
import { UploadContainer } from './style';
import axios from 'axios';
import CustomInput from '../../components/input';

function Forms() {
  const [genre, setGenre] = useState(initialValues);
  const { id }: any = useParams();

  const getGenreById = async () => {
    const { data } = await axios.get(`http://localhost:3001/genres/${id}`);
    setGenre(data);
  };

  useEffect(() => {
    if (id) {
      getGenreById();
    }
  }, []);

  const submitForm = async (values) => {
    if (id) {
      await axios.put(`http://localhost:3001/genres/${id}`, values);
      message.success('item updated successfully');
    } else {
      await axios.post(`http://localhost:3001/genres`, values);
      message.success('item added successfully');
    }
  };

  return (
    <Layout
      isSpinning={id ? !genre.name : false}
      routes={[
        { title: <Link to="/manage-genres">Manage Genres</Link> },
        { title: id ? `Editing ${genre.name}` : 'Add' },
      ]}
    >
      <Formik initialValues={genre} onSubmit={submitForm}>
        {({ setFieldValue, values }) => {
          return (
            <Form>
              <Row>
                <UploadContainer span={18}>
                  <Upload
                    value={values.image}
                    onchange={(value) => setFieldValue('image', value)}
                  />
                </UploadContainer>
                <UploadContainer span={6}>
                  <Upload
                    value={values.mobileImage}
                    onchange={(value) => setFieldValue('mobileImage', value)}
                  />
                </UploadContainer>
              </Row>
              <br />
              <Row>
                <CustomInput name="name" placeholder="title here" span={24} />
              </Row>
              <br />
              <Row>
                <h3
                  style={{
                    color: '#547ceb',
                    fontWeight: '400',
                    marginBottom: 10,
                  }}
                >
                  Description
                </h3>
                <Input.TextArea
                  name="description"
                  placeholder="description here..."
                  autoSize={{
                    minRows: 6,
                  }}
                ></Input.TextArea>
              </Row>
              <br />
              <SubmitButton>{id ? 'save' : 'add'}</SubmitButton>
            </Form>
          );
        }}
      </Formik>
    </Layout>
  );
}

export default Forms;
