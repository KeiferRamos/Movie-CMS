import { useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import {
  RegisterInitialValues,
  RegisterInputType,
  RegisterValidationSchema,
  RoleOptions,
} from './constant';
import { message, Row, Col } from 'antd';
import { StyledForm, StyledErrorMsg } from './styled';
import { Input, SubmitButton } from 'formik-antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from '../../components/select';

function RegisterPage() {
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const submitForm = async (values: RegisterInputType) => {
    try {
      const { data } = await axios.post(
        'http://localhost:3001/users/register',
        values,
      );
      message.success(data.message);
      navigate('/login');
    } catch (error: any) {
      const errorText = error.response.data.message;
      if (typeof errorText === 'object') {
        setMsg(errorText[0]);
      } else {
        setMsg(errorText);
      }
    }
  };

  return (
    <Formik
      onSubmit={submitForm}
      initialValues={RegisterInitialValues}
      validationSchema={RegisterValidationSchema}
    >
      {({ values, setFieldValue }) => {
        return (
          <StyledForm style={{ width: 600 }}>
            <h1>
              MOVIE <span>CMS</span>
            </h1>
            <h2>{msg}</h2>
            <Row gutter={10}>
              <Col span={12}>
                <Input.Password
                  name="registrationId"
                  placeholder="Registration ID"
                />
                <StyledErrorMsg>
                  <ErrorMessage name="registrationId" />
                </StyledErrorMsg>
              </Col>
              <Col span={12}>
                <Input name="username" placeholder="username" />
                <StyledErrorMsg>
                  <ErrorMessage name="username" />
                </StyledErrorMsg>
              </Col>
            </Row>
            <Col span={24}>
              <Input name="email" placeholder="email" />
              <StyledErrorMsg>
                <ErrorMessage name="email" />
              </StyledErrorMsg>
            </Col>
            <Row gutter={10}>
              <Col span={12}>
                <Input.Password name="password" placeholder="password" />
                <StyledErrorMsg>
                  <ErrorMessage name="password" />
                </StyledErrorMsg>
              </Col>
              <Col span={12}>
                <Input.Password name="verify" placeholder="verify password" />
                <StyledErrorMsg>
                  <ErrorMessage name="verify" />
                </StyledErrorMsg>
              </Col>
            </Row>
            <Select
              options={RoleOptions}
              onClick={(value) => setFieldValue('role', value)}
              value={values.role}
            />
            {values.role === 'administrator' ? (
              <div>
                <Input.Password
                  name="admin"
                  placeholder="please input admin level pass"
                />
              </div>
            ) : null}
            <SubmitButton style={{ width: 100, marginTop: 10 }}>
              Register
            </SubmitButton>
            <p>
              Already have an account?{' '}
              <span onClick={() => navigate('/login')}>Sign in</span>
            </p>
          </StyledForm>
        );
      }}
    </Formik>
  );
}

export default RegisterPage;
