import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";
import Modal from "../../Components/Modals/Modal";
import { SubTitle1, SubTitle2 } from "../../mixin";
import { Order, OrderList, OrderState } from "../../mockup/orderList";
import OrderItem from "./OrderItem";

const OrderModal = styled(Modal)``;

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

const OrderStateContainer = styled.div`
  display: flex;
`;
const ButtonContainer = styled.div``;

const PriceContainer = styled.div``;

const SelectStateButton = styled.span<{
  state: string;
}>`
  background-color: ${(props) =>
    props.state === "cancel" && props.theme.color.error700};
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
  const [isCancelModal, setIsCancelModal] = useState(false);
  const [isOrderModal, setIsOrderModal] = useState(false);
  const [isCompleteModal, setIsCompleteModal] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState([]);

  const [modalOrder, setModalOrder] = useState<Order>({
    id: 0,
    orderNumber: 0,
    orders: [],
  });

  const handleCancelStateModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.closest("li")?.dataset.id;
    const [selectedItem] = orders.filter(
      (order) => Number(order.id) === Number(id),
    );
    setModalOrder(selectedItem);
    setIsCancelModal(true);
  };
  const handleOrderStateModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.closest("li")?.dataset.id;
    const [selectedItem] = orders.filter(
      (order) => Number(order.id) === Number(id),
    );
    setModalOrder(selectedItem);
    setIsOrderModal(true);
  };
  const handleCompleteStateModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.closest("li")?.dataset.id;
    const [selectedItem] = orders.filter(
      (order) => Number(order.id) === Number(id),
    );
    setModalOrder(selectedItem);
    setIsCompleteModal(true);
  };

  const handleCancelOrder = () => {};

  const handleChangeState = (e: React.MouseEvent<HTMLLIElement>) => {
    const id = e.currentTarget.dataset.index;
    const [selectedValue] = modalOrder.orders.filter(
      (item, index) => Number(index) === Number(id),
    );

    const unSelectedValue = modalOrder.orders.filter(
      (item, index) => Number(index) !== Number(id),
    );

    const newOrderList: OrderList[] = [
      ...unSelectedValue,
      { ...selectedValue, state: OrderState.cancel },
    ].sort((a, b) => (a.optionID > b.optionID ? 1 : -1));

    setModalOrder((pre) => ({
      ...pre,
      orderList: newOrderList,
    }));
  };

  return (
    <>
      {isCancelModal && (
        <OrderModal strach={true}>
          <>
            <h1>주문번호 {modalOrder?.orderNumber}</h1>
            <p>취소할 상품을 선택하세요.</p>
            <h3>구성</h3>
            <ul>
              {modalOrder?.orders.map((value, index) => (
                <li data-index={index} onClick={handleChangeState}>
                  <SelectStateButton state={value.state} />
                  <span>{value.productName} </span>
                  <span>{value.optionID} </span>
                  <span>{value.quantity}개</span>
                </li>
              ))}
            </ul>
            <OrderStateContainer>
              <PriceContainer>
                <h2>
                  총 가격{" "}
                  {modalOrder?.orders.reduce(
                    (acc, current) => acc + current.price,
                    0,
                  )}
                </h2>
              </PriceContainer>
              <ButtonContainer>
                <button onClick={() => setIsCancelModal(false)}>
                  {" "}
                  돌아가기
                </button>
                <button onClick={handleCancelOrder}>취소하기</button>
              </ButtonContainer>
            </OrderStateContainer>
          </>
        </OrderModal>
      )}
      {isOrderModal && (
        <OrderModal strach={true}>
          <>
            <h1>주문번호 {modalOrder?.orderNumber}</h1>
            <p>취소할 상품을 선택하세요.</p>
            <h3>구성</h3>
            <ul>
              {modalOrder?.orders.map((value, index) => (
                <li data-index={index} onClick={handleChangeState}>
                  <SelectStateButton state={value.state} />
                  <span>{value.productName} </span>
                  <span>{value.optionID} </span>
                  <span>{value.quantity}개</span>
                </li>
              ))}
            </ul>
            <OrderStateContainer>
              <PriceContainer>
                <h2>
                  총 가격{" "}
                  {modalOrder?.orders.reduce(
                    (acc, current) => acc + current.price,
                    0,
                  )}
                </h2>
              </PriceContainer>
              <ButtonContainer>
                <button onClick={() => setIsOrderModal(false)}>
                  {" "}
                  돌아가기
                </button>
                <button onClick={handleCancelOrder}>취소하기</button>
              </ButtonContainer>
            </OrderStateContainer>
          </>
        </OrderModal>
      )}
      {isCompleteModal && (
        <OrderModal strach={true}>
          <>
            <h1>주문번호 {modalOrder?.orderNumber}</h1>
            <p>취소할 상품을 선택하세요.</p>
            <h3>구성</h3>
            <ul>
              {modalOrder?.orders.map((value, index) => (
                <li data-index={index} onClick={handleChangeState}>
                  <SelectStateButton state={value.state} />
                  <span>{value.productName} </span>
                  <span>{value.optionID} </span>
                  <span>{value.quantity}개</span>
                </li>
              ))}
            </ul>
            <OrderStateContainer>
              <PriceContainer>
                <h2>
                  총 가격{" "}
                  {modalOrder?.orders.reduce(
                    (acc, current) => acc + current.price,
                    0,
                  )}
                </h2>
              </PriceContainer>
              <ButtonContainer>
                <button onClick={() => setIsCompleteModal(false)}>
                  {" "}
                  돌아가기
                </button>
                <button onClick={handleCancelOrder}>취소하기</button>
              </ButtonContainer>
            </OrderStateContainer>
          </>
        </OrderModal>
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
              handleCancelStateModal={handleCancelStateModal}
              handleOrderStateModal={handleOrderStateModal}
              handleCompleteStateModal={handleCompleteStateModal}
            />
          </li>
        ))}
      </List>
    </>
  );
};

export default OrderStateList;
