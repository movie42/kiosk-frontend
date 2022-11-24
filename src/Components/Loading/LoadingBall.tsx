import React from "react";
import { motion, Variants } from "framer-motion";
import styled from "styled-components";

const LoadingImageContainer = styled(motion.div)<
  Pick<ILoadingBallProps, "color">
>`
  position: relative;
  div {
    background-color: ${(props) =>
      props.color === "black"
        ? props.theme.color.backgroundBlack100
        : props.theme.color.background100};
  }
`;

const LoadingImage = styled(motion.div)`
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.5rem;
`;

const loadingVariants: Variants = {
  init: {
    opacity: 1
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
      delayChildren: 0.5,
      staggerChildren: 0.5
    }
  },
  exit: {
    opacity: 1
  }
};

const loadingImageVariants: Variants = {
  init: {
    opacity: 0
  },
  animate: {
    y: [0, -25],
    opacity: 1,
    transition: {
      y: { yoyo: Infinity, duration: 1, ease: "easeInOut" }
    }
  },
  exit: {
    opacity: 0
  }
};

interface ILoadingBallProps {
  color: "black" | "white";
}

const LoadingBall = ({ color }: ILoadingBallProps) => {
  return (
    <LoadingImageContainer
      variants={loadingVariants}
      initial="init"
      animate="animate"
      exit="exit"
      color={color}
    >
      <LoadingImage variants={loadingImageVariants} />
      <LoadingImage variants={loadingImageVariants} />
      <LoadingImage variants={loadingImageVariants} />
    </LoadingImageContainer>
  );
};

export default LoadingBall;
