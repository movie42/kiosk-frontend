import React from "react";

interface ModalModelProps {
  children?: React.ReactNode;
}

const ModalModel = ({ children, ...props }: ModalModelProps) => {
  return <div {...props}>{children}</div>;
};

export default ModalModel;
