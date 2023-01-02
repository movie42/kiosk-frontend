import React, { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

import { useRemoveStoreMutation } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { userState } from "@/lib/state";
import { useModalHook } from "@/lib/hooks";
import {
  ConfirmCancelButtons,
  ModalHeader,
  NewModal
} from "../../../Molecules";

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
    <NewModal
      modalOptions={{ strech: false }}
      Header={
        <ModalHeader
          title="삭제하시겠습니까?"
          subtitle="삭제하면 가게에 등록된 모든 정보가 함께 삭제됩니다."
        />
      }
      Buttons={
        <ConfirmCancelButtons
          className="button-container"
          confirmProps={{
            onClick: handleDeleteConfirm,
            className: "confirm-button",
            children: "삭제하기"
          }}
          cancelProps={{
            onClick: handleCancel,
            className: "confirm-button",
            children: "돌아가기"
          }}
        />
      }
    />
  ) : null;
};

export default StoreDeleteModal;
