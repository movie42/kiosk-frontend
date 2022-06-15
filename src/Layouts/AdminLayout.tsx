import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import Nav from "../Components/Nav/Nav";
import { Headline1 } from "../mixin";
import { GiHamburgerMenu } from "react-icons/gi";

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
`;

const MenuIconContainer = styled.div`
  font-size: 2.8rem;
  svg {
    cursor: pointer;
  }
`;
const Link = styled(NavLink)``;

const Main = styled.main``;

const AdminLayout = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isMenu, setIsMenu] = useState(false);

  useEffect(() => {
    return () => setIsMenu(false);
  }, []);

  return (
    <Wrapper>
      <Header>
        <h1>누구나 키오스크</h1>
        <MenuIconContainer>
          <GiHamburgerMenu onClick={() => setIsMenu(true)} />
        </MenuIconContainer>
        {isMenu && (
          <Nav setNavState={setIsMenu}>
            <>
              <li>
                <Link to="/admin/login">로그인</Link>
              </li>
              {isLogin && (
                <>
                  <li>
                    <Link to=":id/store/list">가게목록</Link>
                  </li>
                  <li>
                    <Link to="/logout">로그아웃</Link>
                  </li>
                </>
              )}
            </>
          </Nav>
        )}
      </Header>
      <Main>
        <Outlet />
      </Main>
    </Wrapper>
  );
};

export default AdminLayout;
