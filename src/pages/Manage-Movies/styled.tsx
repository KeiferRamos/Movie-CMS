import { Checkbox, Col } from 'antd';
import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  .ant-card-cover {
    width: 250px;
    height: 150px;
    display: grid;
    place-items: center;
    background: #edf7fa;
    position: relative;

    .no-image {
      width: 80px;
      height: 80px;
    }

    img {
      width: 250px;
      height: 150px;
      object-fit: cover;
    }
  }

  .ant-card-body {
    padding: 10px;

    .ant-card-meta-title {
      margin-bottom: 0 !important;
    }
  }
`;

export const StyledCheckbox = styled(Checkbox.Group)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, auto));
  gap: 10px;
  width: 100%;
  align-items: center;
  margin-top: 20px;
  text-transform: capitalize;
`;

export const Featured = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
  background: #db4e90;
  color: #fff;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 12px;
`;

export const StyledAddBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  min-height: 250px;
  font-size: 13px;
  width: 250px;
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

export const UploadContainer = styled(Col)`
  .image-container {
    height: 400px;
  }
`;

export const ViewContainer = styled.div`
  header {
    background: #f7f5f5;
    padding: 10px 20px;
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      color: #3796df;
    }

    div {
      display: flex;
      gap: 5px;
      align-items: center;

      span {
        padding: 5px 10px;
        color: #fff;
        text-transform: capitalize;
        background: #e35982;
        font-size: 13px;
        border-radius: 3px;
      }

      .rank {
        width: 30px;
        height: 30px;
        display: grid;
        place-items: center;
        background: #eaac0f;
        color: #fff;
      }
    }
  }

  .image-container {
    display: grid;
    grid-template-columns: 300px 1fr;

    div {
      height: 450px;
      position: relative;
      display: grid;
      background-color: #e35982;
      border: 3px solid #fff;

      .no-image {
        position: absolute;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        width: 80px;
        height: 80px;
      }

      span {
        position: absolute;
        bottom: 0;
        left: 0;
        margin: 10px 20px;
        color: #fff;
        z-index: 2;
      }

      img {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  h2 {
    color: #188fe3;
    margin-top: 10px;
    text-align: center;
  }

  .cast {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, auto));
    gap: 5px;
    margin-top: 10px;

    div {
      background: #f7f5f5;
      padding: 10px;

      span {
        color: #64b3ec;
      }

      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
    }
  }

  .plot {
    margin: 10px 0;
    background: #fbf9f9;
    padding: 10px 20px;
    border-radius: 3px;

    p {
      margin-bottom: 5px;
      font-size: 15px;
      color: #b7b6b6;
    }
  }
`;

export const SimilarContainer = styled.div`
  position: relative;
  height: 300px;

  span {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: end;
    padding: 20px 30px;
    font-size: 20px;
    color: #fff;
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
  }
`;

export const StyledArrow = styled.div`
  position: absolute;
  top: 140px;
  color: #38e338;
  font-size: 30px;
  z-index: 10;
`;

export const StyledFeatured = styled.span`
  background: #4bed06;
  padding: 5px 10px;
  border-radius: 3px;
  color: #ffffff;
`;
