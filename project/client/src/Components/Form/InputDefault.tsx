import React from "react";
import { RegisterOptions, useForm, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import ErrorMessage from "./ErrorMessage";

const InputContainer = styled.div`
  margin-bottom: 1.2rem;
  padding: 0.6rem;
  border-bottom: 1px solid ${(props) => props.theme.netural};
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

interface IInputProps {
  label: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;
  labelText: string;
  input: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  register?: any;
  registerOptions?: RegisterOptions;
  error: string | undefined | null;
}

const AdminInput = ({
  label,
  labelText,
  input,
  register,
  registerOptions,
  error,
}: IInputProps) => {
  return (
    <div>
      <InputContainer>
        <label {...label}>{labelText}</label>
        <input {...input} {...register(input.name, registerOptions)} />
      </InputContainer>
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export default AdminInput;
