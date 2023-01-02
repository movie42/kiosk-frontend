import React from "react";
import { useRecoilValue } from "recoil";
import { getOrderForFrontend } from "@/lib/state/orderState";
import { translateLocalCurrency, calculatePrice } from "@/lib/utils";
import {
  CONFIRM_BUTTON_NAME,
  ModalStatusKey,
  MODAL_MESSAGE
} from "../interface";
import {
  OrderModalContainer,
  OrderModalWrapper,
  PriceContainer,
  ModalItemContainer,
  MordalItem,
  OrderStateContainer,
  ButtonContainer
} from "./styles";
import { OrderStatusType } from "@/lib/generated/graphql";
import { OrderStatusValue } from "@/lib/state/interface";
import { useUpdateOrderStatus } from "../hooks";

interface IOrderModalProps {
  orderId: string;
  status: ModalStatusKey | null;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  getStatusWithId: (id: string, status: OrderStatusValue | null) => void;
}

const OrderModal = ({
  orderId,
  status,
  setIsModal,
  getStatusWithId
}: IOrderModalProps) => {
  const orders = useRecoilValue(getOrderForFrontend);
  const [selectOrder] = orders.filter((order) => order.id === orderId);

  const { mutate } = useUpdateOrderStatus();

  const updateOrderStatus = () => {
    mutate(
      { id: Number(orderId), status: status as OrderStatusType },
      {
        onSuccess: () => {
          getStatusWithId("", null);
          setIsModal(() => false);
        }
      }
    );
  };

  return (
    <OrderModalContainer strach={true}>
      <OrderModalWrapper>
        <div>
          <PriceContainer>
            <h1>주문번호 {selectOrder?.number}</h1>
            <h3>
              <span>총 가격</span>
              {selectOrder?.price
                ? translateLocalCurrency(selectOrder?.price)
                : 0}
              원
            </h3>
          </PriceContainer>
          <p>{status && MODAL_MESSAGE[status]}</p>
        </div>
        <ModalItemContainer>
          <MordalItem>
            <span>상품이름</span>
            <span>옵션</span>
            <span>주문 수량</span>
            <span>가격</span>
          </MordalItem>
          {selectOrder?.orderProducts.map((value) => (
            <MordalItem key={value?.id}>
              <span>
                <strong>{value?.productName}</strong>
              </span>
              <span>
                <strong>
                  {value?.optionName ? value?.optionName : "기본"}
                </strong>
              </span>
              <span>
                <strong>{value?.amount}개</strong>
              </span>
              <span>
                <strong>
                  {value.productPrice &&
                    value.amount &&
                    calculatePrice(
                      Number(value.productPrice),
                      Number(value?.amount)
                    )}
                  원
                </strong>
              </span>
            </MordalItem>
          ))}
        </ModalItemContainer>
        <OrderStateContainer>
          <ButtonContainer>
            <button className="cancel-button" onClick={() => setIsModal(false)}>
              돌아가기
            </button>
            <button className="confirm-button" onClick={updateOrderStatus}>
              {status && CONFIRM_BUTTON_NAME[status]}
            </button>
          </ButtonContainer>
        </OrderStateContainer>
      </OrderModalWrapper>
    </OrderModalContainer>
  );
};

export default OrderModal;
