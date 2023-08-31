import React from 'react';
import styled from 'styled-components';
import { Input, Table } from 'antd';

const StyledTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  margin-bottom: 50px;

  .model {
    color: #fff;
    padding: 5px 10px;
    border-radius: 3px;
    text-transform: capitalize;
    text-align: center;

    &-genre {
      background: #ed6b92;
    }

    &-movie {
      background: #6bbfed;
    }

    &-blog {
      background: #6bed6d;
    }
  }
`;

function CustomTable({ columns, dataSource }) {
  return (
    <StyledTable>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 9 }}
      />
    </StyledTable>
  );
}

export default CustomTable;
