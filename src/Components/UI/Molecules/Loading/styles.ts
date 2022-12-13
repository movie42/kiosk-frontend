import styled from "styled-components";
import { Headline1, SubTitle2 } from "@/lib/styles/mixin";
import { motion, Variants } from "framer-motion";

export const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const TransparentBackground = styled(motion.div)`
  position: absolute;
  z-index: -1;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.backgroundBlack80};
  overflow: hidden;
`;

export const FontContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled(motion.h1)`
  ${Headline1};
  color: ${(props) => props.theme.color.fontColorWhite};
`;

export const SubTitle = styled(motion.p)`
  ${SubTitle2};
  color: ${(props) => props.theme.color.fontColorWhite};
`;

export const loadingBackgroundVariants: Variants = {
  init: {
    opacity: 1
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      delayChildren: 1,
      staggerChildren: 0.5
    }
  },
  exit: {
    opacity: 1
  }
};
