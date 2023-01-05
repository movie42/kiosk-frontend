import React, { useEffect } from "react";

import { useModalHook } from "@/lib/hooks";
import { useUpdateStoreOpenCloseToggle } from "@/Page/Admin/hooks";
import {
  ConfirmCancelButtons,
  ModalHeader,
  NewModal
} from "../../../Molecules";

interface IStoreOpenModalProps {
  itemId?: string;
  isStoreOpen?: boolean;
  isToggleModal: boolean;
  setIsToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

type ButtonType = (e: React.MouseEvent<HTMLButtonElement>) => void;

interface IStoreOpenCloseProps {
  handleModal: ButtonType;
  handleShopOpenState: ButtonType;
}

const StoreOpenCloseModal = ({
  itemId,
  isToggleModal,
  setIsToggleModal,
  isStoreOpen
}: IStoreOpenModalProps) => {
  const { mutate: toggleStoreAvailableMutate } =
    useUpdateStoreOpenCloseToggle();

  const { confirm: toggleConfirm, setConfirm: setToggleConfirm } =
    useModalHook();

  const handleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsToggleModal(false);
  };

  const handleShopOpenState = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setToggleConfirm(true);
    setIsToggleModal(false);
  };

  useEffect(() => {
    if (toggleConfirm && itemId) {
      toggleStoreAvailableMutate({ id: Number(itemId) });
      setToggleConfirm(false);
    }
  }, [toggleConfirm, toggleStoreAvailableMutate, itemId, setToggleConfirm]);

  return isToggleModal ? (
    <>
      {isStoreOpen ? (
        <CloseStore
          handleModal={handleModal}
          handleShopOpenState={handleShopOpenState}
        />
      ) : (
        <OpenStore
          handleModal={handleModal}
          handleShopOpenState={handleShopOpenState}
        />
      )}
    </>
  ) : null;
};

export default StoreOpenCloseModal;

const CloseStore = ({
  handleModal,
  handleShopOpenState
}: IStoreOpenCloseProps) => {
  return (
    <NewModal
      Header={
        <ModalHeader
          title="고객 주문을 중단할까요?"
          subtitle="중단하면 고객이 주문을 넣을 수 없습니다."
        />
      }
      Buttons={
        <ConfirmCancelButtons
          className="button-container"
          cancelProps={{
            onClick: handleModal,
            className: "cancel-button",
            children: "돌아가기"
          }}
          confirmProps={{
            onClick: handleShopOpenState,
            className: "confirm-button",
            children: "중단하기"
          }}
        />
      }
      modalOptions={{ strech: false }}
    />
  );
};

const OpenStore = ({
  handleModal,
  handleShopOpenState
}: IStoreOpenCloseProps) => {
  return (
    <NewModal
      Header={
        <ModalHeader
          title="고객 주문을 시작할까요?"
          subtitle="언제든지 주문을 중단 할 수 있습니다."
        />
      }
      Buttons={
        <ConfirmCancelButtons
          className="button-container"
          cancelProps={{
            onClick: handleModal,
            className: "cancel-button",
            children: "돌아가기"
          }}
          confirmProps={{
            onClick: handleShopOpenState,
            className: "confirm-button",
            children: "시작하기"
          }}
        />
      }
      modalOptions={{ strech: false }}
    />
  );
};
