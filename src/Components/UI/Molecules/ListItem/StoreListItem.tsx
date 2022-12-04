import { MdCreate, MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import {
  StoreDeleteModal,
  StoreOpenCloseModal
} from "@/Components/UI/Organisms";
import { ToggleButton } from "@/Components/UI/Atoms";
import { useModalHook } from "@/lib/hooks";
import { storeStateProps, userState } from "@/lib/state";
import {
  ButtonContainer,
  DeleteButton,
  StoreListItemContainer,
  UpdateButton
} from "./styles";

interface IAdminStoreListItemProps {
  store?: storeStateProps;
}

const StoreListItem = ({ store }: IAdminStoreListItemProps) => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const { isModal: isToggleModal, setIsModal: setIsToggleModal } =
    useModalHook();
  const { isModal: isDeleteModal, setIsModal: setIsDeleteModal } =
    useModalHook();
  const { id, name, isAvailable } = store || {};

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
    <StoreListItemContainer key={id} data-storeid={id}>
      <StoreOpenCloseModal
        itemId={id}
        isStoreOpen={isAvailable}
        isToggleModal={isToggleModal}
        setIsToggleModal={setIsToggleModal}
      />
      <StoreDeleteModal
        itemId={id}
        isDeleteModal={isDeleteModal}
        setIsDeleteModal={setIsDeleteModal}
      />
      <Link to={`/admin/${user.id}/store/${id}/product/main`}>
        <h3>{name}</h3>
      </Link>
      <ButtonContainer>
        <ToggleButton size={4} isActive={isAvailable} onClick={toggleHandler} />
        <div>
          <UpdateButton
            text="수정"
            hidden={false}
            ReactIcon={MdCreate}
            onClick={handleUpdate(id)}
          />
          <DeleteButton
            className="delete-button"
            text="삭제"
            hidden={false}
            ReactIcon={MdDelete}
            onClick={deleteModalHandler}
          />
        </div>
      </ButtonContainer>
    </StoreListItemContainer>
  );
};

export default StoreListItem;
