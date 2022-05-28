import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InputDefault from "../../Components/Form/InputDefault";
import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";
import { useRecoilState } from "recoil";
import { orderState } from "../../state/orderState";
import { Order, orderList, OrderState } from "../../mockup/orderList";
import OrderStateList from "./OrderStateList";
import { SubTitle1 } from "../../mixin";
import { useForm } from "react-hook-form";

const Wrapper = styled.div``;

const OptionContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr 3fr;
  h2 {
    ${SubTitle1}
  }
`;

const SearchingInput = styled(InputDefault)`
  ${SubTitle1};
  border: 0;
  outline: unset;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const ButtonContainer = styled.div`
  button {
    padding: 0.2rem 1.5rem;
    font-size: 1.6rem;
    margin-left: 0.3rem;
  }
`;

const WholeOrderStateButton = styled(ButtonDefaultStyle)<{
  sortOption: OrderState;
}>`
  background-color: ${(props) =>
    props.sortOption === "all"
      ? props.theme.color.primary600
      : props.theme.color.gray300};
`;
const OrderStateButton = styled(ButtonDefaultStyle)<{ sortOption: OrderState }>`
  background-color: ${(props) =>
    props.sortOption === "order"
      ? props.theme.color.secondary300
      : props.theme.color.gray300};
`;
const CancelOrderStateButton = styled(ButtonDefaultStyle)<{
  sortOption: OrderState;
}>`
  background-color: ${(props) =>
    props.sortOption === "cancel"
      ? props.theme.color.error500
      : props.theme.color.gray300};
`;
const CompleteOrderStateButton = styled(ButtonDefaultStyle)<{
  sortOption: OrderState;
}>`
  background-color: ${(props) =>
    props.sortOption === "complete"
      ? props.theme.color.primary700
      : props.theme.color.gray300};
`;

const OrderStateContainer = styled.div``;

const MangeOrderMain = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<OrderState>(OrderState.ALL);
  const [orders, setOrders] = useRecoilState(orderState);
  const [sortOrders, setSortOrders] = useState<Order[]>([]);
  const { register, handleSubmit } = useForm();

  const showAllOrders = () => {
    setSortOption(OrderState.ALL);
    setSortOrders(orders);
  };

  const showOrders = () => {
    setSortOption(OrderState.ORDER);
  };

  const showCompleteOrders = () => {
    setSortOption(OrderState.COMPLETE);
  };

  const showCancelOrders = () => {
    setSortOption(OrderState.CANCEL);
  };

  const searchOrder = handleSubmit((data) => {
    setSearchTerm(data.searchOrder);
  });

  useEffect(() => {
    setOrders(orderList);
  }, []);

  useEffect(() => {
    if (sortOption === "all") {
      setSortOrders(orders);
      return;
    }
    const selectedOptionList = orders.filter((order) =>
      order.orders.some((value) => value.state === sortOption),
    );

    setSortOrders(selectedOptionList);
  }, [sortOption]);

  useEffect(() => {
    setSortOrders(orders);
  }, [orders]);

  useEffect(() => {
    if (searchTerm === "") {
      setSortOrders(orders);
      return;
    }
    const selectedSearchTermList = orders.filter(
      (order) => Number(order.id) === Number(searchTerm),
    );
    setSortOrders(selectedSearchTermList);
  }, [searchTerm]);

  return (
    <Wrapper>
      <OptionContainer>
        <h2>주문 관리</h2>
        <form onSubmit={searchOrder}>
          <SearchingInput
            register={register}
            registerOptions={{ max: 3000, min: 0 }}
            type="number"
            name="searchOrder"
            placeholder="주문번호를 입력해주세요."
          />
        </form>
        <ButtonContainer>
          <WholeOrderStateButton
            onClick={showAllOrders}
            sortOption={sortOption}
          >
            전체
          </WholeOrderStateButton>
          <OrderStateButton onClick={showOrders} sortOption={sortOption}>
            접수
          </OrderStateButton>
          <CompleteOrderStateButton
            onClick={showCompleteOrders}
            sortOption={sortOption}
          >
            완료
          </CompleteOrderStateButton>
          <CancelOrderStateButton
            onClick={showCancelOrders}
            sortOption={sortOption}
          >
            취소
          </CancelOrderStateButton>
        </ButtonContainer>
      </OptionContainer>
      <OrderStateContainer>
        <OrderStateList orders={sortOrders} />
      </OrderStateContainer>
    </Wrapper>
  );
};

export default MangeOrderMain;
