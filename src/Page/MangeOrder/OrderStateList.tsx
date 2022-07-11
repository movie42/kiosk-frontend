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
import { translateLocalCurrency } from "../../utils/helper/translateLocalCurrency";
import OrderItem from "./OrderItem";
import OrderModal from "./OrderModal";

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(20rem, 40rem);
  gap: 2rem;
  ${({ theme }) => theme.device.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${({ theme }) => theme.device.mobile} {
    grid-template-columns: unset;
  }

  li {
    box-sizing: border-box;
    overflow-y: auto;
    padding: 1rem 0;
    &.list-container {
      align-items: flex-start;
      margin-bottom: 0.8rem;
      border: 1px solid ${(props) => props.theme.color.gray300};
      border-radius: 1rem;
      padding: 1rem;
      .list-header {
        display: flex;
        span {
          &:not(:first-child) {
            margin-left: 1rem;
          }
          ${SubTitle2}
          font-weight:900;
          strong {
            display: block;
            font-size: 1.6rem;
            font-weight: 300;
          }
        }
      }
    }
  }
`;

const OrderProductInfoContainer = styled.div`
  ul {
    li {
      display: flex;
      flex-direction: column;
      span {
        ${SubTitle2}
        font-weight:900;
        strong {
          display: block;
          font-size: 1.6rem;
          font-weight: 300;
        }
      }
    }
  }
`;

const defaultButtonStyle = styled.button`
  font-size: 1.2rem;
  padding: 0 0.8rem;
  margin-bottom: 0.3rem;
  width: 5rem;
  height: 5rem;
  border-radius: 100%;
`;

const CompleteAllOrderButton = styled(defaultButtonStyle)``;

const CancelAllOrderButton = styled(defaultButtonStyle)``;

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
  }, []);

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
            <div className="list-header">
              <span>
                <strong>주문번호</strong>
                {order.number}
              </span>
              <span>
                <strong>총 금액</strong>
                {translateLocalCurrency(order.price)}원
              </span>
            </div>
            <OrderProductInfoContainer>
              <div>
                <ul>
                  {order.orderProducts.map((product) => (
                    <li data-orderid={product?.orderId} key={product?.orderId}>
                      <span data-productid={product?.productId}>
                        <strong>상품 이름</strong>
                        {product?.productName}
                      </span>
                      <span>
                        <strong>가격</strong>
                        {product?.productPrice &&
                          translateLocalCurrency(product?.productPrice)}
                        원
                      </span>
                      <span>
                        <strong>주문 수량</strong>
                        {product?.amount}
                      </span>
                      <span data-optionid={product?.optionId}>
                        <strong>옵션</strong>
                        {product?.optionName}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </OrderProductInfoContainer>
            <span className="order-button-container">
              <CompleteAllOrderButton
                onClick={(e) => handleSetModalItem(e, OrderStatusType.Complete)}
              >
                주문접수
              </CompleteAllOrderButton>
              <CompleteAllOrderButton
                onClick={(e) => handleSetModalItem(e, OrderStatusType.Complete)}
              >
                준비완료
              </CompleteAllOrderButton>
              <CompleteAllOrderButton
                onClick={(e) => handleSetModalItem(e, OrderStatusType.Complete)}
              >
                주문완료
              </CompleteAllOrderButton>
              <CancelAllOrderButton
                onClick={(e) => handleSetModalItem(e, OrderStatusType.Canceled)}
              >
                주문취소
              </CancelAllOrderButton>
            </span>
          </li>
        ))}
      </List>
    </>
  );
};

export default OrderStateList;
