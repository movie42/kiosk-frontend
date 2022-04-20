import React from "react";
import { RegisterOptions } from "react-hook-form";
import styled from "styled-components";
import Label from "./LabelDefault";

const TextAreaContainer = styled.div`
  margin-bottom: 1.2rem;
  padding: 0.6rem;
  border-bottom: 1px solid ${(props) => props.theme.color.gray200};
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

interface ITextAreaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  register?: any;
  registerOptions?: RegisterOptions;
  error: string;
}

const TextareaDefault = ({
  register,
  registerOptions,
  error,
  ...props
}: ITextAreaProps) => {
  return (
    <TextAreaContainer>
      <textarea
        {...props}
        {...register(props.name, registerOptions)}
      ></textarea>
      {error && <Label text={error} />}
    </TextAreaContainer>
  );
};

export default TextareaDefault;
