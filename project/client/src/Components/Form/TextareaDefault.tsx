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
      ></textarea>
      {error && <Label text={error} />}
    </>
  ) : (
    <>
      <textarea
        {...props}
        {...register(props.name, registerOptions)}
      ></textarea>
      {error && <Label text={error} />}
    </>
  );
};

export default TextareaDefault;
