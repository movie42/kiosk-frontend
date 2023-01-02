import {
  ModalContainer,
  ModalDefaultWrapper,
  TransparentBackground
} from "./styles";

export interface IModalProps {
  strach?: boolean;
  fullBox?: boolean;
  children: React.ReactNode;
}

/**
 * FIXME: 모달 컴포넌트 이름 정하기
 * */

const Modal = ({ strach, fullBox, children }: IModalProps) => {
  return (
    <ModalDefaultWrapper>
      <ModalContainer strach={strach} fullBox={fullBox}>
        {children}
      </ModalContainer>
      <TransparentBackground />
    </ModalDefaultWrapper>
  );
};

export default Modal;
