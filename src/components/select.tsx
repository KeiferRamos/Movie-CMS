import React, { useEffect, useRef, useState, ReactNode } from 'react';
import styled from 'styled-components';
import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons';
import { StyledInput } from './input';
import { CloseSquareFilled } from '@ant-design/icons';
import OutsideAlerter from '../hooks/useClickDetector';

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

    .selected-list {
      background: #168ee9;
      padding: 10px;
      color: #b7caf2;
      border-radius: 3px;
      margin-right: 3px;
      display: flex;
      gap: 5px;

      p {
        display: inline;
        color: #97d0f3;
      }
    }

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
    z-index: 2;
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

function Select({
  options,
  onClick,
  value,
  disabled = false,
  labelText = '',
  removeItem = null,
}) {
  const item = options.filter(({ value: selectedItem }) => {
    if (typeof value !== 'object') {
      return value === selectedItem;
    } else {
      return value.find(({ title }) => title === selectedItem.title);
    }
  });

  const [selected, setSelected] = useState(item);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelected(item);
  }, [value]);

  const openSelect = () => {
    setIsOpen(!isOpen);
  };

  const selectItem = (item) => {
    onClick(item);
    setIsOpen(false);
  };

  return (
    <StyledInput>
      <label>{labelText}</label>
      <OutsideAlerter onclick={() => setIsOpen(false)}>
        <StyledSelect>
          <div className="selected">
            {typeof value !== 'object' ? (
              <span>
                {selected[0]?.label
                  ? selected[0].label
                  : `Please select ${labelText}`}
              </span>
            ) : (
              <div style={{ display: 'flex' }}>
                {selected.map((item, i) => {
                  return (
                    <span className="selected-list" key={i}>
                      <p>{item.label}</p>
                      <CloseSquareFilled
                        onClick={() => removeItem(item.value)}
                      />
                    </span>
                  );
                })}
              </div>
            )}
            {disabled ? null : isOpen ? (
              <CaretUpFilled onClick={openSelect} />
            ) : (
              <CaretDownFilled onClick={openSelect} />
            )}
          </div>
          {isOpen ? (
            <div className="options">
              {options.map((option) => {
                return (
                  <span
                    key={option.label}
                    onClick={() => selectItem(option.value)}
                  >
                    {option.label}
                  </span>
                );
              })}
            </div>
          ) : null}
        </StyledSelect>
      </OutsideAlerter>
    </StyledInput>
  );
}

export default Select;
