import { PageHeader } from '@ant-design/pro-layout';
import styled from 'styled-components';

export const StyledPageHeader = styled(PageHeader)`
  margin-bottom: 20px;
  background: rgb(250, 249, 249);
  padding: 10px;

  .ant-page-header {
    margin-bottom: 10px;

    &-heading {
      border: 1px solid rgb(235, 237, 240);
      padding: 10px;
    }
  }
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    font-size: 16px;
  }

  span {
    font-size: 12px;
    color: #828080;
  }
`;

export const Icons = styled.div`
  display: flex;
  gap: 10px;
  color: #3879e2;
  margin-top: 15px;

  span {
    display: flex;
    align-items: center;
    gap: 5px;
    svg {
      font-size: 25px;
    }
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 15px;
  color: #9d9b9b;

  svg {
    font-size: 20px;
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
