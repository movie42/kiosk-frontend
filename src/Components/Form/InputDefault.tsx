import React from "react";
import {
  FieldError,
  FieldValues,
  RegisterOptions,
  useForm,
  UseFormRegister
} from "react-hook-form";
import Label from "./LabelDefault";

interface IInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register?: any;
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
  if (!register) {
    return (
      <>
        <input {...props} />
        {error && <Label className="error-label">{error}</Label>}
      </>
    );
  }

  if (!fieldName) {
    return (
      <>
        <input {...props} />
        {error && <Label className="error-label">{error}</Label>}
      </>
    );
  }

  return (
    <>
      <input
        {...props}
        {...register(`${fieldName}.${props.name}`, registerOptions)}
      />
      {error && <Label className="error-label">{error}</Label>}
    </>
  );
};

export default InputDefault;
