import React from "react";
import styled from "styled-components";
import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";
import { SubTitle1, SubTitle2 } from "../../mixin";
import { Order, OrderList } from "../../mockup/orderList";
import OrderItem from "./OrderItem";

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

export const OrderButton = styled(ButtonDefaultStyle)<IOrderState>`
  background-color: ${(props) =>
    props.state === "order" && props.theme.color.secondary400};
`;
export const CompleteButton = styled(ButtonDefaultStyle)<IOrderState>`
  background-color: ${(props) =>
    props.state === "complete" && props.theme.color.primary700};
`;
export const CancelButton = styled(ButtonDefaultStyle)<IOrderState>`
  background-color: ${(props) =>
    props.state === "cancel" && props.theme.color.error500};
`;

interface IOrderProps {
  orders: Order[];
}

interface IOrderState {
  state: OrderList["state"];
}

const OrderStateList = ({ orders }: IOrderProps) => {
  const handleCancelStateModal = () => {};
  const handleOrderStateModal = () => {};
  const handleCompleteStateModal = () => {};

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
          <OrderItem
            orderList={order.orderList}
            handleCancelStateModal={handleCancelStateModal}
            handleOrderStateModal={handleOrderStateModal}
            handleCompleteStateModal={handleCompleteStateModal}
          />
        </li>
      ))}
    </List>
  );
};

export default OrderStateList;
