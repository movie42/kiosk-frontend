import { IconType } from "react-icons";
import { ButtonItemContainer, IconButtonContainer } from "./styles";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ReactIcon: IconType;
  text: string;
  hidden: boolean;
}

const IconButton = ({ ReactIcon, text, hidden, ...props }: IconButtonProps) => {
  return (
    <IconButtonContainer {...props}>
      <ButtonItemContainer hidden={hidden}>
        <ReactIcon />
        <span>{text}</span>
      </ButtonItemContainer>
    </IconButtonContainer>
  );
};

export default IconButton;
