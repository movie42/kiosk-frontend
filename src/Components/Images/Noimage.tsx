import React from "react";
import styled from "styled-components";
import noImage from "./noimage.png";

const ImageWrapper = styled.div`
  overflow: hidden;
  img {
    width: 100%;
    object-fit: cover;
  }
`;

const Noimage = () => {
  return (
    <ImageWrapper>
      <img src={noImage} alt="음식 사진을 등록해주세요." />
    </ImageWrapper>
  );
};

export default Noimage;
