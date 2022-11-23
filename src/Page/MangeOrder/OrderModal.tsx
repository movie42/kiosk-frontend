import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Modal from "../../Components/Modals/Modal";
import { getOrderForFrontend } from "../../lib/state/orderState";
import { OrderStatusType } from "../../lib/generated/graphql";
import { calculatePrice } from "../../lib/utils/helper/calculatePrice";
import { translateLocalCurrency } from "../../lib/utils/helper/translateLocalCurrency";
import { SubTitle2 } from "../../lib/styles/mixin";

const ModalContainer = styled(Modal)``;

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 0.8fr 3fr 0.05fr;
  ${({ theme }) => theme.device.mobile} {
    grid-template-rows: 1fr 5fr 0.5fr;
  }
`;

const OrderStateContainer = styled.div`
  display: flex;
  align-self: flex-end;
  justify-content: flex-end;
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

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
    font-size: 2.3rem;
    span {
      font-size: 1.8rem;
      font-weight: 400;
    }
  }
  ${({ theme }) => theme.device.mobile} {
    h1 {
      font-size: 4rem;
    }
    h3 {
      font-size: 1.6rem;
    }
  }
`;

const ModalItemContainer = styled.ul`
  margin: 1rem 0;
  li {
    margin-bottom: 0.8rem;
  }
`;

const MordalItem = styled.li`
  display: grid;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 2px dotted ${(props) => props.theme.color.gray300};
  grid-template-columns: 2.5fr 1.8fr 1.3fr 2fr;
  span {
    display: flex;
    flex-direction: column;
    margin-right: 1.2rem;
    font-size: 1.5rem;
    strong {
      ${SubTitle2}
      word-break: keep-all;
      font-weight: 600;
    }
  }
  ${({ theme }) => theme.device.mobile} {
    grid-template-columns: 2.3fr 1.7fr 1.5fr 2fr;
    span {
      strong {
        word-break: keep-all;
        font-size: 1.5rem;
      }
    }
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
  status: OrderStatusType;
}

interface ButtonState {
  status?: OrderStatusType;
}

const OrderModal = ({
  orderId,
  setIsModal,
  setConfirm,
  status
}: IOrderModalProps) => {
  const orders = useRecoilValue(getOrderForFrontend);
  const [selectOrder] = orders.filter((order) => order.id === orderId);

  const handleConfirm = () => {
    setConfirm(true);
    setIsModal(false);
  };

  return (
    <ModalContainer strach={true}>
      <Wrapper>
        <div>
          <PriceContainer>
            <h1>주문번호 {selectOrder?.number}</h1>
            <h3>
              <span>총 가격</span>
              {selectOrder.price
                ? translateLocalCurrency(selectOrder.price)
                : 0}
              원
            </h3>
          </PriceContainer>
          <p>{MODAL_MESSAGE[status]}</p>
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
                  {calculatePrice(value?.productPrice, value?.amount)}원
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
            <button className="confirm-button" onClick={handleConfirm}>
              {CONFIRM_BUTTON_NAME[status]}
            </button>
          </ButtonContainer>
        </OrderStateContainer>
      </Wrapper>
    </ModalContainer>
  );
};

export default OrderModal;
