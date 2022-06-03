import React from "react";

interface ILabelProps
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {}

const LabelDefault = ({ ...props }: ILabelProps) => {
  return <label {...props}>{props.children}</label>;
};

export default LabelDefault;
