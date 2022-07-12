import styled from "styled-components";
import PageHeaderMessage from "../../../Components/PageHeader";
import ButtonDefaultStyle from "../../../Components/Buttons/ButtonDefault";
import { MdAddCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../state/userState";
import {
  useMyStoresQuery,
  useRemoveStoreMutation,
  useToggleStoreIsAvailableMutation
} from "../../../generated/graphql";
import graphqlReqeustClient from "../../../lib/graphqlRequestClient";
import { storesState, storeStateProps } from "../../../state/storeState";
import { Body1, Headline2, Headline3 } from "../../../mixin";
import { useEffect, useState } from "react";
import Modal from "../../../Components/Modals/Modal";
import IsOpenModalChildren from "../Modal/IsOpenModalChildren";
import { useQueryClient } from "react-query";
import { MdDelete, MdCreate } from "react-icons/md";
import useModalHook from "../../../utils/customHooks/useModalHook";
import ToggleButton from "../../../Components/Buttons/ToggleButton";

const Wrapper = styled.div``;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${({ theme }) => theme.device.tablet} {
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }
  ${({ theme }) => theme.device.mobile} {
    margin-bottom: 1rem;
  }
`;

const AddStoreButton = styled(ButtonDefaultStyle)`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.color.fontColorBlack};
  background-color: unset;
  a {
    text-decoration: none;
    padding-bottom: 0.4rem;
    color: ${(props) => props.theme.color.fontColorBlack};
  }
  span {
    margin-left: 0.5rem;
  }
  ${({ theme }) => theme.device.tablet} {
    padding: 0;
  }
  ${({ theme }) => theme.device.mobile} {
    align-self: flex-end;
    font-size: 2rem;
  }
`;

const StoreList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  grid-auto-rows: minmax(15rem, 15rem);
  ${({ theme }) => theme.device.tablet} {
    grid-template-columns: auto;
  }
`;

const Item = styled.li`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: inherit;
  position: relative;
  border: 1px solid ${(props) => props.theme.color.gray300};
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  a {
    text-decoration: none;
    color: ${(props) => props.theme.color.fontColorBlack};
  }
  h3 {
    ${Headline3};
    padding: 0;
    margin: 0;
    ${({ theme }) => theme.device.mobile} {
      font-size: 2.4rem;
    }
  }
  .button-container {
    display: flex;
    justify-content: space-between;
  }
  .various-button-box {
    button {
      cursor: pointer;
      border: 0;
      background-color: unset;
      padding: 0;
      font-size: 2rem;
      color: ${(props) => props.theme.color.gray400};
    }
    .delete-button {
      margin-left: 1.8rem;
    }
  }
`;
const ModalChildren = styled.div`
  display: flex;
  flex-direction: column;
  button {
    cursor: pointer;
    font-size: 2rem;
    border: 0;
    padding: 0.8rem 1.3rem;
    border-radius: 0.5rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    &:not(:first-child) {
      margin-left: 0.8rem;
    }
  }
  .button-container {
    display: flex;
    justify-items: flex-end;
    align-self: flex-end;
  }
  .cancel-button {
    background-color: ${(props) => props.theme.color.gray400};
  }
  .confirm-button {
    background-color: ${(props) => props.theme.color.error700};
  }
`;

interface IAdminMenuProps {
  isActive: boolean;
}

interface IAdminStoreListProps {}

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
  }, [toggleConfirm]);

  useEffect(() => {
    if (deleteConfirm) {
      deleteMutate({ id: Number(deleteItemId) });
      setDeleteItemId(null);
      setIsDeleteModal(false);
    }
  }, [deleteConfirm]);

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
