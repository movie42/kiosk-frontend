import { CancelButton, ConfirmButton, ModalButtonContainer } from "./styles";

interface ModalButtonsProps {
  confirmFn?: () => void;
  cancelFn?: () => void;
  confirmText?: string;
  cancelText?: string;
}
const ModalButtons = ({
  confirmFn,
  cancelFn,
  confirmText,
  cancelText
}: ModalButtonsProps) => {
  return (
    <ModalButtonContainer>
      {confirmFn && confirmText && (
        <ConfirmButton onClick={confirmFn}>{confirmText}</ConfirmButton>
      )}
      {cancelFn && cancelText && (
        <CancelButton onClick={cancelFn}>{cancelText}</CancelButton>
      )}
    </ModalButtonContainer>
  );
};

export default ModalButtons;
