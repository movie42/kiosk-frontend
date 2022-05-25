import React from "react";
import styled from "styled-components";
import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";
import { OrderList, OrderState } from "../../mockup/orderList";

const CancelButton = styled(ButtonDefaultStyle)<{ state: OrderState }>``;
const OrderButton = styled(ButtonDefaultStyle)<{ state: OrderState }>``;
const CompleteButton = styled(ButtonDefaultStyle)<{ state: OrderState }>``;

type ModalButton = (
  e: React.MouseEvent<HTMLButtonElement>,
  state: OrderState,
) => void;

interface IOrderItemProp {
  orders: OrderList[];
  handleSetModalItem: ModalButton;
}
const OrderItem = ({ orders, handleSetModalItem }: IOrderItemProp) => {
  return (
    <>
      <span>
        {orders[0].productName} {orders.length > 1 ? `외 ${orders.length}` : ""}
      </span>
      <span>
        {orders.every((item) => item.state) && (
          <>
            <CancelButton
              onClick={(e) => handleSetModalItem(e, OrderState.cancel)}
              state={orders[0].state}
            >
              취소
            </CancelButton>
            <OrderButton
              onClick={(e) => handleSetModalItem(e, OrderState.order)}
              state={orders[0].state}
            >
              주문
            </OrderButton>
            <CompleteButton
              onClick={(e) => handleSetModalItem(e, OrderState.complete)}
              state={orders[0].state}
            >
              완료
            </CompleteButton>
          </>
        )}
      </span>
    </>
  );
};

export default OrderItem;
