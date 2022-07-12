import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import Nav from "../Components/Nav/Nav";
import { Headline1 } from "../mixin";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";

const Wrapper = styled.div`
  padding: 1rem 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  h1 {
    ${Headline1}
    line-height: 1;
    ${({ theme }) => theme.device.mobile} {
      font-size: 4.2rem;
    }
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
  const user = useRecoilValue(userState);
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
              {user.isLogin && (
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
