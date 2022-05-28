import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";
import Modal from "../../Components/Modals/Modal";
import { SubTitle1, SubTitle2 } from "../../mixin";
import { Order, OrderState } from "../../mockup/orderList";
import OrderItem from "./OrderItem";
import OrderModal from "./OrderModal";

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

interface IOrderProps {
  orders: Order[];
}

const OrderStateList = ({ orders }: IOrderProps) => {
  const [isOrderModal, setIsOrderModal] = useState(false);
  const [isCancelModal, setIsCancelModal] = useState(false);
  const [isCompleteModal, setIsCompleteModal] = useState(false);

  const [modalOrder, setModalOrder] = useState<Order>({
    id: 0,
    orderNumber: 0,
    orders: [],
  });

  const handleSetModalItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    state: OrderState,
  ) => {
    const id = e.currentTarget.closest("li")?.dataset.id;
    const [selectedItem] = orders.filter(
      (order) => Number(order.id) === Number(id),
    );

    setModalOrder(selectedItem);

    if (state === OrderState.ORDER) {
      setIsOrderModal(true);
      return;
    }

    if (state === OrderState.CANCEL) {
      setIsCancelModal(true);
      return;
    }

    if (state === OrderState.COMPLETE) {
      setIsCompleteModal(true);
      return;
    }
  };

  return (
    <>
      {isOrderModal && (
        <OrderModal
          modalOrder={modalOrder}
          setModalOrder={setModalOrder}
          setIsModal={setIsOrderModal}
          confirmButtonText="완료하기"
          modalMessage="주문 목록을 확인하고 주문이 완료되었다면 완료하기 버튼을 누르세요."
        />
      )}
      {isCancelModal && (
        <OrderModal
          modalOrder={modalOrder}
          setModalOrder={setModalOrder}
          setIsModal={setIsCancelModal}
          modalMessage="취소할 주문을 선택하고 '취소하기' 버튼을 누르세요."
          confirmButtonText="취소하기"
        />
      )}
      {isCompleteModal && (
        <OrderModal
          modalOrder={modalOrder}
          setModalOrder={setModalOrder}
          setIsModal={setIsCompleteModal}
          modalMessage="주문이 모두 완료되었다면 '주문완료' 버튼을 누르세요."
          confirmButtonText="주문완료"
        />
      )}
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
              orders={order.orders}
              handleSetModalItem={handleSetModalItem}
            />
          </li>
        ))}
      </List>
    </>
  );
};

export default OrderStateList;
