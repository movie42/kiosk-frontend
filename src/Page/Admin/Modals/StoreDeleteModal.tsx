import React, { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import Modal from "../../../Components/Modals/Modal";
import { useRemoveStoreMutation } from "../../../lib/generated/graphql";
import graphqlReqeustClient from "../../../lib/graphqlRequestClient";
import { userState } from "../../../lib/state/userState";
import useModalHook from "../../../lib/utils/customHooks/useModalHook";
import { ModalChildren } from "../Store/styles";

interface IStoreDeleteModalProps {
  itemId?: string;
  isDeleteModal: boolean;
  setIsDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const StoreDeleteModal = ({
  itemId,
  isDeleteModal,
  setIsDeleteModal
}: IStoreDeleteModalProps) => {
  const user = useRecoilValue(userState);
  const queryClient = useQueryClient();
  const { mutate: deleteMutate } = useRemoveStoreMutation(
    graphqlReqeustClient(user.accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("myStores");
      }
    }
  );
  const { confirm: deleteConfirm, setConfirm: setDeleteConfirm } =
    useModalHook();
  const handleDeleteConfirm = () => setDeleteConfirm(true);
  const handleCancel = () => {
    setIsDeleteModal(false);
  };
  useEffect(() => {
    if (deleteConfirm) {
      deleteMutate({ id: Number(itemId) });
      setIsDeleteModal(false);
    }
  }, [deleteConfirm, deleteMutate, itemId, setIsDeleteModal]);

  return isDeleteModal ? (
    <Modal>
      <ModalChildren>
        <h1>삭제하시겠습니까?</h1>
        <p>삭제하면 가게에 등록된 모든 정보가 함께 삭제됩니다.</p>
        <div className="button-container">
          <button className="cancel-button" onClick={handleCancel}>
            돌아가기
          </button>
          <button className="confirm-button" onClick={handleDeleteConfirm}>
            삭제하기
          </button>
        </div>
      </ModalChildren>
    </Modal>
  ) : null;
};

export default StoreDeleteModal;
