import React, { ReactNode, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useRecoilValue } from "recoil";
import { userState } from "@/lib/state";
import {
  Wrapper,
  TransparentsBackground,
  CloseIcon,
  LinkContainer,
  Item
} from "./styles";

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
