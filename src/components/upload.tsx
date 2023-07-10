import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NoImageIcon from '../global/images/no-picture-taking.png';
import { ErrorMessage } from 'formik';

const StyledUpload = styled.div`
  background: #faf7f7;
  padding: 10px;
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;

  input[type='file']::file-selector-button {
    background: #25a5dd;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    margin-right: 5px;
  }

  .image-container {
    border: 3px dashed #bebebe;
    width: 100%;
    display: grid;
    place-items: center;
    position: relative;

    &-icon {
      width: 60px;
      height: 60px;
    }

    &-profile {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

function Upload({ onchange, value }) {
  const [image, setImage] = useState<any>(value);

  useEffect(() => {
    setImage(value);
  }, [value]);

  function previewFile({ target: { files } }) {
    const file = files[0];

    const getResult = () => {
      onchange(reader.result);
    };

    const reader = new FileReader();
    reader.addEventListener('load', getResult, false);

    if (file) {
      reader.readAsDataURL(file);
    }

    return () => reader.removeEventListener('load', getResult, false);
  }

  return (
    <StyledUpload>
      <div className="image-container">
        {image ? (
          <img className="image-container-profile" src={image} alt="" />
        ) : (
          <img className="image-container-icon" src={NoImageIcon} />
        )}
      </div>
      <input type="file" onChange={(e) => previewFile(e)} />
    </StyledUpload>
  );
}

export default Upload;
