import React from "react";
import styled from "styled-components";
import { motion, Variant } from "framer-motion";

const Wrapper = styled(motion.div)`
  position: relative;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 1.5/1;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    object-fit: cover;
    transform: translate(-50%, -50%);
  }
`;

interface IImagesProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  variants?: Variant;
  whileHover?: string;
}

const Images = ({ ...props }: IImagesProps) => {
  return (
    <Wrapper>
      <img {...props} />
    </Wrapper>
  );
};

export default Images;
