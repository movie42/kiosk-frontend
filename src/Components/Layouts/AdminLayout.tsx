import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Nav from "../UI/Molecules/Nav/Nav";
import { Headline1 } from "../../lib/styles/mixin";
import { GiHamburgerMenu } from "react-icons/gi";
import { IconButton } from "../UI/Atoms";

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

const OpenNavButton = styled(IconButton)`
  svg {
    font-size: 2.8rem;
  }
  &:hover {
    color: ${(props) => props.theme.color.fontColorBlack};
  }
`;

const Main = styled.main``;

const AdminLayout = () => {
  const [isMenu, setIsMenu] = useState(false);

  useEffect(() => {
    return () => setIsMenu(false);
  }, []);

  return (
    <Wrapper>
      <Header>
        <h1>누구나 키오스크</h1>
        <OpenNavButton
          ReactIcon={GiHamburgerMenu}
          hidden={true}
          onClick={() => setIsMenu(true)}
          text="메뉴 열기"
        />
        {isMenu && <Nav setNavState={setIsMenu} />}
      </Header>
      <Main>
        <Outlet />
      </Main>
    </Wrapper>
  );
};

export default AdminLayout;
