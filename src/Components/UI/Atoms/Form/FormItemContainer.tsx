import React, { ReactNode } from "react";
import styled from "styled-components";

type FormItemContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

const FormItemContainer = ({ children, ...props }: FormItemContainerProps) => {
  return <FieldContainer {...props}>{children}</FieldContainer>;
};

export default FormItemContainer;

const FieldContainer = styled.div`
  box-sizing: border-box;
  display: grid;
  margin-bottom: 0.7rem;
  grid-template-columns: 2.5fr 8fr;
  border-bottom: 1px solid ${(props) => props.theme.color.gray400};
  label,
  input,
  textarea {
    margin: 0;
    padding: 0;
    font-size: 1.8rem;
    border: 0;
    outline: unset;
  }
  label {
    padding: 1rem;
  }
  input {
    width: 100%;
    padding: 1rem;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  textarea {
    width: 100%;
    height: 9rem;
    resize: none;
  }
`;
