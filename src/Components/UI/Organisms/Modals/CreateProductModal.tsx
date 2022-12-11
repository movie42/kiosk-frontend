import Modal from "./Modal";
import { ModalButtonContainer, ModalChildren } from "./styles";

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
    <Modal strach={false}>
      <ModalChildren>
        <h2>상품을 등록 하시겠습니까?</h2>
        <ModalButtonContainer>
          <button
            className="modal-cancel-button"
            onClick={cancelAddProductItems}
          >
            돌아가기
          </button>
          <button
            className="modal-confirm-button"
            onClick={confirmAddProductItems}
          >
            등록하기
          </button>
        </ModalButtonContainer>
      </ModalChildren>
    </Modal>
  ) : null;
};

export default CreateProductModal;
