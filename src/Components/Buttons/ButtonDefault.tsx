import React, { ReactNode } from "react";
import styled from "styled-components";

const Button = styled.button<IButtonDefaultStyle>`
  cursor: pointer;
  font-size: 2.5rem;
  border: 0;
  padding: 0.8rem 1.3rem;
  border-radius: 0.3rem;
  color: ${(props) => props.theme.color.fontColorWhite};
  background-color: ${(props) => props.theme.color.gray300};
`;

interface IButtonDefaultStyle
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const ButtonDefaultStyle: React.FC<IButtonDefaultStyle> = ({
  children,
  ...props
}) => {
  return <Button {...props}>{children}</Button>;
};

export default ButtonDefaultStyle;
