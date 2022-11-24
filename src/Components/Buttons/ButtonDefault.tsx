import React from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import styled from "styled-components";

const Button = styled(motion.button)`
  cursor: pointer;
  font-size: 2.5rem;
  border: 0;
  padding: 0.8rem 1.3rem;
  border-radius: 0.3rem;
  color: ${(props) => props.theme.color.fontColorWhite};
  background-color: ${(props) => props.theme.color.gray300};
`;

type IButtonDefault = HTMLMotionProps<"button">;

const ButtonDefault: React.FC<IButtonDefault> = ({ ...props }) => {
  return <Button {...props}>{props.children}</Button>;
};

export default ButtonDefault;
