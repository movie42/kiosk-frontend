import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../Components/Modals/Modal";
import { Order, OrderStatusType } from "../../state/orderState";
import { calculatePrice } from "../../utils/helper/calculatePrice";
import { translateOrderStateFromEngToKo } from "../../utils/helper/translateOrderStateFromEngToKo";

const ModalContainer = styled(Modal)``;

const OrderStateContainer = styled.div`
  display: flex;
  align-self: flex-end;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div<ButtonState>`
  button {
    cursor: pointer;
    border: 0;
    font-size: 1.8rem;
    padding: 0.7rem 1rem;
    border-radius: 0.5rem;
    &.cancel-button {
      background-color: ${(props) => props.theme.color.gray300};
      margin-right: 0.8rem;
    }
    &.confirm-button {
      background-color: ${(props) =>
        props.state === OrderStatusType.Canceled
          ? props.theme.color.error700
          : props.theme.color.primary600};
      color: ${(props) => props.theme.color.fontColorWhite};
    }
  }
`;

const PriceContainer = styled.div``;

const ModalItemContainer = styled.ul`
  margin: 1rem 0;
  li {
    margin-bottom: 0.8rem;
  }
`;

const MordalItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  span {
    margin-right: 1.2rem;
  }
`;

interface IOrderModalProps {
  modalOrder: Order[];
  setModalOrder: React.Dispatch<React.SetStateAction<Order[]>>;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalMessage: string;
  modalState: Order["status"];
}

interface ButtonState {
  state?: Order["status"];
}

const OrderModal = ({
  modalOrder,
  setModalOrder,
  setIsModal,
  modalMessage,
  modalState,
}: IOrderModalProps) => {
  const handleSetState = () => {
    if (modalState === OrderStatusType.Complete) {
      // const newOrders: OrderList[] = modalOrder.orders.map((value) => {
      //   if (value.state !== OrderState.CANCELED) {
      //     return { ...value, state: OrderState.COMPLETE };
      //   }
      //   return value;
      // });
      // setModalOrder((pre) => ({ ...pre, orders: newOrders }));
      setIsModal(false);
      return;
    }

    if (modalState === OrderStatusType.Canceled) {
      // const newOrders: OrderList[] = modalOrder.orders.map((value) => ({
      //   ...value,
      //   state: OrderState.CANCELED,
      // }));
      // setModalOrder((pre) => ({ ...pre, orders: newOrders }));
      setIsModal(false);
      return;
    }
  };

  return (
    <ModalContainer strach={false}>
      <div>
        {/* <h1>주문번호 {modalOrder?.number}</h1> */}
        <p>{modalMessage}</p>
        <h3>구성</h3>
        <ModalItemContainer>
          {/* {modalOrder?.orders.map((value) => (
            <MordalItem>
              <span>{value.productName} </span>
              <span>{value.optionID} </span>
              <span>{value.quantity}개</span>
              <span>
                {value.state === OrderState.CANCEL
                  ? 0
                  : calculatePrice(value.price, value.quantity)}
                원
              </span>
              <span>{translateOrderStateFromEngToKo(value.state)}</span>
            </MordalItem>
          ))} */}
        </ModalItemContainer>
        <OrderStateContainer>
          <PriceContainer>
            <h2>
              총 가격{" "}
              {/* {modalOrder?.orders
                .filter((item) => item.state !== OrderState.CANCEL)
                .reduce(
                  (acc, current) => acc + current.price * current.quantity,
                  0,
                )
                .toLocaleString("ko-KR")} */}
              원
            </h2>
          </PriceContainer>
          <ButtonContainer state={modalState}>
            <button className="cancel-button" onClick={() => setIsModal(false)}>
              돌아가기
            </button>
            <button className="confirm-button" onClick={handleSetState}>
              주문{translateOrderStateFromEngToKo(modalState)}
            </button>
          </ButtonContainer>
        </OrderStateContainer>
      </div>
    </ModalContainer>
  );
};

export default OrderModal;
