import React from "react";
import { OrderList } from "../../mockup/orderList";
import { CancelButton, CompleteButton, OrderButton } from "./OrderStateList";

interface IOrderItemProp {
  orderList: OrderList[];
  handleCancelStateModal: () => any;
  handleOrderStateModal: () => any;
  handleCompleteStateModal: () => any;
}
const OrderItem = ({
  orderList,
  handleCancelStateModal,
  handleOrderStateModal,
  handleCompleteStateModal,
}: IOrderItemProp) => {
  return (
    <>
      <span>
        {orderList[0].productName}{" "}
        {orderList.length > 1 ? `외 ${orderList.length}` : ""}
      </span>
      <span>
        {orderList.every((item) => item.state) && (
          <>
            <CancelButton
              onClick={handleCancelStateModal}
              state={orderList[0].state}
            >
              취소
            </CancelButton>
            <OrderButton
              onClick={handleOrderStateModal}
              state={orderList[0].state}
            >
              주문
            </OrderButton>
            <CompleteButton
              onClick={handleCompleteStateModal}
              state={orderList[0].state}
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
