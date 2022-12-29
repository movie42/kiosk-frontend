import {
  CancelButton,
  ConfirmButton,
  ButtonContainer
} from "../NewModal/styles";

interface ConfirmCancelButtonProps {
  cancelProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  confirmProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}
const ConfirmCancelButtons = ({
  cancelProps,
  confirmProps
}: ConfirmCancelButtonProps) => {
  return (
    <ButtonContainer>
      {confirmProps && (
        <ConfirmButton {...confirmProps}>{confirmProps.children}</ConfirmButton>
      )}
      {cancelProps && (
        <CancelButton {...cancelProps}>{cancelProps.children}</CancelButton>
      )}
    </ButtonContainer>
  );
};

export default ConfirmCancelButtons;
