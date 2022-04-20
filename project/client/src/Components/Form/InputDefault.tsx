import React from "react";
import { RegisterOptions, useForm, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import Label from "./LabelDefault";

const InputContainer = styled.div`
  margin-bottom: 1.2rem;
  padding: 0.6rem;
  border-bottom: 1px solid ${(props) => props.theme.color.gray200};
  width: 100%;
  label {
    font-weight: bold;
    width: 30%;
    font-size: 2rem;
  }
  input {
    width: 70%;
    margin-left: 1rem;
    outline: none;
    font-size: 2rem;
    border: 0;
  }
`;

interface IInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register?: any;
  registerOptions?: RegisterOptions;
  error: string | undefined | null;
}

const InputDefault = ({
  register,
  registerOptions,
  error,
  ...props
}: IInputProps) => {
  return (
    <div>
      <InputContainer>
        <input {...props} {...register(props.name, registerOptions)} />
      </InputContainer>
      {error && <Label text={error} />}
    </div>
  );
};

export default InputDefault;
