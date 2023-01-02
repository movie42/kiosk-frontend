import React, { ReactNode } from "react";

type FieldSetProps = React.FieldsetHTMLAttributes<HTMLFieldSetElement> & {
  children: ReactNode;
};

const FieldSet = ({ children, ...props }: FieldSetProps) => {
  return <fieldset {...props}>{children}</fieldset>;
};

export default FieldSet;
