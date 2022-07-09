import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";
import { Headline3, SubTitle1, SubTitle2 } from "../../mixin";
import {
  getOrderForFrontend,
  NewOrder,
  Order,
  orderStateForFrontend,
  OrderStatusType,
} from "../../state/orderState";
import useModalHook from "../../utils/customHooks/useModalHook";
import OrderItem from "./OrderItem";
import OrderModal from "./OrderModal";

const List = styled.ul`
  li {
    padding: 1rem 0;
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
      ${Headline3}
      font-weight: 900;
      ${({ theme }) => theme.device.tablet} {
        font-size: 2rem;
      }
      ${({ theme }) => theme.device.mobile} {
        font-size: 1.5rem;
      }
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

interface IOrderProps {}

const OrderStateList = () => {
  const orders = useRecoilValue(getOrderForFrontend);

  const { id, setId, isModal, setIsModal, confirm, setConfirm } =
    useModalHook();
  const [isCancelModal, setIsCancelModal] = useState(false);
  const [isCompleteModal, setIsCompleteModal] = useState(false);
  const [modalOrder, setModalOrder] = useState<Order[]>();

  const handleSetModalItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    state: OrderStatusType,
  ) => {
    const id = e.currentTarget.closest("li")?.dataset.id;
    const [selectedItem] = orders.filter(
      (order) => Number(order.id) === Number(id),
    );

    // setModalOrder(selectedItem);

    if (state === OrderStatusType.Canceled) {
      setIsCancelModal(true);
      return;
    }

    if (state === OrderStatusType.Complete) {
      setIsCompleteModal(true);
      return;
    }
  };

  useEffect(() => {
    // setOrderList((orders) =>
    //   orders.map((order) => {
    //     if (order.id === modalOrder.id) {
    //       return modalOrder;
    //     }
    //     return order;
    //   }),
    // );
  }, [modalOrder]);

  return (
    <>
      {isCompleteModal && (
        <OrderModal
          modalOrder={modalOrder as Order[]}
          setModalOrder={setModalOrder as Dispatch<SetStateAction<Order[]>>}
          setIsModal={setIsCompleteModal}
          modalState={OrderStatusType.Complete}
          modalMessage="주문을 완료하시겠습니까?"
        />
      )}
      {isCancelModal && (
        <OrderModal
          modalOrder={modalOrder as Order[]}
          setModalOrder={setModalOrder as Dispatch<SetStateAction<Order[]>>}
          setIsModal={setIsCancelModal}
          modalState={OrderStatusType.Canceled}
          modalMessage="주문을 취소하시겠습니까?"
        />
      )}
      <List>
        {orders.map((order) => (
          <li className="list-container" key={order.id} data-id={order.id}>
            <div>
              <span>
                <strong>주문번호</strong>
              </span>
              <span>{order.number}</span>
              <span className="order-button-container">
                <CompleteAllOrderButton
                  onClick={(e) =>
                    handleSetModalItem(e, OrderStatusType.Complete)
                  }
                >
                  주문완료
                </CompleteAllOrderButton>
                <CancelAllOrderButton
                  onClick={(e) =>
                    handleSetModalItem(e, OrderStatusType.Canceled)
                  }
                >
                  주문취소
                </CancelAllOrderButton>
              </span>
            </div>
            {/* <OrderItem orders={orders} orderId={order.id} /> */}
          </li>
        ))}
      </List>
    </>
  );
};

export default OrderStateList;
