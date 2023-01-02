import {
  NewModalContainer,
  ModalDefaultWrapper,
  TransparentBackground
} from "./styles";
export interface NewModalProps {
  Header?: React.ReactNode;
  Model?: React.ReactNode;
  Buttons?: React.ReactNode;
  modalOptions: { strech: boolean };
}

const NewModal = ({
  Header,
  Model,
  Buttons,
  modalOptions: { strech }
}: NewModalProps) => {
  return (
    <ModalDefaultWrapper>
      <NewModalContainer modalOptions={{ strech }}>
        <div>{Header}</div>
        {Model ? <div>{Model}</div> : null}
        <div>{Buttons}</div>
      </NewModalContainer>
      <TransparentBackground />
    </ModalDefaultWrapper>
  );
};

export default NewModal;
