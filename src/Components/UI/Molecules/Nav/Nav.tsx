import React, { ReactNode, useEffect } from "react";
import styled, { css } from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { Headline2 } from "@/lib/styles/mixin";
import { IconButton } from "../../Atoms";
import { Link, useLocation, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "@/lib/state";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const TransparentsBackground = styled.span`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.color.backgroundBlack80};
`;

const CloseIcon = styled(IconButton)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 10;
  svg {
    font-size: 3rem;
    font-weight: bold;
  }
`;

const LinkContainer = styled.nav`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 40vw;
  min-width: 20rem;
  max-width: 35rem;
  z-index: 100;
  padding: 0.8rem;
  background-color: ${(props) => props.theme.color.background100};
  ul {
    padding-left: 2rem;
    li {
      a {
        ${Headline2}
        font-weight: 500;
        text-decoration: unset;
        color: ${(props) => props.theme.color.fontColorBlack};
        &:hover {
          color: ${(props) => props.theme.color.primary700};
        }
      }
    }
  }
  ${({ theme }) => theme.device.tablet} {
    width: 70vw;
    min-width: unset;
    max-width: unset;
  }
  ${({ theme }) => theme.device.mobile} {
    width: 100vw;
    min-width: unset;
    max-width: unset;
  }
`;

interface INavProps {
  setNavState: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav = ({ setNavState }: INavProps) => {
  const { userId, storeId } = useParams();
  const { isLogin } = useRecoilValue(userState);

  useEffect(() => {
    return () => setNavState(false);
  }, [setNavState]);

  return (
    <Wrapper>
      <LinkContainer>
        <CloseIcon
          text="메뉴 닫기"
          hidden={true}
          ReactIcon={AiOutlineClose}
          onClick={() => setNavState(false)}
        />
        <ul onClick={() => setNavState(false)}>
          <LinkItem
            to={`/admin/${userId}/store/list`}
            name="가게목록"
            disabled={!!userId}
          />
          <LinkItem
            to={`/admin/${userId}/store/${storeId}/product/main`}
            name="관리자 메뉴"
            disabled={!!userId && !!storeId}
          />
          <LinkItem
            to={`/admin/${userId}/store/${storeId}/product/manage-product`}
            name="상품관리"
            disabled={!!userId && !!storeId}
          />
          <LinkItem
            to={`/admin/${userId}/store/${storeId}/manage-order`}
            name="주문관리"
            disabled={!!userId && !!storeId}
          />
          <LinkItem disabled={isLogin} to="/logout" name="로그아웃" />
        </ul>
      </LinkContainer>
      <TransparentsBackground />
    </Wrapper>
  );
};

export default Nav;

interface LinkItemProps {
  to: string;
  disabled: boolean;
  name: ReactNode;
}

const LinkItem = ({ to, disabled, name }: LinkItemProps) => {
  const { pathname } = useLocation();

  return disabled ? (
    <Item isActive={pathname === to}>
      <Link to={to}>{name}</Link>
    </Item>
  ) : null;
};

const Item = styled.li<{ isActive: boolean }>`
  ${({ isActive, theme }) => {
    if (isActive) {
      return css`
        a {
          color: ${theme.color.primary700} !important;
        }
      `;
    }
  }}
`;
