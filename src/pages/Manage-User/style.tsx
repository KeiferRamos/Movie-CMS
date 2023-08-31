import { Select } from 'antd';
import styled from 'styled-components';

export const StyledActions = styled.div`
  display: flex;
  gap: 10px;

  svg {
    font-size: 18px;
  }
`;

export const ActionBtn = styled.div`
  border: 1px solid #bebebe;
  background: #fff;
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
  justify-content: center;

  svg {
    font-size: 16px;
  }
`;

export const StyledSelect = styled.div`
  h3 {
    font-size: 16px;
    display: block;
    margin: 0 0 5px 5px;
    text-transform: capitalize;
    color: #4086e7;
    font-weight: 400;
  }

  .ant-select-selection-overflow {
    padding: 5px;
  }

  .ant-select-selection-item {
    background: #116c90;
    color: #fff;
    padding: 5px 10px;
    height: max-content;

    svg {
      color: #46aff1;
    }
  }
`;

export const Profile = styled.div`
  display: grid;
  place-items: center;
  border-radius: 10px;
  padding: 30px;
  gap: 10px;
  border: 3px solid #bebebe;

  div {
    width: 100%;
    margin: 2em 0;
  }

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
  }
`;
