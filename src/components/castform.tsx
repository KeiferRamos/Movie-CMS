import styled from 'styled-components';
import Upload from './upload';
import CustomInput from './input';
import { CloseSquareFilled } from '@ant-design/icons';
import AddIcon from '../global/images/plus.png';
import { castInitialValue } from '../pages/Manage-Movies/constant';
import { useState, useEffect } from 'react';

const StyledAdd = styled.div`
  width: 120px;
  background: #f3fafc;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  font-size: 13px;
  border: 3px dashed #bebebe;
  color: #29ace3;

  img {
    width: 40px;
  }
`;

const CastContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CastForm = styled.div`
  background: #f4f3f3;
  width: 120px;
  padding: 5px;
  border-radius: 3px;
  position: relative;

  .image-container {
    height: 70px;
  }

  span {
    font-size: 25px;
    position: absolute;
    top: -10px;
    right: -10px;
    color: #ef8686;
    z-index: 1;
  }

  label {
    font-size: 11px;
    display: none;
  }

  input[type='text'] {
    height: 30px;
    border-radius: 3px;
    font-size: 10px;
  }
`;

function Cast({ setFieldValue, cast }) {
  const [castList, setCastlist] = useState([]);

  useEffect(() => {
    setCastlist(cast);
  }, [cast]);

  return (
    <CastContainer>
      <StyledAdd
        onClick={() => {
          setFieldValue('cast', [...castList, castInitialValue]);
        }}
      >
        <img src={AddIcon} alt="" />
        <p>Add Cast</p>
      </StyledAdd>
      {castList.map((item, i) => {
        return (
          <CastForm key={i}>
            <CloseSquareFilled
              onClick={() =>
                setFieldValue(
                  'cast',
                  castList.filter((el, index) => index !== i),
                )
              }
            />
            <Upload
              value={item.image}
              onchange={(value) => setFieldValue(`cast[${i}].image`, value)}
            />
            <CustomInput
              placeholder="Cast Name"
              name={`cast[${i}].name`}
              span={24}
            />
            <CustomInput
              placeholder="Role Name"
              name={`cast[${i}].asCharacter`}
              span={24}
            />
          </CastForm>
        );
      })}
    </CastContainer>
  );
}

export default Cast;
