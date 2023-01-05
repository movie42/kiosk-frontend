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
  PriceContainer,
  ModalItemContainer,
  ModalItem,
  ButtonContainer
} from "./styles";
import { OrderStatusType } from "@/lib/generated/graphql";
import { OrderStatusValue } from "@/lib/state/interface";
import { useUpdateOrderStatus } from "../hooks";
import { NewModal } from "../../Molecules";

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
    <NewModal
      Header={
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
      }
      Model={
        <ModalItemContainer>
          <ModalItem>
            <span>상품이름</span>
            <span>옵션</span>
            <span>주문 수량</span>
            <span>가격</span>
          </ModalItem>
          {selectOrder?.orderProducts.map((value) => (
            <ModalItem key={value?.id}>
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
            </ModalItem>
          ))}
        </ModalItemContainer>
      }
      Buttons={
        <ButtonContainer>
          <button className="cancel-button" onClick={() => setIsModal(false)}>
            돌아가기
          </button>
          <button className="confirm-button" onClick={updateOrderStatus}>
            {status && CONFIRM_BUTTON_NAME[status]}
          </button>
        </ButtonContainer>
      }
      modalOptions={{ stretch: true }}
    />
  );
};

export default OrderModal;
