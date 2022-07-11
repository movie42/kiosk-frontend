import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";
import { NewOrder, Order, OrderStatusType } from "../../state/orderState";
import { calculatePrice } from "../../utils/helper/calculatePrice";

const OrderItemContainer = styled.div`
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

const CancelButton = styled(ButtonDefaultStyle)<{ state: OrderStatusType }>`
  background-color: ${(props) =>
    props.state === "CANCELED"
      ? props.theme.color.error600
      : props.theme.color.gray300};
`;
const OrderButton = styled(ButtonDefaultStyle)<{ state: OrderStatusType }>`
  background-color: ${(props) =>
    props.state === "READY"
      ? props.theme.color.secondary500
      : props.theme.color.gray300};
`;
const CompleteButton = styled(ButtonDefaultStyle)<{ state: OrderStatusType }>`
  background-color: ${(props) =>
    props.state === "COMPLETE"
      ? props.theme.color.primary500
      : props.theme.color.gray300};
`;

interface IOrderItemProp {
  orderId: Order["id"];
  order: NewOrder;
}

const OrderItem = ({ orderId, order }: IOrderItemProp): JSX.Element => {
  // const setOrderList = useSetRecoilState(orderState);

  const handleOrderState = (
    selectedOrder: Order,
    newState: OrderStatusType,
  ) => {
    // setOrderList((pre) =>
    //   pre.map((item) => {
    //     if (item.id !== orderId) {
    //       return item;
    //     }
    // const newOrders = item.orders.map((order) => {
    //   if (
    //     order.optionID === selectedOrder.optionID &&
    //     order.productId === selectedOrder.productId
    //   ) {
    //     return { ...order, state: newState };
    //   }
    //   return order;
    // });
    // return { ...item, orders: newOrders };
    //   }),
    // );
  };

  return (
    <OrderItemContainer>
      <>
        {/* <li>{order.}</li>
        <li>{order.optionID}</li>
        <li>{order.quantity}</li> */}
        <li>
          {/* {order.state === "cancel"
              ? 0
              : calculatePrice(order.price, order.amount)} */}
        </li>
        <li className="order-state-button-container">
          {/* <CancelButton
            // onClick={() => handleOrderState(order, OrderStatusType.Canceled)}
            state={order}
          >
            취소
          </CancelButton>
          <OrderButton
            onClick={() => handleOrderState(order, OrderStatusType.Done)}
            state={order.status}
          >
            접수
          </OrderButton>
          <CompleteButton
            onClick={() => handleOrderState(order, OrderStatusType.Complete)}
            state={order.status}
          >
            완료
          </CompleteButton> */}
        </li>
      </>
    </OrderItemContainer>
  );
};

export default OrderItem;
