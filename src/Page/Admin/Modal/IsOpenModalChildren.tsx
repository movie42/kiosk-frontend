import React from "react";
import styled from "styled-components";
import ButtonDefaultStyle from "../../../Components/Buttons/ButtonDefault";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr, 2fr, 1fr;
  div {
    &:nth-child(2) {
      padding: 0.8rem 0 2rem;
    }
    &:last-child {
      display: flex;
      justify-content: flex-end;
      button {
        &:nth-child(2) {
          margin-left: 1rem;
        }
      }
    }
  }
`;
const CancelButton = styled(ButtonDefaultStyle)``;
const StopConfirmButton = styled(ButtonDefaultStyle)`
  background-color: ${(props) => props.theme.color.error500};
`;
const StartConfirmButton = styled(ButtonDefaultStyle)`
  background-color: ${(props) => props.theme.color.primary600};
`;

interface IIsOpenModalChildrenProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  toggleState: boolean | undefined;
}

const IsOpenModalChildren = ({
  setModal,
  setConfirm,
  toggleState
}: IIsOpenModalChildrenProps) => {
  const handleModal = () => {
    setModal(false);
  };
  const handleShopOpenState = () => {
    setConfirm(true);
    setModal(false);
  };
  return toggleState ? (
    <Wrapper>
      <div>
        <h1>고객 주문을 중단할까요?</h1>
      </div>
      <div>
        <p>중단하면 고객이 주문을 넣을 수 없습니다.</p>
        <p>언제든지 주문을 다시 시작 할 수 있습니다.</p>
      </div>
      <div>
        <CancelButton onClick={handleModal}>돌아가기</CancelButton>
        <StopConfirmButton onClick={handleShopOpenState}>
          중단하기
        </StopConfirmButton>
      </div>
    </Wrapper>
  ) : (
    <Wrapper>
      <div>
        <h1>고객 주문을 시작할까요?</h1>
      </div>
      <div>
        <p>시작하면 고객이 주문을 넣을 수 있습니다.</p>
        <p>언제든지 주문을 중단 할 수 있습니다.</p>
      </div>
      <div>
        <CancelButton onClick={handleModal}>돌아가기</CancelButton>
        <StartConfirmButton onClick={handleShopOpenState}>
          시작하기
        </StartConfirmButton>
      </div>
    </Wrapper>
  );
};

export default IsOpenModalChildren;
