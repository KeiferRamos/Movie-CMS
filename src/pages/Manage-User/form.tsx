import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { Row, Col } from 'antd';
import Richtext from '../../components/richtext';
import Select from '../../components/select';
import { ValidationSchema, initialValues } from './constant';
import { Form as CreateForm, SubmitButton } from 'formik-antd';
import UploadImage from '../../components/upload';
import CustomInput from '../../components/input';
import { useParams } from 'react-router-dom';
import Layout from '../../layout/main';
import { RoleOptions } from '../Login/constant';
import { editUser, getUser } from '../../api/users';
import { UploadContainer } from '../Manage-Movies/styled';

function Form() {
  const { id }: any = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(initialValues);

  useEffect(() => {
    getUser(id).then((data: any) => {
      setUser(Object.assign(initialValues, data));
      setIsLoading(false);
    });
  }, []);

  const submitForm = async (values) => {
    try {
      const data = await editUser(values);

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
        id && {
          title: <Link to={`/manage-users/${user._id}`}>{user.username}</Link>,
        },
        {
          title: <p>{id ? 'Edit' : 'Add'}</p>,
        },
      ]}
    >
      <Formik
        initialValues={user}
        onSubmit={submitForm}
        validationSchema={ValidationSchema}
      >
        {({ setFieldValue, values, dirty, isValid }) => {
          console.log(values.image);
          return (
            <CreateForm>
              <Row gutter={20}>
                <UploadContainer span={6}>
                  <UploadImage
                    value={values.image}
                    onchange={(value) => setFieldValue('image', value)}
                  ></UploadImage>
                </UploadContainer>
                <Col span={18}>
                  <Row gutter={20}>
                    <CustomInput
                      name="username"
                      placeholder="Username"
                      span={12}
                    />
                    <Col span={12}>
                      <Select
                        labelText={'Role'}
                        options={RoleOptions}
                        disabled={true}
                        onClick={(value) => setFieldValue('role', value)}
                        value={values.role}
                      ></Select>
                    </Col>
                  </Row>
                  <Row gutter={20} style={{ marginBottom: 10 }}>
                    <CustomInput name="email" placeholder="Email" span={12} />
                    <CustomInput
                      name="contactNumber"
                      placeholder="Contact Number"
                      span={12}
                    />
                  </Row>
                  <Row gutter={20}>
                    <CustomInput
                      span={8}
                      name="fullName.firstName"
                      placeholder="First Name"
                    />
                    <CustomInput
                      span={8}
                      name="fullName.middle Name"
                      placeholder="Middle Name"
                    />
                    <CustomInput
                      span={8}
                      name="fullName.last Name"
                      placeholder="Last Name"
                    />
                  </Row>
                </Col>
              </Row>
              <Row style={{ marginTop: 10 }} gutter={15}>
                <CustomInput
                  name="address.blockNumber"
                  placeholder="Block Number"
                  span={4}
                />
                <CustomInput
                  name="address.Street"
                  placeholder="Street"
                  span={5}
                />
                <CustomInput
                  name="address.Barangay"
                  placeholder="Barangay"
                  span={5}
                />
                <CustomInput name="address.City" placeholder="City" span={5} />
                <CustomInput
                  name="address.Province"
                  placeholder="Province"
                  span={5}
                />
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
