import React, { useEffect, useState } from 'react';
import Layout from '../../layout/main';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { initialValues } from './constant';
import { Form, SubmitButton } from 'formik-antd';
import { Card, Col, Row, message } from 'antd';
import Upload from '../../components/upload';
import CustomInput from '../../components/input';
import { StyledAddBodyBtn, StyledImageContainer } from './styled';
import Richtext from '../../components/richtext';
import Modal from '../../components/modal';
import ImageIcon from '../../global/images/image.png';

import { UpdateBlog, createBlog, getBlogById } from '../../api/blogs';

function Forms() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(initialValues);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getBlogById(id).then((res) => {
        setData(res);
      });
    }
  }, []);

  const submitForm = (values) => {
    if (id) {
      UpdateBlog(values, id).then(() => {
        navigate('/manage-blogs');
        message.success('item updated successfully');
      });
    } else {
      createBlog(values).then(() => {
        navigate('/manage-blogs');
        message.success('item created successfully');
      });
    }
  };

  return (
    <Layout
      isSpinning={id ? !data.title : false}
      routes={[
        { title: <Link to="/manage-blogs">Manage Blogs</Link> },
        { title: id ? `Editing ${data.title}` : 'add' },
      ]}
    >
      <Formik initialValues={data} onSubmit={submitForm}>
        {({ values, setFieldValue, dirty, isValid }) => {
          const addContent = (type) => {
            setFieldValue('contents', [
              ...values.contents,
              {
                value: '',
                htmlElement: type,
              },
            ]);
            setShow(false);
          };

          return (
            <Form>
              <Modal closeModal={() => setShow(false)} show={show}>
                <Row gutter={20}>
                  <Col onClick={() => addContent('richtext')}>
                    <h3 style={{ textAlign: 'center' }}>RICHTEXT</h3>
                    <Card
                      style={{ width: 180, height: 180, marginTop: 10 }}
                      loading={true}
                    ></Card>
                  </Col>
                  <Col onClick={() => addContent('bannerImage')}>
                    <h3 style={{ textAlign: 'center' }}>IMAGE</h3>
                    <StyledImageContainer>
                      <img src={ImageIcon} alt="" />
                    </StyledImageContainer>
                  </Col>
                </Row>
              </Modal>
              <Row>
                <Upload
                  style={{ height: '500px' }}
                  value={values.bannerImage}
                  onchange={(value) => setFieldValue('bannerImage', value)}
                />
              </Row>
              <br />
              <Row gutter={20}>
                <CustomInput span={12} name="title" placeholder="Title" />
                <CustomInput span={12} name="author" placeholder="Author" />
              </Row>
              <br />
              <Row>
                {values.contents.map(({ htmlElement, value, _id }, i) => {
                  if (htmlElement === 'richtext') {
                    return (
                      <Richtext
                        key={_id}
                        data={value}
                        onchange={(value) =>
                          setFieldValue(`contents[${i}].value`, value)
                        }
                      />
                    );
                  } else {
                    return (
                      <Upload
                        key={_id}
                        style={{ height: '400px', marginBottom: 20 }}
                        value={value}
                        onchange={(value) =>
                          setFieldValue(`contents[${i}].value`, value)
                        }
                      />
                    );
                  }
                })}
              </Row>
              <br />
              <Row>
                <StyledAddBodyBtn onClick={() => setShow(true)}>
                  Add body +
                </StyledAddBodyBtn>
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
