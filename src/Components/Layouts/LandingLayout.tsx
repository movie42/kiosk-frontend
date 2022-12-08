import { Outlet } from "react-router-dom";
import { Main } from "./styles";

const LandingLayout = () => {
  return (
    <Main>
      <Outlet />
    </Main>
  );
};

export default LandingLayout;
