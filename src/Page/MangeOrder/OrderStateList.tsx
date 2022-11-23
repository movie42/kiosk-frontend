import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import styled, { DefaultTheme } from "styled-components";

import { translateLocalCurrency } from "@/lib/utils";
import { getOrderForFrontend, userState } from "@/lib/state";
import { Headline2 } from "@/lib/styles";
import { useModalHook } from "@/lib/hooks";
import {
  useUpdateOrderStatusMutation,
  OrderStatusType
} from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";

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

const OrderInfoHeader = styled(motion.div)`
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

const defaultButtonStyle = styled(motion.button)<{ status: string }>`
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0 0.8rem;
  margin-bottom: 0.3rem;
  width: 5rem;
  height: 5rem;
  border-radius: 100%;
  border: 2px solid #fff;
`;

const buttonFalse = (theme: DefaultTheme) => `
    background-color: ${theme.color.gray300};
    color:${theme.color.fontColorBlack};
    border:1px solid #000;
`;

const ReadyOrderButton = styled(defaultButtonStyle)`
  ${({ status, theme }) =>
    status === "READY"
      ? `background-color: ${theme.color.secondary300};
         color:${theme.color.fontColorWhite};
            `
      : `${buttonFalse(theme)}`};
`;
const DoneOrderButton = styled(defaultButtonStyle)`
  ${({ status, theme }) =>
    status === "DONE"
      ? `background-color: ${theme.color.secondary600};
         color:${theme.color.fontColorWhite};
            `
      : `${buttonFalse(theme)}`};
`;
const CompleteOrderButton = styled(defaultButtonStyle)`
  ${({ status, theme }) =>
    status === "COMPLETE"
      ? `background-color: ${theme.color.primary500};
         color:${theme.color.fontColorWhite};
        `
      : `${buttonFalse(theme)}`};
`;
const CancelOrderButton = styled(defaultButtonStyle)`
  ${({ status, theme }) =>
    status === "CANCELED"
      ? `background-color: ${theme.color.error700};
         color:${theme.color.fontColorWhite};
            `
      : `${buttonFalse(theme)}`};
`;

const OrderStateList = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useRecoilValue(userState);
  const orders = useRecoilValue(getOrderForFrontend);
  const { id, setId, isModal, setIsModal, confirm, setConfirm } =
    useModalHook();

  const { mutate: updateOrderStatusMutate } = useUpdateOrderStatusMutation(
    graphqlReqeustClient(accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getOrders");
      }
    }
  );

  const [orderStatus, setOrderStatus] = useState<OrderStatusType | null>(null);

  const handleSetModalItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    status: OrderStatusType
  ) => {
    const orderId = String(e.currentTarget.closest("li")?.dataset.id);

    if (orderId && status) {
      setId(() => orderId);
      setIsModal(() => true);
      setOrderStatus(() => status);
    }
  };

  const handleProductState = (e: React.MouseEvent<HTMLSpanElement>) => {
    const productId = e.currentTarget.dataset.productid;
    console.log(productId);
  };

  useEffect(() => {
    if (confirm) {
      const orderId = Number(id);

      updateOrderStatusMutate(
        { id: orderId, status: orderStatus as OrderStatusType },
        {
          onSuccess: () => {
            setOrderStatus(null);
            setConfirm(false);
          }
        }
      );
    }
  }, [confirm, id, orderStatus, setConfirm, updateOrderStatusMutate]);

  return (
    <>
      {isModal && (
        <OrderModal
          orderId={id as string}
          setIsModal={setIsModal}
          setConfirm={setConfirm}
          status={orderStatus as OrderStatusType}
        />
      )}
      <List>
        {orders.map((order) => (
          <li className="list-container" key={order.id} data-id={order.id}>
            <OrderInfoHeader>
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
                <ReadyOrderButton
                  onClick={(e: any) =>
                    handleSetModalItem(e, OrderStatusType.Ready)
                  }
                  variants={buttonBlinkVariants}
                  animate={order.status === "READY" && "animation"}
                  status={order.status}
                >
                  주문접수
                </ReadyOrderButton>
                <DoneOrderButton
                  onClick={(e: any) =>
                    handleSetModalItem(e, OrderStatusType.Done)
                  }
                  status={order.status}
                >
                  준비완료
                </DoneOrderButton>
                <CompleteOrderButton
                  onClick={(e: any) =>
                    handleSetModalItem(e, OrderStatusType.Complete)
                  }
                  status={order.status}
                >
                  주문완료
                </CompleteOrderButton>
                <CancelOrderButton
                  onClick={(e: any) =>
                    handleSetModalItem(e, OrderStatusType.Canceled)
                  }
                  status={order.status}
                >
                  주문취소
                </CancelOrderButton>
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
                        onClick={handleProductState}
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
                      <span data-optionid={product?.productOptionId}>
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
