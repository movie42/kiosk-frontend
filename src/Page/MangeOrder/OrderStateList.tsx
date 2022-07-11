import { motion, Variants } from "framer-motion";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";
import { Headline2, Headline3, SubTitle1, SubTitle2 } from "../../mixin";
import {
  getOrderForFrontend,
  NewOrder,
  Order,
  orderStateForFrontend,
  OrderStatusType
} from "../../state/orderState";
import { theme } from "../../theme";
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
    &.list-container {
      align-items: flex-start;
      margin-bottom: 0.8rem;
      border: 1px solid ${(props) => props.theme.color.gray300};
      border-radius: 1rem;
      .list-header {
        display: flex;
        justify-content: space-between;
        padding-bottom: 1rem;
        span {
          ${Headline2}
          line-height: 1.2;
          &:not(:first-child) {
            margin-left: 1rem;
            font-size: 1.7rem;
          }
          font-weight: 900;
          strong {
            display: block;
            font-size: 1.7rem;
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
      display: grid;
      padding: 1rem 0.8rem;
      &:not(:last-child) {
        border-bottom: 2px dotted ${(props) => props.theme.color.gray300};
      }
      span {
        &:first-child {
          grid-column: 1 / span 3;
          padding-bottom: 0.8rem;
        }
        &:nth-child(2) {
          grid-column: 1 / 2;
        }
        &:nth-child(3) {
          grid-column: 2 / 3;
        }
        &:last-child {
          grid-column: 3 / 4;
        }
        font-size: 1.7rem;
        line-height: 1.3;
        font-weight: 600;
        strong {
          display: block;
          font-size: 1.3rem;
          font-weight: 300;
        }
      }
    }
  }
`;

const OrderInfoHeader = styled(motion.div)<{ status: string }>`
  position: sticky;
  height: 15.5rem;
  top: 0;
  box-sizing: border-box;
  z-index: 1;
  background-color: ${({ theme }) => theme.color.gray800};
  padding: 1rem;
  color: ${({ theme }) => theme.color.fontColorWhite};
  .order-button-container {
    display: flex;
    justify-content: space-between;
    .ready {
      ${({ status, theme }) =>
        status === "READY"
          ? `background-color: ${theme.color.secondary300};
              color:${theme.color.fontColorWhite};
            `
          : `background-color: ${theme.color.gray300};
            color:${theme.color.fontColorBlack};
            border:1px solid #000;
          `};
    }
    .done {
      ${({ status, theme }) =>
        status === "DONE"
          ? `background-color: ${theme.color.secondary600};
              color:${theme.color.fontColorWhite};
            `
          : `background-color: ${theme.color.gray300};
            color:${theme.color.fontColorBlack};
            border:1px solid #000;
          `};
    }
    .complete {
      ${({ status, theme }) =>
        status === "COMPLETE"
          ? `background-color: ${theme.color.primary500};
              color:${theme.color.fontColorWhite};
              border:1px solid #000;
            `
          : `background-color: ${theme.color.gray300};
            color:${theme.color.fontColorBlack};
            border:1px solid #000;
          `};
    }
    .canceled {
      ${({ status, theme }) =>
        status === "CANCELED"
          ? `background-color: ${theme.color.error300};
              color:${theme.color.fontColorWhite};
            `
          : `background-color: ${theme.color.gray300};
            color:${theme.color.fontColorBlack};
            border:1px solid #000;
          `};
    }
  }
`;

const buttonBlinkVariants: Variants = {
  animation: {
    backgroundColor: ["#ffe100", "#d0d0d0"],
    transition: {
      backgroundColor: { yoyo: Infinity, duration: 0.8 }
    }
  }
};

const defaultButtonStyle = styled(motion.button)`
  font-size: 1.2rem;
  padding: 0 0.8rem;
  margin-bottom: 0.3rem;
  width: 5rem;
  height: 5rem;
  border-radius: 100%;
  border: 1px solid #fff;
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
    state: OrderStatusType
  ) => {
    const id = e.currentTarget.closest("li")?.dataset.id;
    const [selectedItem] = orders.filter(
      (order) => Number(order.id) === Number(id)
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

  const handleProductOrderState = (e: React.MouseEvent<HTMLSpanElement>) => {
    const id = e.currentTarget.dataset.productid;
    console.log(id);
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
            <OrderInfoHeader status={order.status}>
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
              <div className="order-button-container">
                <CompleteAllOrderButton
                  variants={buttonBlinkVariants}
                  animate={order.status === "READY" && "animation"}
                  className="ready"
                  onClick={(e) =>
                    handleSetModalItem(e, OrderStatusType.Complete)
                  }
                >
                  주문접수
                </CompleteAllOrderButton>
                <CompleteAllOrderButton
                  className="done"
                  onClick={(e) =>
                    handleSetModalItem(e, OrderStatusType.Complete)
                  }
                >
                  준비완료
                </CompleteAllOrderButton>
                <CompleteAllOrderButton
                  onClick={(e) =>
                    handleSetModalItem(e, OrderStatusType.Complete)
                  }
                  className="complete"
                >
                  주문완료
                </CompleteAllOrderButton>
                <CancelAllOrderButton
                  onClick={(e) =>
                    handleSetModalItem(e, OrderStatusType.Canceled)
                  }
                  className="canceled"
                >
                  주문취소
                </CancelAllOrderButton>
              </div>
            </OrderInfoHeader>
            <OrderProductInfoContainer>
              <div>
                <ul>
                  {order.orderProducts.map((product, index) => (
                    <li
                      data-orderid={product?.orderId}
                      key={`${product?.orderId}-${index}`}
                    >
                      <span
                        data-productid={`${product?.orderId}-${product?.productId}-${index}`}
                        onClick={handleProductOrderState}
                      >
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
          </li>
        ))}
      </List>
    </>
  );
};

export default OrderStateList;
