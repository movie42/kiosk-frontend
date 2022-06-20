import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Main = styled.main``;
const LandingLayout = () => {
  return (
    <Main>
      <Outlet />
    </Main>
  );
};

export default LandingLayout;
