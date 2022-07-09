import { AnimateSharedLayout, motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";
import InputDefault from "../../Components/Form/InputDefault";
import PageHeaderMessage from "../../Components/PageHeader";
import { Headline2, Headline3 } from "../../mixin";
import { orderStatusState, OrderStatusType } from "../../state/orderState";

const OptionContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr 3fr;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  padding-bottom: 1.5rem;
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
}

const OptionsContainer = ({ setSearchTerm }: IOptionsContainerProps) => {
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

  // useEffect(() => {
  //   setSortOrders(orders);
  // }, [orders]);

  // useEffect(() => {
  //   if (searchTerm === "") {
  //     setSortOrders(orders);
  //     return;
  //   }
  //   const selectedSearchTermList = orders.filter(
  //     (order) => Number(order.number) === Number(searchTerm),
  //   );
  //   setSortOrders(selectedSearchTermList);
  // }, [searchTerm]);

  return (
    <OptionContainer>
      <PageHeaderMessage header="주문관리" />
      <form onSubmit={searchOrder}>
        <SearchingInput
          register={register}
          registerOptions={{ max: 3000, min: 0 }}
          type="number"
          name="searchOrder"
          placeholder="주문번호를 입력해주세요."
        />
      </form>
      <AnimateSharedLayout>
        <ButtonContainer>
          <WholeOrderStateButton onClick={showAllOrders}>
            전체
            {orderStatus === "ALL" && <Underline layoutId="underline" />}
          </WholeOrderStateButton>
          <OrderStateButton onClick={showReady}>
            접수
            {orderStatus === "READY" && <Underline layoutId="underline" />}
          </OrderStateButton>
          <OrderStateButton onClick={showDone}>
            수령대기
            {orderStatus === "DONE" && <Underline layoutId="underline" />}
          </OrderStateButton>
          <CompleteOrderStateButton onClick={showCompleteOrders}>
            완료
            {orderStatus === "COMPLETE" && <Underline layoutId="underline" />}
          </CompleteOrderStateButton>
          <CancelOrderStateButton onClick={showCancelOrders}>
            취소
            {orderStatus === "CANCELED" && <Underline layoutId="underline" />}
          </CancelOrderStateButton>
        </ButtonContainer>
      </AnimateSharedLayout>
    </OptionContainer>
  );
};

export default OptionsContainer;
