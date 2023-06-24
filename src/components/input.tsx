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
};

function CustomInput({ name, span }: InputType) {
  let tag = name.replace(/\s/g, '');
  const address = ['blockNumber', 'City', 'Province', 'Street', 'Barangay'];

  if (name.includes('Name')) {
    tag = `fullName.${tag}`;
  } else if (address.includes(tag)) {
    tag = `address.${tag}`;
  }

  return (
    <StyledInput span={span}>
      <label htmlFor={tag}>{name}</label>
      <Input size="large" name={tag} placeholder={`${name} here`} />
      <p>
        <ErrorMessage name={tag} />
      </p>
    </StyledInput>
  );
}

export default CustomInput;
