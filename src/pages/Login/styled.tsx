import styled from 'styled-components';
import { Form } from 'formik-antd';

export const StyledForm = styled(Form)`
  background-color: #f7f7f6;
  padding: 20px;
  display: grid;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;

  h1 {
    color: #4b4b4a;
    text-align: center;
    margin: 0;

    span {
      color: #b3bb0c;
    }
  }

  p {
    margin-top: 10px;
    span {
      cursor: pointer;
    }
  }

  button {
    width: 100%;
  }

  input {
    height: 40px;
    padding: 24px 11px;
  }

  h2 {
    height: 30px;
    text-transform: uppercase;
    color: #4b4b4a;
    font-size: 11px;
    text-align: center;
  }

  @media (min-width: 500px) {
    width: 350px;
    height: max-content;
    position: fixed;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
  }
`;

export const StyledErrorMsg = styled.p`
  color: red;
  margin: 5px 0 10px 0;
  text-transform: capitalize;
  font-size: 13px;
`;
