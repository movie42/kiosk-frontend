import {
  ModalContainer,
  ModalDefaultWrapper,
  TransparentBackground
} from "./styles";

export interface IModalProps {
  strach?: boolean;
  fullBox?: boolean;
  children: JSX.Element;
}

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
