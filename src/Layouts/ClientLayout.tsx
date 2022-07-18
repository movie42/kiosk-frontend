import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 1rem 2rem;
`;

const Main = styled.main`
  padding-bottom: 6rem;
`;

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
