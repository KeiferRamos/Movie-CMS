import React from 'react';
import { Col } from 'antd';
import { ErrorMessage } from 'formik';
import { Input } from 'formik-antd';
import { styled } from 'styled-components';

export const StyledInput = styled(Col)`
  position: relative;
  margin-bottom: 5px;

  ::-webkit-input-placeholder {
    text-transform: capitalize;
  }

  input {
    height: 50px;
    padding: 11px;
  }

  label {
    font-size: 16px;
    display: block;
    margin: 0 0 5px 5px;
    text-transform: capitalize;
    color: #4086e7;
  }

  p {
    color: #e91d1d;
    text-transform: capitalize;
    font-size: 13px;
    margin-left: 5px;
  }
`;

type InputType = {
  name: string;
  span: number;
  placeholder?: string;
};

function CustomInput({ name, placeholder = '', span }: InputType) {
  return (
    <StyledInput span={span}>
      <label htmlFor={name}>{placeholder}</label>
      <Input size="large" name={name} placeholder={placeholder} />
      <p>
        <ErrorMessage name={name} />
      </p>
    </StyledInput>
  );
}

export default CustomInput;
