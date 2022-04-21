import React from "react";

interface ILabelProps
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  text: string | null | undefined;
}

const LabelDefault = ({ text, ...props }: ILabelProps) => {
  return (
    <>
      <label {...props}>{text}</label>
    </>
  );
};

export default LabelDefault;
