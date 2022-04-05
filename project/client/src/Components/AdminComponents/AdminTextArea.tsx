import React from "react";
import { RegisterOptions } from "react-hook-form";
import { text } from "stream/consumers";
import styled from "styled-components";
import ErrorMessage from "../ErrorMessage";

const TextAreaContainer = styled.div`
  margin-bottom: 1.2rem;
  padding: 0.6rem;
  border-bottom: 1px solid ${(props) => props.theme.netural};
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  label {
    font-weight: bold;
    width: 30%;
    font-size: 2rem;
  }
  textarea {
    width: 100%;
    font-size: 1.4rem;
    height: 18rem;
    resize: none;
    border: 0;
    outline: unset;
    overflow-x: hidden;
    overflow-y: auto;
  }
`;

interface IAdminTextAreaProps {
  label: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;
  labelText: string;
  textarea: React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >;
  register?: any;
  registerOptions?: RegisterOptions;
  error: string;
}

const AdminTextArea = ({
  label,
  labelText,
  textarea,
  register,
  registerOptions,
  error,
}: IAdminTextAreaProps) => {
  return (
    <TextAreaContainer>
      <label {...label}>{labelText}</label>
      <textarea
        {...textarea}
        {...register(textarea?.name, registerOptions)}
      ></textarea>
      {error && <ErrorMessage error={error} />}
    </TextAreaContainer>
  );
};

export default AdminTextArea;
