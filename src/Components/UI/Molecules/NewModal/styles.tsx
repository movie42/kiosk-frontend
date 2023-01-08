import styled, { css } from "styled-components";

import {
  Body1,
  Headline1,
  Headline2,
  Headline3,
  SubTitle2
} from "@/lib/styles/mixin";
import { BasicSquareButton } from "@/Components/UI/Atoms";
import { NewModalProps } from "./NewModal";

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

export const NewModalContainer = styled.div<NewModalProps>`
  display: grid;
  background-color: ${(props) => props.theme.color.background100};
  border-radius: 1rem;
  overflow-y: auto;
  padding: 0 2rem;
  ${(props) => {
    if (props.modalOptions.stretch) {
      return css`
        grid-template-rows: 1fr 2fr 0.5fr;
        height: 60rem;
      `;
    }
    return css`
      grid-template-rows: 2fr 1fr;
      min-height: 20rem;
      min-width: 40vw;
    `;
  }}
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

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-self: flex-end;
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
`;

export const ConfirmButton = styled(BasicSquareButton)`
  background-color: ${(props) => props.theme.color.primary800};
`;

export const CancelButton = styled(BasicSquareButton)``;
export const BasicButton = styled(BasicSquareButton)``;
