import {
  NewModalContainer,
  ModalDefaultWrapper,
  TransparentBackground
} from "./styles";
import ModalButtons from "./ModalButtons";
import ModalHeader from "./ModalHeader";

export interface NewModalProps {
  strach?: boolean;
  fullBox?: boolean;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  confirmFn?: () => void;
  cancelFn?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const NewModal = ({
  strach,
  fullBox,
  title = "",
  subtitle = "",
  confirmText = "",
  cancelText = "",
  confirmFn,
  cancelFn,
  children
}: NewModalProps) => {
  return (
    <ModalDefaultWrapper>
      <NewModalContainer strach={strach} fullBox={fullBox}>
        <ModalHeader title={title} subtitle={subtitle} />
        {children}
        <ModalButtons
          confirmFn={confirmFn}
          cancelFn={cancelFn}
          confirmText={confirmText}
          cancelText={cancelText}
        />
      </NewModalContainer>
      <TransparentBackground />
    </ModalDefaultWrapper>
  );
};

export default NewModal;
