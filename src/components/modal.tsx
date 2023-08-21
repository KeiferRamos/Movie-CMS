import { CloseCircleTwoTone } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;

  .content {
    position: relative;
    padding: 10px;

    background: #fff;
    border-radius: 4px;

    svg {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 25px;
    }
  }
`;

function Modal({ children, closeModal, show }) {
  if (show) {
    return (
      <StyledModal>
        <div className="content">
          <CloseCircleTwoTone onClick={closeModal} />
          {children}
        </div>
      </StyledModal>
    );
  }
  return null;
}

export default Modal;
