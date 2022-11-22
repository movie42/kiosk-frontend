import React from "react";

type ILabelProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

const LabelDefault = ({ ...props }: ILabelProps) => {
  return <label {...props}>{props.children}</label>;
};

export default LabelDefault;
