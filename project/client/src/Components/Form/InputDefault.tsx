import React from "react";
import {
  FieldValues,
  RegisterOptions,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import styled from "styled-components";
import Label from "./LabelDefault";

interface IInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register?: UseFormRegister<FieldValues>;
  registerOptions?: RegisterOptions;
  fieldName?: string;
  error?: string | undefined | null;
}

const InputDefault = ({
  register,
  registerOptions,
  fieldName,
  error,
  ...props
}: IInputProps) => {
  return register ? (
    fieldName ? (
      <>
        <input
          {...props}
          {...register(`${fieldName}.${props.name}`, registerOptions)}
        />
        {error && <Label text={error} />}
      </>
    ) : (
      <>
        <input {...props} {...register(`${props.name}`, registerOptions)} />
        {error && <Label text={error} />}
      </>
    )
  ) : (
    <>
      <input {...props} />
      {error && <Label text={error} />}
    </>
  );
};

export default InputDefault;
