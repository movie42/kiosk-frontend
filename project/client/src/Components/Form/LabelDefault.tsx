import React from "react";
import styled from "styled-components";

const LabelContainer = styled.div`
  margin-top: 0.6rem;
  align-self: baseline;
  label {
    font-size: 1.2rem;
    text-align: left;
    font-weight: 500;
  }
`;

interface ILabelProps
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  text: string | null | undefined;
}

const Label = ({ text, ...props }: ILabelProps) => {
  return (
    <LabelContainer>
      <label {...props}>{text}</label>
    </LabelContainer>
  );
};

export default Label;
