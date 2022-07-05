import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Headline1 } from "../../mixin";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5rem;
  h1 {
    ${Headline1}
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
const Wrapper = styled.div`
  h2 {
    font-size: 2rem;
  }
`;

const OrderingMethod = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 2.5rem;
  grid-template-columns: repeat(2, 20rem);
  justify-items: center;
  justify-content: center;
`;

const MenuButtonDefault = styled.button`
  box-sizing: border-box;
  border: 0;
  border-radius: 0.6rem;
  width: 20rem;
  height: 70vh;
  cursor: pointer;
  background-color: ${(props) => props.theme.color.primary600};
  font-size: 3rem;
  font-weight: bold;
  word-break: keep-all;
  color: ${(props) => props.theme.color.fontColorWhite};
`;

const EatInButton = styled(MenuButtonDefault)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.color.primary800};
`;
const TakeOutButton = styled(MenuButtonDefault)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.color.secondary500};
`;

const ClientMain = () => {
  const navigate = useNavigate();
  const { userId, storeId } = useParams();

  return (
    <>
      <Header>
        <h1>누구나 키오스크</h1>
      </Header>
      <Wrapper>
        <h2>주문 방법을 선택하세요</h2>
        <OrderingMethod>
          <EatInButton
            date-type="eat-in"
            onClick={() => navigate(`/client/${userId}/${storeId}/menu`)}
          >
            매장 식사
          </EatInButton>
          <TakeOutButton
            date-type="take-out"
            onClick={() => navigate(`/client/${userId}/${storeId}/menu`)}
          >
            포장하기
          </TakeOutButton>
        </OrderingMethod>
      </Wrapper>
    </>
  );
};

export default ClientMain;
