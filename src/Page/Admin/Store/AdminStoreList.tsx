import PageHeaderMessage from "../../../Components/PageHeader";

import { MdAddCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../lib/state/userState";
import {
  useMyStoresQuery,
  useRemoveStoreMutation,
  useToggleStoreIsAvailableMutation
} from "../../../lib/generated/graphql";
import graphqlReqeustClient from "../../../lib/graphqlRequestClient";
import { storesState, storeStateProps } from "../../../lib/state/storeState";

import { useEffect, useState } from "react";
import Modal from "../../../Components/Modals/Modal";
import IsOpenModalChildren from "../Modal/IsOpenModalChildren";
import { useQueryClient } from "react-query";
import { MdDelete, MdCreate } from "react-icons/md";
import useModalHook from "../../../lib/utils/customHooks/useModalHook";
import ToggleButton from "../../../Components/Buttons/ToggleButton";
import {
  AddStoreButton,
  Header,
  Item,
  ModalChildren,
  StoreList,
  Wrapper
} from "./styles";

const AdminStoreList = () => {
  const [toggleState, setToggleState] = useState<boolean | undefined>(false);
  const {
    id: toggleId,
    setId: setToggleId,
    confirm: toggleConfirm,
    setConfirm: setToggleConfirm,
    isModal: isToggleModal,
    setIsModal: setIsToggleModal
  } = useModalHook();

  const {
    id: deleteItemId,
    setId: setDeleteItemId,
    confirm: deleteConfirm,
    setConfirm: setDeleteConfirm,
    isModal: isDeleteModal,
    setIsModal: setIsDeleteModal
  } = useModalHook();

  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const [store, setStore] = useRecoilState(storesState);
  const queryClient = useQueryClient();

  const { mutate: toggleStoreAvailableMutate } =
    useToggleStoreIsAvailableMutation(graphqlReqeustClient(user.accessToken), {
      onSuccess: () => {
        queryClient.invalidateQueries("myStores");
      }
    });

  const { isSuccess: isStoreRequestSuccess } = useMyStoresQuery(
    graphqlReqeustClient(user.accessToken),
    undefined,
    {
      onSuccess: (data) => {
        const stores = data.myStores.map<storeStateProps>((value) => ({
          id: value?.id,
          name: value?.name,
          code: value?.code,
          address: value?.address,
          phone: value?.phone,
          isAvailable: value?.isAvailable
        }));

        setStore(stores);
      }
    }
  );

  const { mutate: deleteMutate } = useRemoveStoreMutation(
    graphqlReqeustClient(user.accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("myStores");
      }
    }
  );
  const toggleHandler = (id: string | undefined) => {
    if (id) {
      setToggleId(id);
    }
    setIsToggleModal(true);
  };

  const deleteModalHandler = (id: string | undefined) => {
    if (id) {
      setDeleteItemId(id);
    }
    setIsDeleteModal(true);
  };

  useEffect(() => {
    if (toggleConfirm) {
      toggleStoreAvailableMutate({ id: Number(toggleId) });
      setToggleConfirm(false);
      setToggleId(null);
    }
  }, [
    toggleConfirm,
    toggleStoreAvailableMutate,
    setToggleConfirm,
    setToggleId,
    toggleId
  ]);

  useEffect(() => {
    if (deleteConfirm) {
      deleteMutate({ id: Number(deleteItemId) });
      setDeleteItemId(null);
      setIsDeleteModal(false);
    }
  }, [
    deleteConfirm,
    deleteMutate,
    setDeleteItemId,
    setIsDeleteModal,
    deleteItemId
  ]);

  return (
    <Wrapper>
      {isToggleModal && (
        <Modal>
          <IsOpenModalChildren
            toggleState={toggleState}
            setModal={setIsToggleModal}
            setConfirm={setToggleConfirm}
          />
        </Modal>
      )}
      {isDeleteModal && (
        <Modal>
          <ModalChildren>
            <h1>삭제하시겠습니까?</h1>
            <p>삭제하면 가게에 등록된 모든 정보가 함께 삭제됩니다.</p>
            <div className="button-container">
              <button
                className="cancel-button"
                onClick={() => {
                  setIsDeleteModal(false);
                  setDeleteItemId(null);
                }}
              >
                돌아가기
              </button>
              <button
                className="confirm-button"
                onClick={() => setDeleteConfirm(true)}
              >
                삭제하기
              </button>
            </div>
          </ModalChildren>
        </Modal>
      )}
      <Header>
        <PageHeaderMessage
          header="가게목록"
          message={
            store.length !== 0
              ? "가게를 선택하세요."
              : "아직 등록된 가게가 없습니다."
          }
        />
        <AddStoreButton>
          <MdAddCircle />
          <Link to={`/admin/${user.id}/store/create`}>가게등록</Link>
        </AddStoreButton>
      </Header>

      {isStoreRequestSuccess && (
        <StoreList>
          {store.map((item) => (
            <Item key={item.id}>
              <Link to={`/admin/${user.id}/store/${item.id}/product/main`}>
                <h3>{item.name}</h3>
              </Link>
              <div className="button-container">
                <div className="toggle-button-box">
                  <ToggleButton
                    size={4}
                    isActive={item.isAvailable}
                    onClick={() => {
                      toggleHandler(item.id);
                      setToggleState(item.isAvailable);
                    }}
                  />
                </div>
                <div className="various-button-box">
                  <button
                    className="update-button"
                    onClick={() =>
                      navigate(`/admin/${user.id}/store/${item.id}/update`)
                    }
                  >
                    <MdCreate />
                    <span>수정</span>
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteModalHandler(item.id)}
                  >
                    <MdDelete />
                    <span>삭제</span>
                  </button>
                </div>
              </div>
            </Item>
          ))}
        </StoreList>
      )}
    </Wrapper>
  );
};

export default AdminStoreList;
