import { Outlet } from "react-router-dom";
import { ClientMain, Wrapper } from "./styles";

const ClientLayout = () => {
  return (
    <Wrapper>
      <ClientMain>
        <Outlet />
      </ClientMain>
    </Wrapper>
  );
};

export default ClientLayout;
