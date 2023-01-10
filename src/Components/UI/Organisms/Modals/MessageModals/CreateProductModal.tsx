import {
  ConfirmCancelButtons,
  ModalHeader,
  NewModal
} from "../../../Molecules";

interface CreateProductModalProps {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProductModal = ({
  isModal,
  setIsModal,
  setConfirm
}: CreateProductModalProps) => {
  const cancelAddProductItems = () => {
    setConfirm(false);
    setIsModal(false);
  };

  const confirmAddProductItems = () => {
    setConfirm(true);
    setIsModal(false);
  };

  return isModal ? (
    <NewModal
      Header={
        <ModalHeader
          title="상품을 등록 하시겠습니까?"
          subtitle="등록을 하려면 등록하기 버튼을 누르세요."
        />
      }
      Buttons={
        <ConfirmCancelButtons
          cancelProps={{
            onClick: cancelAddProductItems,
            children: "돌아가기",
            className: "cancel-button"
          }}
          confirmProps={{
            onClick: confirmAddProductItems,
            children: "등록하기",
            className: "confirm-button"
          }}
        />
      }
      modalOptions={{ stretch: false }}
    />
  ) : null;
};

export default CreateProductModal;
