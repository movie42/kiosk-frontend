import { NonNullTypeNode } from "graphql";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Modal from "../../Components/Modals/Modal";
import { getOrderForFrontend, NewOrder, Order } from "../../state/orderState";
import { OrderStatusType } from "../../generated/graphql";
import { calculatePrice } from "../../utils/helper/calculatePrice";
import { translateLocalCurrency } from "../../utils/helper/translateLocalCurrency";
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
        props.status === OrderStatusType.Canceled
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

const MODAL_MESSAGE = {
  READY: "주문을 접수하시겠습니까?",
  DONE: "모든 상품이 준비되었나요?",
  COMPLETE: "주문을 완료하시겠어요?",
  CANCELED: "주문을 취소하시겠습니까?"
};
const CONFIRM_BUTTON_NAME = {
  READY: "주문접수",
  DONE: "준비완료",
  COMPLETE: "주문완료",
  CANCELED: "주문취소"
};

interface IOrderModalProps {
  orderId: string;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  setOrderStatus: React.Dispatch<React.SetStateAction<OrderStatusType | null>>;
  status: OrderStatusType;
}

interface ButtonState {
  status?: OrderStatusType;
}

const OrderModal = ({
  orderId,
  setIsModal,
  setConfirm,
  setOrderStatus,
  status
}: IOrderModalProps) => {
  const orders = useRecoilValue(getOrderForFrontend);
  const [selectOrder] = orders.filter((order) => order.id === orderId);

  const handleConfirm = () => {
    setConfirm(true);
    setIsModal(false);
  };

  return (
    <ModalContainer strach={false}>
      <div>
        <h1>주문번호 {selectOrder?.number}</h1>
        <p>{MODAL_MESSAGE[status]}</p>
        <h3>구성</h3>
        <ModalItemContainer>
          {selectOrder?.orderProducts.map((value) => (
            <MordalItem>
              <span>{value?.productName} </span>
              <span>{value?.optionName} </span>
              <span>{value?.amount}개</span>
              <span>
                {calculatePrice(value?.productPrice, value?.amount)}원
              </span>
              <span>{translateOrderStateFromEngToKo(status)}</span>
            </MordalItem>
          ))}
        </ModalItemContainer>
        <OrderStateContainer>
          <PriceContainer>
            <h2>
              총 가격
              {selectOrder.price
                ? translateLocalCurrency(selectOrder.price)
                : 0}
              원
            </h2>
          </PriceContainer>
          <ButtonContainer>
            <button className="cancel-button" onClick={() => setIsModal(false)}>
              돌아가기
            </button>
            <button className="confirm-button" onClick={handleConfirm}>
              {CONFIRM_BUTTON_NAME[status]}
            </button>
          </ButtonContainer>
        </OrderStateContainer>
      </div>
    </ModalContainer>
  );
};

export default OrderModal;
