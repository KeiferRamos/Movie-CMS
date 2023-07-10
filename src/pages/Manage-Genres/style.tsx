import { Button } from 'antd';
import styled from 'styled-components';
import { Col } from 'antd';
import { Input } from 'formik-antd';

export const StyledGenre = styled.div`
  width: 100%;
  position: relative;
  margin: 10px 0;
  height: 300px;

  .info,
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .buttons {
    position: absolute;
    right: 5px;
    top: 5px;
    z-index: 2;
    display: flex;
    gap: 5px;

    a,
    button {
      height: 35px;
      background-color: #fff;
      line-height: 35px;
      border: none;
      border-radius: 2px;
      text-decoration: none;
      color: inherit;
      font-size: 15px;
      padding: 0 20px;

      svg {
        margin-right: 5px;
      }
    }
  }

  .info {
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: 2rem;
    color: #bebebe;
    background: rgba(0, 0, 0, 0.7);
    transition: all 0.7s;

    &:hover {
      background: rgba(0, 0, 0, 0.4);
    }

    h2 {
      color: #fff;
      text-transform: capitalize;
    }
  }

  img {
    object-fit: cover;
  }
`;

export const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #706f6f;
  width: 100%;
  height: 50px;
  font-size: 20px;
`;

export const UploadContainer = styled(Col)`
  .image-container {
    height: 350px;
  }
`;
