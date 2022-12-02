import styled from "styled-components";

import {
  Body1,
  Headline1,
  Headline2,
  Headline3,
  SubTitle2
} from "@/lib/styles/mixin";
import ButtonDefaultStyle from "@/Components/UI/Atoms/Buttons/ButtonDefault";
import { IModalProps } from "./Modal";

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
export const CancelButton = styled(ButtonDefaultStyle)``;
export const StopConfirmButton = styled(ButtonDefaultStyle)`
  background-color: ${(props) => props.theme.color.error500};
`;
export const StartConfirmButton = styled(ButtonDefaultStyle)`
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
