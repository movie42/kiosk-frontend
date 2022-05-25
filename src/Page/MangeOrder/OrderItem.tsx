import React from "react";
import { Order, OrderList } from "../../mockup/orderList";
import { CancelButton, CompleteButton, OrderButton } from "./OrderStateList";

type ModalButton = (e: React.MouseEvent<HTMLButtonElement>) => void;

interface IOrderItemProp {
  orders: OrderList[];
  handleCancelStateModal: ModalButton;
  handleOrderStateModal: ModalButton;
  handleCompleteStateModal: ModalButton;
}
const OrderItem = ({
  orders,
  handleCancelStateModal,
  handleOrderStateModal,
  handleCompleteStateModal,
}: IOrderItemProp) => {
  return (
    <>
      <span>
        {orders[0].productName} {orders.length > 1 ? `외 ${orders.length}` : ""}
      </span>
      <span>
        {orders.every((item) => item.state) && (
          <>
            <CancelButton
              onClick={handleCancelStateModal}
              state={orders[0].state}
            >
              취소
            </CancelButton>
            <OrderButton
              onClick={handleOrderStateModal}
              state={orders[0].state}
            >
              주문
            </OrderButton>
            <CompleteButton
              onClick={handleCompleteStateModal}
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
