import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Nav from "../UI/Molecules/Nav/Nav";
import { GiHamburgerMenu } from "react-icons/gi";
import { AdminHeader, Main, OpenNavButton, Wrapper } from "./styles";

const AdminLayout = () => {
  const [isMenu, setIsMenu] = useState(false);

  useEffect(() => {
    return () => setIsMenu(false);
  }, []);

  return (
    <Wrapper>
      <AdminHeader>
        <h1>누구나 키오스크</h1>
        <OpenNavButton
          ReactIcon={GiHamburgerMenu}
          hidden={true}
          onClick={() => setIsMenu(true)}
          text="메뉴 열기"
        />
        {isMenu && <Nav setNavState={setIsMenu} />}
      </AdminHeader>
      <Main>
        <Outlet />
      </Main>
    </Wrapper>
  );
};

export default AdminLayout;
