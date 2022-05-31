import React from "react";
import {
  FieldValues,
  RegisterOptions,
  useForm,
  UseFormRegister,
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
  return register ? (
    fieldName ? (
      <>
        <input
          {...props}
          {...register(`${fieldName}.${props.name}`, registerOptions)}
        />
        {error && <Label className="error-label">{error}</Label>}
      </>
    ) : (
      <>
        <input {...props} {...register(`${props.name}`, registerOptions)} />
        {error && <Label className="error-label">{error}</Label>}
      </>
    )
  ) : (
    <>
      <input {...props} />
      {error && <Label className="error-label">{error}</Label>}
    </>
  );
};

export default InputDefault;
