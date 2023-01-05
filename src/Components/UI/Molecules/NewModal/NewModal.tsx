import {
  NewModalContainer,
  ModalDefaultWrapper,
  TransparentBackground
} from "./styles";
export interface NewModalProps {
  Header?: React.ReactNode;
  Model?: React.ReactNode;
  Buttons?: React.ReactNode;
  modalOptions: { stretch: boolean };
}

const NewModal = ({
  Header,
  Model,
  Buttons,
  modalOptions: { stretch: strech }
}: NewModalProps) => {
  return (
    <ModalDefaultWrapper>
      <NewModalContainer modalOptions={{ stretch: strech }}>
        <div>{Header}</div>
        {Model ? <div>{Model}</div> : null}
        <div>{Buttons}</div>
      </NewModalContainer>
      <TransparentBackground />
    </ModalDefaultWrapper>
  );
};

export default NewModal;
