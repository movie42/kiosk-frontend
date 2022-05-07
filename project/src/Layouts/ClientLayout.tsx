import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Headline1 } from "../mixin";

const Wrapper = styled.div`
  padding: 1rem 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5rem;
  h1 {
    ${Headline1}
  }
  button {
    cursor: pointer;
    padding: 0.5rem 2rem;
    border: 0;
    font-size: 2.8rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    border-radius: 0.3rem;
    background-color: ${(props) => props.theme.color.gray300};
  }
`;

const Main = styled.main``;

const ClientLayout = () => {
  return (
    <Wrapper>
      <Main>
        <Outlet />
      </Main>
    </Wrapper>
  );
};

export default ClientLayout;
