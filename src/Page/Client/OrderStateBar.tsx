import React from "react";
import styled from "styled-components";

const MenuBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 2rem;
  background-color: ${(props) => props.theme.color.backgroundBlack100};
  height: 6rem;

  h2 {
    font-size: 2.2rem;
    font-weight: bold;
    color: ${(props) => props.theme.color.fontColorWhite};
  }

  button {
    cursor: pointer;
    padding: 0.7rem 2rem;
    border: 0;
    font-size: 2.4rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    border-radius: 0.3rem;
    line-height: 2.8rem;
    background-color: ${(props) => props.theme.color.error500};
  }
`;

interface ITotalOrderMenu {
  totalCount: number;
  totalPrice: number;
  label: string;
  goBack?: (value: any) => void;
  handler?: (value: any) => void;
}

const OrderStateBar: React.FC<ITotalOrderMenu> = ({
  totalCount = 0,
  totalPrice = 0,
  label,
  goBack,
  handler,
}) => {
  return (
    <div>
      <MenuBarContainer>
        <h2>
          총 상품 수: {totalCount} 개 &nbsp;&nbsp;&nbsp; 주문 가격:
          {totalPrice} 원
        </h2>
        {goBack && <button onClick={goBack}>돌아가기</button>}
        <button onClick={handler}>{label}</button>
      </MenuBarContainer>
    </div>
  );
};

export default OrderStateBar;
