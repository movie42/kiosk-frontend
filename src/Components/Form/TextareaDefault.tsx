import React from "react";

type ITextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextareaDefault = ({ ...props }: ITextAreaProps) => {
  return <textarea {...props}>{props.children}</textarea>;
};

export default TextareaDefault;
