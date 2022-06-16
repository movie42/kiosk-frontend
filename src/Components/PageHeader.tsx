import React from "react";
import styled from "styled-components";
import { Headline2, SubTitle1 } from "../mixin";

interface IPageMessageHeaderProps {
  header: string;
  message?: string;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  h2 {
    ${Headline2}
  }
  h3 {
    ${SubTitle1}
    font-weight:400;
    margin-left: 2rem;
  }
`;

const PageHeaderMessage = ({ header, message }: IPageMessageHeaderProps) => {
  return (
    <Wrapper>
      <h2>{header}</h2>
      <h3>{message}</h3>
    </Wrapper>
  );
};

export default PageHeaderMessage;
