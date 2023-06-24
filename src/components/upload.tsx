import React, { useState } from 'react';
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
    height: 200px;
    width: 100%;
    display: grid;
    place-items: center;

    &-icon {
      width: 60px;
      height: 60px;
    }

    &-profile {
      width: 100%;
      height: calc(200px - 6px);
      object-fit: cover;
    }
  }
`;

function Upload({ onchange, value }) {
  const [image, setImage] = useState<any>(value);

  function previewFile({ target: { files } }) {
    const file = files[0];

    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        const value = { data: reader.result, name: files[0].name };
        setImage(value);
        onchange(value);
      },
      false,
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return (
    <StyledUpload>
      <div className="image-container">
        {image?.data ? (
          <img className="image-container-profile" src={image.data} alt="" />
        ) : (
          <img className="image-container-icon" src={NoImageIcon} />
        )}
      </div>
      <span>{image.name}</span>
      <input type="file" onChange={(e) => previewFile(e)} />
    </StyledUpload>
  );
}

export default Upload;
