import { CancelButton, ConfirmButton, ModalButtonContainer } from "./styles";

interface ModalButtonsProps {
  cancelProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
  confirmProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
}
const ModalButtons = ({ cancelProps, confirmProps }: ModalButtonsProps) => {
  return (
    <ModalButtonContainer>
      <ConfirmButton {...confirmProps}>{confirmProps.children}</ConfirmButton>
      <CancelButton {...cancelProps}>{cancelProps.children}</CancelButton>
    </ModalButtonContainer>
  );
};

export default ModalButtons;
