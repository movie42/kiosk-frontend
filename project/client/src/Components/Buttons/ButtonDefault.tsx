import React from "react";
import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  font-size: 2rem;
  border: 0;
  padding: 0.8rem 1.3rem;
  border-radius: 0.5rem;
  color: ${(props) => props.theme.color.fontColorWhite};
  background-color: ${(props) => props.theme.color.gray300};
`;

interface IButtonDefaultStyle extends React.HTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | string;
}

const ButtonDefaultStyle = ({ children, ...props }: IButtonDefaultStyle) => {
  return <Button {...props}>{children}</Button>;
};

export default ButtonDefaultStyle;
