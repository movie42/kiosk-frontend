import React from "react";
import styled from "styled-components";

const Toggle = styled.div<IToggleButtonProps>`
  position: relative;
  z-index: 10;
  width: ${(props) => `calc(${props.size}rem * 0.9)`};
  height: ${(props) => `calc(${props.size}rem * 0.5)`};
  cursor: pointer;
  background-color: ${(props) =>
    props.isActive ? props.theme.color.primary600 : props.theme.color.error500};
  border: 0;
  border-radius: ${(props) => `${props.size}rem`};
  padding: ${(props) =>
    `calc(${props.size}rem * 0.05) calc(${props.size}rem * 0.1)`};
  box-shadow: inset 0.1rem 0.15rem 0.2rem
    ${(props) =>
      props.isActive
        ? props.theme.color.primary800
        : props.theme.color.error800};
  &::before {
    position: absolute;
    z-index: 10;
    top: 50%;
    left: ${(props) => (props.isActive ? "unset" : "0.2rem")};
    right: ${(props) => (props.isActive ? "0.2rem" : "unset")};
    transform: translateY(-50%);
    width: ${(props) => `calc(${props.size}rem * 0.5)`};
    height: ${(props) => `calc(${props.size}rem * 0.5)`};
    margin: 0 ${(props) => `calc(${props.size}rem * 0.05)`};
    border-radius: 100%;
    background-color: ${(props) => props.theme.color.background100};
    content: "";
  }
`;

interface IToggleButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  size: number;
}

const ToggleButton = ({ isActive, size, ...props }: IToggleButtonProps) => {
  return <Toggle size={size} isActive={isActive} {...props} />;
};

export default ToggleButton;
