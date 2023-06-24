import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik';
import { Row, Col } from 'antd';
import Richtext from '../../components/richtext';
import Select from '../../components/select';
import { ValidationSchema, initialValues } from './constant';
import { Form as CreateForm, SubmitButton } from 'formik-antd';
import UploadImage from '../../components/upload';
import CustomInput, { StyledInput } from '../../components/input';
import axios from 'axios';
import { setConfig } from '../../utils/setConfig';
import { useParams } from 'react-router-dom';
import Layout from '../../layout/main';
import { RoleOptions } from '../Login/constant';

function Form() {
  const { id }: any = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(initialValues);

  const getUser = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/users/${id}`,
      setConfig(),
    );

    return data;
  };

  useEffect(() => {
    getUser().then((data: any) => {
      setUser(Object.assign(initialValues, data));
      setIsLoading(false);
    });
  }, []);

  const submitForm = async (values) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3001/users/${values._id}`,
        values,
        setConfig(),
      );

      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout
      isSpinning={isLoading}
      routes={[
        {
          title: <Link to="/manage-users">Manage User</Link>,
        },
        {
          title: <Link to={`/manage-users/${user._id}`}>{user.username}</Link>,
        },
        {
          title: <p>Edit</p>,
        },
      ]}
    >
      <Formik
        initialValues={user}
        onSubmit={submitForm}
        validationSchema={ValidationSchema}
      >
        {({ setFieldValue, values, dirty, isValid }) => {
          return (
            <CreateForm>
              <Row gutter={20}>
                <Col span={6}>
                  <UploadImage
                    value={values.image}
                    onchange={(value) => setFieldValue('image', value)}
                  ></UploadImage>
                </Col>

                <Col span={18}>
                  <Row gutter={20}>
                    <CustomInput name="username" span={12} />
                    <StyledInput span={12}>
                      <label htmlFor="role">Role</label>
                      <Select
                        options={RoleOptions}
                        disabled={true}
                        onClick={(value) => setFieldValue('role', value)}
                        value={values.role}
                      ></Select>
                    </StyledInput>
                  </Row>
                  <Row gutter={20} style={{ marginBottom: 10 }}>
                    <CustomInput name="email" span={12} />
                    <CustomInput name="contact Number" span={12} />
                  </Row>
                  <Row gutter={20}>
                    <CustomInput span={8} name="first Name" />
                    <CustomInput span={8} name="middle Name" />
                    <CustomInput span={8} name="last Name" />
                  </Row>
                </Col>
              </Row>
              <Row style={{ marginTop: 10 }} gutter={15}>
                <CustomInput name="block Number" span={4} />
                <CustomInput name="Street" span={5} />
                <CustomInput name="Barangay" span={5} />
                <CustomInput name="City" span={5} />
                <CustomInput name="Province" span={5} />
              </Row>
              <Row>
                <Richtext
                  data={values.bio}
                  onchange={(value) => setFieldValue('bio', value)}
                />
              </Row>
              <SubmitButton disabled={!dirty || !isValid}>submit</SubmitButton>
            </CreateForm>
          );
        }}
      </Formik>
    </Layout>
  );
}

export default Form;
