import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";
import { SubTitle1, SubTitle2 } from "../../mixin";
import { Order, OrderState } from "../../mockup/orderList";
import { orderState } from "../../state/orderState";
import OrderItem from "./OrderItem";
import OrderModal from "./OrderModal";

const List = styled.ul`
  li {
    display: grid;
    &.list-header {
      grid-template-columns: 1fr repeat(5, 1fr);
    }
    &.list-container {
      align-items: flex-start;
      grid-template-columns: 1fr 5fr;
      margin-bottom: 0.8rem;
      border-bottom: 1px solid ${(props) => props.theme.color.gray300};
    }
    h3 {
      ${SubTitle2}
      font-weight: 900;
    }
    div {
      display: grid;
      align-items: center;
      span {
        ${SubTitle1}
        display: flex;
        justify-content: flex-start;
        &.order-button-container {
          align-items: flex-start;
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
`;

const CompleteAllOrderButton = styled(ButtonDefaultStyle)`
  font-size: 1.2rem;
  padding: 0.8rem;
  margin-bottom: 0.3rem;
`;

const CancelAllOrderButton = styled(ButtonDefaultStyle)`
  font-size: 1.2rem;
  padding: 0.8rem;
  margin-bottom: 0.3rem;
`;

interface IOrderProps {
  orders: Order[];
}

const OrderStateList = ({ orders }: IOrderProps) => {
  const [isCancelModal, setIsCancelModal] = useState(false);
  const [isCompleteModal, setIsCompleteModal] = useState(false);

  const [orderList, setOrderList] = useRecoilState(orderState);

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

    if (state === OrderState.CANCEL) {
      setIsCancelModal(true);
      return;
    }

    if (state === OrderState.COMPLETE) {
      setIsCompleteModal(true);
      return;
    }
  };

  useEffect(() => {
    setOrderList((orders) =>
      orders.map((order) => {
        if (order.id === modalOrder.id) {
          return modalOrder;
        }
        return order;
      }),
    );
  }, [modalOrder]);

  return (
    <>
      {isCompleteModal && (
        <OrderModal
          modalOrder={modalOrder}
          setModalOrder={setModalOrder}
          setIsModal={setIsCompleteModal}
          modalState={OrderState.COMPLETE}
          modalMessage="개별 취소된 주문은 완료되지 않습니다. 주문을 완료하시겠습니까?"
        />
      )}
      {isCancelModal && (
        <OrderModal
          modalOrder={modalOrder}
          setModalOrder={setModalOrder}
          setIsModal={setIsCancelModal}
          modalState={OrderState.CANCEL}
          modalMessage="주문을 취소하면 완료된 주문을 포함해 모든 주문이 취소됩니다."
        />
      )}
      <List>
        <li className="list-header">
          <h3>주문 번호</h3>
          <h3>주문한 상품</h3>
          <h3>옵션</h3>
          <h3>수량</h3>
          <h3>가격</h3>
          <h3>현황</h3>
        </li>
        {orders.map((order) => (
          <li className="list-container" key={order.id} data-id={order.id}>
            <div>
              <span>{order.orderNumber}</span>
              <span className="order-button-container">
                <CompleteAllOrderButton
                  onClick={(e) => handleSetModalItem(e, OrderState.COMPLETE)}
                >
                  주문완료
                </CompleteAllOrderButton>
                <CancelAllOrderButton
                  onClick={(e) => handleSetModalItem(e, OrderState.CANCEL)}
                >
                  주문취소
                </CancelAllOrderButton>
              </span>
            </div>
            <OrderItem orders={order.orders} orderId={order.id} />
          </li>
        ))}
      </List>
    </>
  );
};

export default OrderStateList;
