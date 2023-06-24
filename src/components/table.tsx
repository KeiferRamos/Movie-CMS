import React from 'react';
import styled from 'styled-components';
import { Input, Table } from 'antd';

const StyledTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  margin-bottom: 50px;

  .ant-pagination {
    position: fixed;
    bottom: 0;
    right: 0;
    margin-bottom: 20px;
    margin-right: 20px;
    z-index: -1;
  }
`;

function CustomTable({ onSearch, columns, dataSource }) {
  return (
    <StyledTable>
      <Input.Search
        placeholder="Search Here"
        onSearch={onSearch}
        enterButton
        style={{ width: 350 }}
      />
      <Table columns={columns} dataSource={dataSource} />
    </StyledTable>
  );
}

export default CustomTable;
