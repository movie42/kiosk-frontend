import React from "react";
import {
  AnimateSharedLayout,
  motion,
  useTransform,
  useViewportScroll
} from "framer-motion";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";
import InputDefault from "../../Components/Form/InputDefault";
import PageHeaderMessage from "../../Components/PageHeader";
import { Headline2, Headline3 } from "../../lib/styles/mixin";
import { orderStatusState, OrderStatusType } from "../../lib/state/orderState";

const OptionContainer = styled(motion.div)`
  position: relative;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr 3fr;
  padding-bottom: 1.5rem;
  background-color: ${(props) => props.theme.color.background100};
  z-index: 10;
  h2 {
    ${Headline2}
  }

  ${({ theme }) => theme.device.tablet} {
    h2 {
      ${Headline3};
      margin-top: 1rem;
      line-height: 1.5;
    }
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SearchingInput = styled(InputDefault)`
  ${Headline3};
  border: 0;
  outline: unset;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ${({ theme }) => theme.device.tablet} {
    font-size: 2rem;
    margin: 1rem 0;
    line-height: 1.5;
    padding: 0;
  }
`;

const ButtonContainer = styled(motion.div)`
  button {
    padding: 0.2rem 1.5rem;
    font-size: 2rem;
    margin-left: 0.3rem;
    background-color: unset;
    color: ${(props) => props.theme.color.fontColorBlack};
    ${({ theme }) => theme.device.tablet} {
      padding: 0.2rem 1.5rem 0 0;
      margin-left: 0;
    }
    ${({ theme }) => theme.device.mobile} {
      font-size: 1.8rem;
      padding: 0.2rem 1rem 0 0;
      margin-left: 0;
    }
  }
`;

const WholeOrderStateButton = styled(ButtonDefaultStyle)``;
const OrderStateButton = styled(ButtonDefaultStyle)``;
const CancelOrderStateButton = styled(ButtonDefaultStyle)``;
const CompleteOrderStateButton = styled(ButtonDefaultStyle)``;
const Underline = styled(motion.div)`
  border-bottom: 3px solid ${(props) => props.theme.color.primary700};
`;

interface IOptionsContainerProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  stickyPos: number;
}

const OptionsContainer = ({
  setSearchTerm,
  stickyPos
}: IOptionsContainerProps) => {
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, [0, stickyPos, stickyPos + 1], [0, 0, 1], {
    clamp: false
  });
  const borderTick = useTransform(
    scrollY,
    [0, stickyPos, stickyPos + 1],
    ["unset", "unset", "3px solid #575757"]
  );

  const { register, handleSubmit } = useForm();
  const [orderStatus, setOrderStatus] = useRecoilState(orderStatusState);

  const searchOrder = handleSubmit((data) => {
    setSearchTerm(data.searchOrder);
  });

  const showAllOrders = () => {
    setOrderStatus(OrderStatusType.All);
  };

  const showReady = () => {
    setOrderStatus(OrderStatusType.Ready);
  };

  const showDone = () => {
    setOrderStatus(OrderStatusType.Done);
  };

  const showCompleteOrders = () => {
    setOrderStatus(OrderStatusType.Complete);
  };

  const showCancelOrders = () => {
    setOrderStatus(OrderStatusType.Canceled);
  };

  return (
    <OptionContainer style={{ y, borderBottom: borderTick }}>
      <PageHeaderMessage header="주문관리" />
      <form onSubmit={searchOrder}>
        <SearchingInput
          register={register}
          registerOptions={{
            max: 3000,
            min: 0,
            onChange: (e) => setSearchTerm(e.currentTarget.value)
          }}
          type="number"
          name="searchOrder"
          placeholder="주문번호를 입력해주세요."
        />
        <button style={{ visibility: "hidden" }}>제출</button>
      </form>
      <AnimateSharedLayout>
        <ButtonContainer>
          <WholeOrderStateButton onClick={showAllOrders}>
            전체
            {orderStatus === "ALL" && <Underline layoutId="underline" />}
          </WholeOrderStateButton>
          <OrderStateButton onClick={showReady}>
            주문접수
            {orderStatus === "READY" && <Underline layoutId="underline" />}
          </OrderStateButton>
          <OrderStateButton onClick={showDone}>
            준비완료
            {orderStatus === "DONE" && <Underline layoutId="underline" />}
          </OrderStateButton>
          <CompleteOrderStateButton onClick={showCompleteOrders}>
            주문완료
            {orderStatus === "COMPLETE" && <Underline layoutId="underline" />}
          </CompleteOrderStateButton>
          <CancelOrderStateButton onClick={showCancelOrders}>
            주문취소
            {orderStatus === "CANCELED" && <Underline layoutId="underline" />}
          </CancelOrderStateButton>
        </ButtonContainer>
      </AnimateSharedLayout>
    </OptionContainer>
  );
};

export default OptionsContainer;
