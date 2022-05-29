import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";
import { Order, OrderList, OrderState } from "../../mockup/orderList";
import { orderState } from "../../state/orderState";
import { calculatePrice } from "../../utils/helper/calculatePrice";

const OrderItemContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  li {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    &.order-state-button-container {
      display: flex;
      button {
        padding: 0.2rem 1rem;
        font-size: 1.2rem;
      }
    }
  }
`;

const CancelButton = styled(ButtonDefaultStyle)<{ state: OrderState }>`
  background-color: ${(props) =>
    props.state === "cancel"
      ? props.theme.color.error600
      : props.theme.color.gray300};
`;
const OrderButton = styled(ButtonDefaultStyle)<{ state: OrderState }>`
  background-color: ${(props) =>
    props.state === "order"
      ? props.theme.color.secondary500
      : props.theme.color.gray300};
`;
const CompleteButton = styled(ButtonDefaultStyle)<{ state: OrderState }>`
  background-color: ${(props) =>
    props.state === "complete"
      ? props.theme.color.primary500
      : props.theme.color.gray300};
`;

interface IOrderItemProp {
  orderId: Order["id"];
  orders: OrderList[];
}

const OrderItem = ({ orderId, orders }: IOrderItemProp): JSX.Element => {
  const setOrderList = useSetRecoilState(orderState);

  const handleOrderState = (selectedOrder: OrderList, newState: OrderState) => {
    setOrderList((pre) =>
      pre.map((item) => {
        if (item.id === orderId) {
          const newOrders = item.orders.map((order) => {
            if (
              order.optionID === selectedOrder.optionID &&
              order.productId === selectedOrder.productId
            ) {
              return { ...order, state: newState };
            }
            return order;
          });

          return { ...item, orders: newOrders };
        }
        return item;
      }),
    );
  };

  return (
    <OrderItemContainer>
      {orders.map((order, index) => (
        <>
          <li>{order.productName}</li>
          <li>{order.optionID}</li>
          <li>{order.quantity}</li>
          <li>
            {order.state === "cancel"
              ? 0
              : calculatePrice(order.price, order.quantity)}
          </li>
          <li className="order-state-button-container">
            <CancelButton
              onClick={() => handleOrderState(order, OrderState.CANCEL)}
              state={order.state}
            >
              취소
            </CancelButton>
            <OrderButton
              onClick={() => handleOrderState(order, OrderState.ORDER)}
              state={order.state}
            >
              접수
            </OrderButton>
            <CompleteButton
              onClick={() => handleOrderState(order, OrderState.COMPLETE)}
              state={order.state}
            >
              완료
            </CompleteButton>
          </li>
        </>
      ))}
    </OrderItemContainer>
  );
};

export default OrderItem;
