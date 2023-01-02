import styled from "styled-components";

import {
  Body1,
  Headline1,
  Headline2,
  Headline3,
  SubTitle2
} from "@/lib/styles/mixin";
import BasicSquareButtonStyle from "@/Components/UI/Atoms/Buttons/BasicSquareButton";
import Modal, { IModalProps } from "./Modal";
import { ModalStatusKey } from "../interface";
import { OrderStatusType } from "@/lib/generated/graphql";

export const OrderModalContainer = styled(Modal)``;

export const OrderModalWrapper = styled.div`
  display: grid;
  grid-template-rows: 0.8fr 3fr 0.05fr;
  ${({ theme }) => theme.device.mobile} {
    grid-template-rows: 1fr 5fr 0.5fr;
  }
`;

export const OrderStateContainer = styled.div`
  display: flex;
  align-self: flex-end;
  justify-content: flex-end;
  align-items: center;
`;
interface ButtonState {
  status?: ModalStatusKey;
}

export const ButtonContainer = styled.div<ButtonState>`
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

export const PriceContainer = styled.div`
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

export const ModalItemContainer = styled.ul`
  margin: 1rem 0;
  li {
    margin-bottom: 0.8rem;
  }
`;

export const MordalItem = styled.li`
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

export const ModalChildren = styled.div`
  display: flex;
  flex-direction: column;
  button {
    cursor: pointer;
    font-size: 2rem;
    border: 0;
    padding: 0.8rem 1.3rem;
    border-radius: 0.5rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    &:not(:first-child) {
      margin-left: 0.8rem;
    }
  }
  .button-container {
    display: flex;
    justify-items: flex-end;
    align-self: flex-end;
  }
  .cancel-button {
    background-color: ${(props) => props.theme.color.gray400};
  }
  .confirm-button {
    background-color: ${(props) => props.theme.color.error700};
  }
`;

export const ModalDefaultWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 30;
`;

export const ModalContainer = styled.div<IModalProps>`
  display: flex;
  flex-direction: column;
  width: 60rem;
  height: ${(props) => props.strach && "60rem"};
  background-color: ${(props) => props.theme.color.background100};
  border-radius: 1rem;
  overflow-y: auto;
  padding: ${(props) => (props.fullBox ? 0 : "2rem")};
  h1 {
    ${Headline1};
    line-height: unset;
  }
  h2 {
    ${Headline2};
    word-break: keep-all;
    margin-top: 0.7rem;
  }
  h3 {
    ${Headline3};
  }
  button {
    ${SubTitle2}
  }
  p {
    ${Body1};
    margin-top: 0.7rem;
  }
`;

export const TransparentBackground = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.backgroundBlack80};
  overflow: hidden;
`;

export const Wrapper = styled.div`
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
export const CancelButton = styled(BasicSquareButtonStyle)``;
export const StopConfirmButton = styled(BasicSquareButtonStyle)`
  background-color: ${(props) => props.theme.color.error500};
`;
export const StartConfirmButton = styled(BasicSquareButtonStyle)`
  background-color: ${(props) => props.theme.color.primary600};
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  align-self: flex-end;
  button {
    cursor: pointer;
    font-size: 2rem;
    border: 0;
    padding: 0.8rem 1.3rem;
    border-radius: 0.5rem;
    color: ${(props) => props.theme.color.fontColorWhite};

    &.modal-cancel-button {
      background-color: ${(props) => props.theme.color.gray200};
    }

    &.modal-confirm-button {
      background-color: ${(props) => props.theme.color.primary600};
    }

    &:not(:first-child) {
      margin-left: 0.8rem;
    }
  }
`;
