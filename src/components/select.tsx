import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons';

export const StyledSelect = styled.div`
  position: relative;
  height: 50px;
  width: 100%;
  border: 1px solid #d6d5d5;
  background: #fff;
  border-radius: 5px;
  color: #d1cdcd;
  text-transform: capitalize;
  margin-bottom: 10px;

  .selected {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0 10px;

    svg {
      font-size: 20px;
    }
  }

  .options {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    height: max-content;
    display: grid;
    gap: 5px;
    background: #fff;
    width: 100%;
    padding: 10px 5px;
    border: 1px solid;
    z-index: 1;
    border-radius: 5px;

    span {
      padding: 3px 10px;
      border-radius: 3px;
    }

    span:hover {
      background: #97d0f3;
      color: #fff;
    }
  }
`;

function Select({ options, onClick, value, disabled = false }) {
  const [selected, setSelected] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    setSelected(value);
  }, [value]);

  useEffect(() => {
    const clickEvent = (e) => {
      const selectedItem = document.querySelector('.selected');
      if ((e.target as HTMLElement).contains(selectedItem)) {
        setIsOpen(false);
      } else {
        return;
      }
    };

    window.addEventListener('click', clickEvent);

    return window.removeEventListener('click', clickEvent);
  }, []);

  const openSelect = () => {
    setIsOpen(!isOpen);
  };

  const selectItem = (label) => {
    onClick(label);
    setIsOpen(false);
  };

  return (
    <StyledSelect>
      <div className="selected">
        <span>{selected}</span>
        {disabled ? null : isOpen ? (
          <CaretUpFilled onClick={openSelect} />
        ) : (
          <CaretDownFilled onClick={openSelect} />
        )}
      </div>
      {isOpen ? (
        <div className="options" ref={ref}>
          {options.map((label: string) => {
            return (
              <span key={label} onClick={() => selectItem(label)}>
                {label}
              </span>
            );
          })}
        </div>
      ) : null}
    </StyledSelect>
  );
}

export default Select;
