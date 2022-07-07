import React from "react";
import styled from "styled-components";
import { Headline1, SubTitle2 } from "../mixin";
import { motion, Variants } from "framer-motion";
import LoadingBall from "./LoadingBall";

const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const TransparentBackground = styled(motion.div)`
  position: absolute;
  z-index: -1;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.backgroundBlack80};
  overflow: hidden;
`;

const FontContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled(motion.h1)`
  ${Headline1};
  color: ${(props) => props.theme.color.fontColorWhite};
`;

const SubTitle = styled(motion.p)`
  ${SubTitle2};
  color: ${(props) => props.theme.color.fontColorWhite};
`;

const loadingBackgroundVariants: Variants = {
  init: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      delayChildren: 1,
      staggerChildren: 0.5,
    },
  },
  exit: {
    opacity: 1,
  },
};

interface ILoadingProps {
  title: string;
  subTitle?: string;
}

const Loading = ({ title, subTitle }: ILoadingProps) => {
  return (
    <Wrapper
      variants={loadingBackgroundVariants}
      initial="init"
      animate="animate"
      exit="exit"
    >
      <FontContainer>
        <LoadingBall color="white" />
        <Title>{title}</Title>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
      </FontContainer>
      <TransparentBackground />
    </Wrapper>
  );
};

export default Loading;
