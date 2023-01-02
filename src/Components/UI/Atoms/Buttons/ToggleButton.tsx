import React from "react";
import styled, { css } from "styled-components";

const Toggle = styled.button<IToggleButtonProps>`
  position: relative;
  cursor: pointer;
  z-index: 10;
  border: 0;
  transition: 0.2s ease-in-out;
  ${({ size, isActive, theme }) => {
    return css`
      width: ${`calc(${size}rem * 1)`};
      height: ${`calc(${size}rem * 0.6)`};
      background-color: ${isActive
        ? theme.color.primary600
        : theme.color.error500};
      box-shadow: inset 0.1rem 0.15rem 0.2rem
        ${isActive ? theme.color.primary800 : theme.color.error800};
      border-radius: ${`${size}rem`};
    `;
  }}
  &::before {
    z-index: 10;
    border-radius: 100%;
    content: "";
    position: absolute;
    top: 50%;
    ${({ isActive, size, theme }) => {
      return css`
        left: 0.2rem;
        right: ${isActive ? "0.2rem" : "unset"};

        transform: ${isActive
          ? "translate3d(-5%, -50%, 0)"
          : "translate3d(65%, -50%, 0)"};
        width: ${`calc(${size}rem * 0.5)`};
        height: ${`calc(${size}rem * 0.5)`};
        margin: 0 ${`calc(${size}rem * 0.05)`};
        background-color: ${theme.color.background100};
        transition: 0.2s ease-in-out;
      `;
    }}
  }
`;

interface IToggleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  size: number;
}

const ToggleButton = ({ isActive, size, ...props }: IToggleButtonProps) => {
  return <Toggle size={size} isActive={isActive} {...props} />;
};

export default ToggleButton;
