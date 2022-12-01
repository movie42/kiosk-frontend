import React from "react";
import { Button } from "./styles";

type BasicSquareButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const BasicSquareButton = ({ ...props }: BasicSquareButtonProps) => {
  return <Button {...props}>{props.children}</Button>;
};

export default BasicSquareButton;
