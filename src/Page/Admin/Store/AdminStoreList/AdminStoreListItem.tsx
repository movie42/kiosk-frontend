import { MdCreate, MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import {
  StoreDeleteModal,
  StoreOpenCloseModal,
  ToggleButton
} from "@/Components";
import { useModalHook } from "@/lib/hooks";
import { storeStateProps, userState } from "@/lib/state";
import { ButtonContainer, DeleteButton, Item, UpdateButton } from "../styles";

interface IAdminStoreListItemProps {
  store: storeStateProps[];
}

const AdminStoreListItem = ({ store }: IAdminStoreListItemProps) => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const { isModal: isToggleModal, setIsModal: setIsToggleModal } =
    useModalHook();
  const { isModal: isDeleteModal, setIsModal: setIsDeleteModal } =
    useModalHook();

  const toggleHandler = () => {
    setIsToggleModal(true);
  };

  const deleteModalHandler = () => {
    setIsDeleteModal(true);
  };

  const handleUpdate = (id: string | undefined) => () => {
    navigate(`/admin/${user.id}/store/${id}/update`);
  };

  return (
    <>
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
          <ButtonContainer>
            <ToggleButton
              size={4}
              isActive={item.isAvailable}
              onClick={toggleHandler}
            />
            <div className="various-button-box">
              <UpdateButton onClick={handleUpdate(item.id)}>
                <MdCreate />
                <span>수정</span>
              </UpdateButton>
              <DeleteButton
                className="delete-button"
                onClick={deleteModalHandler}
              >
                <MdDelete />
                <span>삭제</span>
              </DeleteButton>
            </div>
          </ButtonContainer>
        </Item>
      ))}
    </>
  );
};

export default AdminStoreListItem;
