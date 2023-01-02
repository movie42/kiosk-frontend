import { ConfirmCancelButtons } from "../Button";
import { StatusContainer } from "./styles";

interface StatusBarProps {
  statusMessage?: string;
  cancelButtonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
  confirmButtonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const StatusBar = ({
  cancelButtonProps,
  confirmButtonProps,
  statusMessage
}: StatusBarProps) => {
  return (
    <StatusContainer>
      <div>
        <h3>{statusMessage}</h3>
      </div>
      <ConfirmCancelButtons
        className="button-container"
        cancelProps={cancelButtonProps}
        confirmProps={confirmButtonProps}
      />
    </StatusContainer>
  );
};

export default StatusBar;
