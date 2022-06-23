import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
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

const AdminManageProductLayout = () => {
  const { storeId, userId } = useParams();
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
            <li>
              <Link to={`/admin/${userId}/store/list`}>가게목록</Link>
            </li>
            <li>
              <Link to="main">관리자 메뉴</Link>
            </li>
            <li>
              <Link to="manage-product">상품관리</Link>
            </li>
            <li>
              <Link to="manage-order">주문관리</Link>
            </li>
            <li>
              <Link to="/logout">로그아웃</Link>
            </li>
          </Nav>
        )}
      </Header>
      <Main>
        <Outlet />
      </Main>
    </Wrapper>
  );
};

export default AdminManageProductLayout;
