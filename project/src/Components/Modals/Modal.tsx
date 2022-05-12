import React from "react";
import styled from "styled-components";
import { Body1, Headline1, Headline2 } from "../../mixin";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const ModalContainer: React.FC<IModalProps> = styled.div<IModalProps>`
  width: 40rem;
  height: ${(props) => props.strach && "40rem"};
  background-color: ${(props) => props.theme.color.background100};
  border-radius: 1rem;
  overflow-y: auto;
  padding: 2rem;
  h1 {
    ${Headline1};
  }
  h2 {
    ${Headline2};
    word-break: keep-all;
    margin-top: 0.7rem;
  }
  p {
    ${Body1};
    margin-top: 0.7rem;
  }
`;

const ModalWrapper = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.85;
  background-color: ${(props) => props.theme.color.background100};
  overflow: hidden;
`;

interface IModalProps {
  strach?: boolean;
  children: JSX.Element;
}

const Modal = ({ strach, children }: IModalProps) => {
  return (
    <Wrapper>
      <ModalContainer strach={strach}>{children}</ModalContainer>
      <ModalWrapper />
    </Wrapper>
  );
};

export default Modal;