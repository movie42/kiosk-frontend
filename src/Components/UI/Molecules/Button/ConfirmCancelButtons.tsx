import {
  CancelButton,
  ConfirmButton,
  ButtonContainer
} from "../NewModal/styles";

interface ConfirmCancelButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  cancelProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  confirmProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}
const ConfirmCancelButtons = ({
  cancelProps,
  confirmProps,
  ...props
}: ConfirmCancelButtonProps) => {
  return (
    <ButtonContainer {...props}>
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
