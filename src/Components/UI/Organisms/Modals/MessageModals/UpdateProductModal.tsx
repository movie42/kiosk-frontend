import {
  ConfirmCancelButtons,
  ModalHeader,
  NewModal
} from "../../../Molecules";

interface UpdateProductModalProps {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateProductModal = ({
  isModal,
  setIsModal,
  setConfirm
}: UpdateProductModalProps) => {
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
      modalOptions={{ strech: false }}
      Header={<ModalHeader title="상품을 업데이트 하시겠습니까?" />}
      Buttons={
        <ConfirmCancelButtons
          className="button-container"
          cancelProps={{
            className: "cancel-button",
            onClick: cancelAddProductItems,
            children: "돌아가기"
          }}
          confirmProps={{
            className: "confirm-button",
            onClick: confirmAddProductItems,
            children: "업데이트"
          }}
        />
      }
    />
  ) : null;
};

export default UpdateProductModal;
