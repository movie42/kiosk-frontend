import React from "react";
import styled from "styled-components";
import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";

import Modal from "../../Components/Modals/Modal";
import { Order, OrderList, OrderState } from "../../mockup/orderList";

const ModalContainer = styled(Modal)``;

const SelectStateButton = styled.span<{
  state: string;
}>`
  background-color: ${(props) =>
    props.state === "cancel" && props.theme.color.error700};
`;

const OrderStateContainer = styled.div`
  display: flex;
`;
const ButtonContainer = styled.div``;

const PriceContainer = styled.div``;

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

interface IOrderModalProps {
  modalOrder: Order;
  setModalOrder: React.Dispatch<React.SetStateAction<Order>>;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalMessage: string;
  confirmButtonText: string;
}

interface IOrderState {
  state: OrderList["state"];
}

const OrderModal = ({
  modalOrder,
  setModalOrder,
  setIsModal,
  modalMessage,
  confirmButtonText,
}: IOrderModalProps) => {
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
      { ...selectedValue, state: OrderState.CANCEL },
    ].sort((a, b) => (a.optionID > b.optionID ? 1 : -1));

    setModalOrder((pre) => ({
      ...pre,
      orderList: newOrderList,
    }));
  };

  const handleState = () => {};

  return (
    <ModalContainer strach={true}>
      <>
        <h1>주문번호 {modalOrder?.orderNumber}</h1>
        <p>{modalMessage}</p>
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
            <button onClick={() => setIsModal(false)}>돌아가기</button>
            <button onClick={handleState}>{confirmButtonText}</button>
          </ButtonContainer>
        </OrderStateContainer>
      </>
    </ModalContainer>
  );
};

export default OrderModal;
