import React from "react";
import { RegisterOptions } from "react-hook-form";
import Label from "./LabelDefault";

interface ITextAreaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  register?: any;
  registerOptions?: RegisterOptions;
  fieldName?: string;
  error?: string;
}

const TextareaDefault = ({
  register,
  registerOptions,
  error,
  fieldName,
  ...props
}: ITextAreaProps) => {
  return fieldName ? (
    <>
      <textarea
        {...props}
        {...register(`${fieldName}.${props.name}`, registerOptions)}
      >
        {props.children}
      </textarea>
      {error && <Label>{error}</Label>}
    </>
  ) : (
    <>
      <textarea {...props} {...register(props.name, registerOptions)}>
        {props.children}
      </textarea>
      {error && <Label>{error}</Label>}
    </>
  );
};

export default TextareaDefault;
