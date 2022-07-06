import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  overflow: hidden;
  img {
    width: 100%;
    object-fit: cover;
  }
`;

interface IImagesProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Images = ({ ...props }: IImagesProps) => {
  return (
    <Wrapper>
      <img {...props} />
    </Wrapper>
  );
};

export default Images;
