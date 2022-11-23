import { MdAddCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

import { MdDelete, MdCreate } from "react-icons/md";

import { userState } from "@/lib/state/userState";
import { useMyStoresQuery } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { storesState, storeStateProps } from "@/lib/state";
import PageHeaderMessage from "@/Components/Layouts/Header/PageHeader";

import { StoreOpenCloseModal, StoreDeleteModal } from "../Modals";
import useModalHook from "@/lib/hooks/useModalHook";
import ToggleButton from "@/Components/Buttons/ToggleButton";
import { AddStoreButton, Header, Item, StoreList, Wrapper } from "./styles";

const AdminStoreList = () => {
  const [store, setStore] = useRecoilState(storesState);
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const { isModal: isToggleModal, setIsModal: setIsToggleModal } =
    useModalHook();
  const { isModal: isDeleteModal, setIsModal: setIsDeleteModal } =
    useModalHook();

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

  const toggleHandler = () => {
    setIsToggleModal(true);
  };

  const deleteModalHandler = () => {
    setIsDeleteModal(true);
  };

  return (
    <Wrapper>
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
              <StoreOpenCloseModal
                itemId={item.id}
                isStoreOpen={item.isAvailable}
                isToggleModal={isToggleModal}
                setIsToggleModal={setIsToggleModal}
              />
              <StoreDeleteModal
                itemId={item.id}
                isDeleteModal={isDeleteModal}
                setIsDeleteModal={setIsDeleteModal}
              />
              <Link to={`/admin/${user.id}/store/${item.id}/product/main`}>
                <h3>{item.name}</h3>
              </Link>
              <div className="button-container">
                <div className="toggle-button-box">
                  <ToggleButton
                    size={4}
                    isActive={item.isAvailable}
                    onClick={toggleHandler}
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
                    onClick={deleteModalHandler}
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
