import React from "react";
import styled from "styled-components";

const ErrorMessageContainer = styled.div`
  margin-top: 0.6rem;
  align-self: baseline;
  label {
    font-size: 1.2rem;
    text-align: left;
    color: ${(props) => props.theme["warning-dark"]};
    font-weight: 500;
  }
`;

interface IErrorMessageProps {
  label?: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;
  error: string | null | undefined;
}

const ErrorMessage = ({ label, error }: IErrorMessageProps) => {
  return (
    <ErrorMessageContainer>
      <label {...label}>{error}</label>
    </ErrorMessageContainer>
  );
};

export default ErrorMessage;
