import React, { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

import Modal from "@/Components/Modals/Modal";
import { useToggleStoreIsAvailableMutation } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { userState } from "@/lib/state/userState";
import useModalHook from "@/lib/hooks/useModalHook";
import {
  CancelButton,
  StartConfirmButton,
  StopConfirmButton,
  Wrapper
} from "./styles";

interface IStoreOpenModalProps {
  itemId?: string;
  isStoreOpen?: boolean;
  isToggleModal: boolean;
  setIsToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IStoreOpenCloseProps {
  handleModal: () => void;
  handleShopOpenState: () => void;
}

const StoreOpenCloseModal = ({
  itemId,
  isToggleModal,
  setIsToggleModal,
  isStoreOpen
}: IStoreOpenModalProps) => {
  const user = useRecoilValue(userState);
  const queryClient = useQueryClient();
  const { mutate: toggleStoreAvailableMutate } =
    useToggleStoreIsAvailableMutation(graphqlReqeustClient(user.accessToken), {
      onSuccess: () => {
        queryClient.invalidateQueries("myStores");
      }
    });

  const { confirm: toggleConfirm, setConfirm: setToggleConfirm } =
    useModalHook();

  const handleModal = () => {
    setIsToggleModal(false);
  };
  const handleShopOpenState = () => {
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
    <Modal>
      <Wrapper>
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
      </Wrapper>
    </Modal>
  ) : null;
};

export default StoreOpenCloseModal;

const CloseStore = ({
  handleModal,
  handleShopOpenState
}: IStoreOpenCloseProps) => {
  return (
    <>
      <div>
        <h1>고객 주문을 중단할까요?</h1>
      </div>
      <div>
        <p>중단하면 고객이 주문을 넣을 수 없습니다.</p>
        <p>언제든지 주문을 다시 시작 할 수 있습니다.</p>
      </div>
      <div>
        <CancelButton onClick={handleModal}>돌아가기</CancelButton>
        <StopConfirmButton onClick={handleShopOpenState}>
          중단하기
        </StopConfirmButton>
      </div>
    </>
  );
};

const OpenStore = ({
  handleModal,
  handleShopOpenState
}: IStoreOpenCloseProps) => {
  return (
    <>
      <div>
        <h1>고객 주문을 시작할까요?</h1>
      </div>
      <div>
        <p>시작하면 고객이 주문을 넣을 수 있습니다.</p>
        <p>언제든지 주문을 중단 할 수 있습니다.</p>
      </div>
      <div>
        <CancelButton onClick={handleModal}>돌아가기</CancelButton>
        <StartConfirmButton onClick={handleShopOpenState}>
          시작하기
        </StartConfirmButton>
      </div>
    </>
  );
};
