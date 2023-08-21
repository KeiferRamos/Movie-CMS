import { Card } from 'antd';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, auto));
  gap: 1em;
`;

export const StyledBlog = styled(Card)`
  height: 260px;

  .ant-card-body {
    padding: 10px;

    .ant-card-meta-title {
      margin-bottom: 0 !important;
    }
  }

  img {
    object-fit: cover;
  }
`;

export const StyledAddBodyBtn = styled.span`
  width: 100%;
  padding: 20px 0;
  text-align: center;
  background: transparent;
  border-radius: 4px;
  border: 3px dashed;
  font-size: 20px;
  color: #bebebe;
`;

export const StyledImageContainer = styled.div`
  background: #403f3f;
  border-radius: 10px;
  width: 180px;
  height: 180px;
  display: grid;
  place-items: center;
  margin-top: 10px;

  img {
    width: 150px;
    height: 150px;
  }
`;

export const StyledAddBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 260px;
  font-size: 13px;
  border: 5px dashed #bebebe;
  background: #edf7fa;
  border-radius: 5px;
  color: #18ace6;
  text-transform: uppercase;
  font-weight: bold;

  img {
    width: 50px;
  }
`;
