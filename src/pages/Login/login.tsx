import { useContext } from 'react';
import { Formik, ErrorMessage } from 'formik';
import {
  LoginInitialValues,
  LoginInputType,
  LoginValidationSchema,
} from './constant';
import { Input, SubmitButton } from 'formik-antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { StyledForm } from './styled';
import { StyledErrorMsg } from './styled';
import { GlobalContext } from '../../context/context';
import jwt from 'jwt-decode';
import { SET_USER } from '../../action';
import { createUser } from '../../api/users';

function LoginPage() {
  const { dispatch }: any = useContext(GlobalContext);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const submitForm = async (values: LoginInputType) => {
    try {
      const data = await createUser(values);

      const items = jwt(data.access_token);
      const initialValue = items;
      sessionStorage.setItem('initial_value', JSON.stringify(initialValue));

      dispatch({
        type: SET_USER,
        payload: initialValue,
      });

      sessionStorage.setItem('access_token', data.access_token);

      navigate('/manage-users');
    } catch (error: any) {
      const errorText = error.response?.data?.message;
      if (typeof errorText === 'object') {
        setErrorMsg(errorText[0]);
      } else {
        setErrorMsg(errorText);
      }
    }
  };

  return (
    <Formik
      initialValues={LoginInitialValues}
      validationSchema={LoginValidationSchema}
      onSubmit={submitForm}
    >
      {() => (
        <StyledForm>
          <div>
            <h1>
              MOVIE <span>CMS</span>
            </h1>
            <h2>{errorMsg}</h2>
            <div>
              <Input name="email" placeholder="email" />
              <StyledErrorMsg>
                <ErrorMessage name="email" />
              </StyledErrorMsg>
            </div>
            <div>
              <Input.Password name="password" placeholder="password" />
              <StyledErrorMsg>
                <ErrorMessage name="password" />
              </StyledErrorMsg>
            </div>
            <SubmitButton>Login</SubmitButton>
            <p>
              Dont have an account yet?{' '}
              <span onClick={() => navigate('/register')}>Register</span>
            </p>
          </div>
        </StyledForm>
      )}
    </Formik>
  );
}

export default LoginPage;
