import React from "react";
import styled from "styled-components";
import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";
import { SubTitle1, SubTitle2 } from "../../mixin";
import { Order } from "../../mockup/orderList";

const List = styled.ul`
  li {
    display: grid;
    grid-template-columns: 1fr 2fr 5fr;
    margin-bottom: 0.8rem;

    h3 {
      ${SubTitle2}
    }
    span {
      ${SubTitle1}
      button {
        padding: 0.8rem 3rem;
        margin-right: 0.5rem;
      }
    }
  }
`;

const OrderButton = styled(ButtonDefaultStyle)<IOrderState>`
  background-color: ${(props) =>
    props.state === "order" && props.theme.color.secondary400};
`;
const CompleteButton = styled(ButtonDefaultStyle)<IOrderState>`
  background-color: ${(props) =>
    props.state === "complete" && props.theme.color.primary700};
`;
const CancelButton = styled(ButtonDefaultStyle)<IOrderState>`
  background-color: ${(props) =>
    props.state === "cancel" && props.theme.color.error500};
`;

interface IOrderProps {
  orders: Order[];
}

interface IOrderState {
  state: Order["state"];
}

const OrderStateList = ({ orders }: IOrderProps) => {
  return (
    <List>
      <li>
        <h3>주문 번호</h3>
        <h3>주문한 상품</h3>
        <h3>현황</h3>
      </li>
      {orders.map((order) => (
        <li key={order.id} data-id={order.id}>
          <span>{order.orderNumber}</span>
          <span>{order.productName}</span>
          {order.state === "order" && (
            <span>
              <CancelButton state={order.state}>취소</CancelButton>
              <OrderButton state={order.state}>주문</OrderButton>
              <CompleteButton state={order.state}>완료</CompleteButton>
            </span>
          )}
          {order.state === "complete" && (
            <span>
              <CompleteButton state={order.state}>완료</CompleteButton>
            </span>
          )}
          {order.state === "cancel" && (
            <span>
              <CancelButton state={order.state}>취소</CancelButton>
            </span>
          )}
        </li>
      ))}
    </List>
  );
};

export default OrderStateList;
