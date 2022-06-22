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
  useStoreQuery,
  useStoresQuery,
} from "../../../generated/graphql";
import graphqlReqeustClient from "../../../lib/graphqlRequestClient";
import { storeState, storeStateProps } from "../../../state/storeState";
import { Headline2 } from "../../../mixin";
import { useEffect, useState } from "react";
import Modal from "../../../Components/Modals/Modal";
import IsOpenModalChildren from "../Modal/IsOpenModalChildren";
import { useQueryClient } from "react-query";
import { MdDelete, MdCreate } from "react-icons/md";
import useModalHook from "../../../utils/customHooks/useModalHook";

const Wrapper = styled.div``;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AddStoreButton = styled(ButtonDefaultStyle)`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.color.fontColorBlack};
  background-color: unset;
  a {
    text-decoration: none;
    color: ${(props) => props.theme.color.fontColorBlack};
  }
  span {
    margin-left: 0.5rem;
  }
`;

const StoreList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  grid-template-rows: minmax(15rem, 15rem);
`;

const Item = styled.li`
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
    ${Headline2};
    padding: 0;
    margin: 0;
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

const ToggleButton: React.FC<
  | IAdminMenuProps
  | React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
> = styled.div<IAdminMenuProps>`
  position: relative;
  z-index: 1;
  width: 3rem;
  height: 1rem;
  cursor: pointer;
  background-color: ${(props) =>
    props.isActive ? props.theme.color.primary600 : props.theme.color.error500};
  border: 0;
  border-radius: 2rem;
  padding: 0.5rem 0.3rem;
  margin: 0.5rem;
  box-shadow: inset 0.1rem 0.15rem 0.2rem
    ${(props) =>
      props.isActive
        ? props.theme.color.primary800
        : props.theme.color.error800};
  &::before {
    position: absolute;
    top: 50%;
    left: ${(props) => (props.isActive ? "unset" : "0.2rem")};
    right: ${(props) => (props.isActive ? "0.2rem" : "unset")};
    transform: translateY(-50%);
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 2rem;
    background-color: ${(props) => props.theme.color.background100};
    content: "";
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
    setIsModal: setIsToggleModal,
  } = useModalHook();

  const {
    id: deleteItemId,
    setId: setDeleteItemId,
    confirm: deleteConfirm,
    setConfirm: setDeleteConfirm,
    isModal: isDeleteModal,
    setIsModal: setIsDeleteModal,
  } = useModalHook();

  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const [store, setStore] = useRecoilState(storeState);
  const queryClient = useQueryClient();

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
          isAvailable: value?.isAvailable,
        }));

        setStore(stores);
      },
    },
  );

  const { mutate: deleteMutate } = useRemoveStoreMutation(
    graphqlReqeustClient(user.accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("myStores");
      },
    },
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
      //TODO: toggle mutation 필요합니다.
      setToggleState((preValue) => !preValue);
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
          <>
            <h1>삭제하시겠습니까?</h1>
            <p>삭제하면 가게에 등록된 모든 정보가 함께 삭제됩니다.</p>
            <div>
              <button
                onClick={() => {
                  setIsDeleteModal(false);
                  setDeleteItemId(null);
                }}
              >
                돌아가기
              </button>
              <button onClick={() => setDeleteConfirm(true)}>삭제</button>
            </div>
          </>
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
              <Link to={`/admin/${user.id}/store/${item.id}/main`}>
                <h3>{item.name}</h3>
              </Link>
              <div className="button-container">
                <div className="toggle-button-box">
                  <ToggleButton
                    isActive={item.isAvailable}
                    onClick={() => {
                      toggleHandler(item.id);
                      setToggleState(item.isAvailable);
                    }}
                  ></ToggleButton>
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
