import {
  CancelButton,
  ConfirmButton,
  ButtonContainer
} from "../NewModal/styles";

interface ConfirmCancelButtonProps {
  cancelProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
  confirmProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
}
const ConfirmCancelButtons = ({
  cancelProps,
  confirmProps
}: ConfirmCancelButtonProps) => {
  return (
    <ButtonContainer>
      <ConfirmButton {...confirmProps}>{confirmProps.children}</ConfirmButton>
      <CancelButton {...cancelProps}>{cancelProps.children}</CancelButton>
    </ButtonContainer>
  );
};

export default ConfirmCancelButtons;
