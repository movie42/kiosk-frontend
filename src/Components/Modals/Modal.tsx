import React from "react";
import styled from "styled-components";
import {
  Body1,
  Headline1,
  Headline2,
  Headline3,
  SubTitle2
} from "../../lib/styles/mixin";

const Wrapper = styled.div`
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

const ModalContainer: React.FC<IModalProps> = styled.div<IModalProps>`
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

const TransparentBackground = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.backgroundBlack80};
  overflow: hidden;
`;

interface IModalProps {
  strach?: boolean;
  fullBox?: boolean;
  children: JSX.Element;
}

const Modal = ({ strach, fullBox, children }: IModalProps) => {
  return (
    <Wrapper>
      <ModalContainer strach={strach} fullBox={fullBox}>
        {children}
      </ModalContainer>
      <TransparentBackground />
    </Wrapper>
  );
};

export default Modal;
