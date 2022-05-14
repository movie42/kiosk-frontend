import React from "react";
import styled from "styled-components";

const Button: React.FC<IButtonDefaultStyle> = styled.button<IButtonDefaultStyle>`
  cursor: pointer;
  font-size: 2rem;
  border: 0;
  padding: 0.8rem 1.3rem;
  border-radius: 0.3rem;
  color: ${(props) => props.theme.color.fontColorWhite};
  background-color: ${(props) => props.theme.color.gray300};
`;

interface IButtonDefaultStyle
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: JSX.Element | string;
}

const ButtonDefaultStyle: React.FC<IButtonDefaultStyle> = ({
  children,
  ...props
}) => {
  return <Button {...props}>{children}</Button>;
};

export default ButtonDefaultStyle;
