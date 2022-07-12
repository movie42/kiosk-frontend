import React from "react";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { userState } from "../state/userState";
import { Headline1 } from "../mixin";

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
  button {
    cursor: pointer;
    padding: 0.5rem 2rem;
    border: 0;
    font-size: 2.8rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    border-radius: 0.3rem;
    background-color: ${(props) => props.theme.color.gray300};
  }
`;

const Main = styled.main``;

const OrderLayout = () => {
  const [user, setUser] = useRecoilState(userState);
  return (
    <Wrapper>
      <Header>
        <h1>누구나 키오스크</h1>
        {/* {user.login && (
          <button
            onClick={() => setUser({ login: false, name: "", storeName: "" })}
          >
            로그아웃
          </button>
        )} */}
      </Header>
      <Main>
        <Outlet />
      </Main>
    </Wrapper>
  );
};

export default OrderLayout;
