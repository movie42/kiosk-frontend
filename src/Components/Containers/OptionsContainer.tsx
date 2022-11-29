import React from "react";
import {
  AnimateSharedLayout,
  motion,
  useTransform,
  useViewportScroll
} from "framer-motion";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { ButtonDefault, InputDefault, PageHeader } from "@/Components";
import { Headline2, Headline3 } from "@/lib/styles/mixin";
import { orderStatusState } from "@/lib/state";
import type { OrderStatusValue } from "@/lib/state/interface";
import ManageOrderStatusButton from "@/Components/Buttons/ManageOrderStatusButton";

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
  const setOrderStatus = useSetRecoilState(orderStatusState);

  const searchOrder = handleSubmit((data) => {
    setSearchTerm(data.searchOrder);
  });

  const handleStatus = (statue: OrderStatusValue) => () => {
    setOrderStatus(statue);
  };

  return (
    <OptionContainer style={{ y, borderBottom: borderTick }}>
      <PageHeader header="주문관리" />
      <form onSubmit={searchOrder}>
        <SearchingInput
          type="number"
          placeholder="주문번호를 입력해주세요."
          {...register("searchOrder", {
            max: 3000,
            min: 0,
            onChange: (e) => setSearchTerm(e.currentTarget.value)
          })}
        />
        <ButtonDefault>검색</ButtonDefault>
      </form>
      <AnimateSharedLayout>
        <ButtonContainer>
          <ManageOrderStatusButton
            statusCheck="ALL"
            onClick={handleStatus("ALL")}
          >
            전체
          </ManageOrderStatusButton>
          <ManageOrderStatusButton
            statusCheck="READY"
            onClick={handleStatus("READY")}
          >
            주문접수
          </ManageOrderStatusButton>
          <ManageOrderStatusButton
            statusCheck="COMPLETE"
            onClick={handleStatus("COMPLETE")}
          >
            준비완료
          </ManageOrderStatusButton>
          <ManageOrderStatusButton
            statusCheck="DONE"
            onClick={handleStatus("DONE")}
          >
            주문완료
          </ManageOrderStatusButton>
          <ManageOrderStatusButton
            statusCheck="CANCELED"
            onClick={handleStatus("CANCELED")}
          >
            주문취소
          </ManageOrderStatusButton>
        </ButtonContainer>
      </AnimateSharedLayout>
    </OptionContainer>
  );
};

export default OptionsContainer;
