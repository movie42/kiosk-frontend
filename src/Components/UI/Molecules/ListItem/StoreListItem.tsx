import { MdCreate, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import {
  StoreDeleteModal,
  StoreOpenCloseModal
} from "@/Components/UI/Organisms";
import { ToggleButton } from "@/Components/UI/Atoms";
import { useModalHook } from "@/lib/hooks";
import { storeStateProps, userState } from "@/lib/state";
import {
  ListItemButtonContainer,
  ToggleContainer,
  ListItemButtonWrapper,
  ListItemButton
} from "./styles";
import ListItem from "./ListItem";

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

  const toggleHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsToggleModal(true);
  };

  const deleteModalHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDeleteModal(true);
  };

  const handleUpdate =
    (id: string | undefined) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (id) {
        navigate(`/admin/${user.id}/store/${id}/update`);
      }
    };

  const handleGoToStoreDetail = (id: string | undefined) => () => {
    if (id) {
      navigate(`/admin/${user.id}/store/${id}/product/main`);
    }
  };

  return (
    <ListItem
      key={id}
      itemId={Number(id)}
      name={name}
      onClick={handleGoToStoreDetail(id)}
    >
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
      <ListItemButtonContainer>
        <StoreToggleButton isAvailable={isAvailable} onClick={toggleHandler} />
        <div className="block">
          <ListItemButtonWrapper onClick={handleUpdate(id)}>
            <MdCreate />
            <ListItemButton>수정</ListItemButton>
          </ListItemButtonWrapper>
          <ListItemButtonWrapper
            className="delete-button"
            onClick={deleteModalHandler}
          >
            <MdDelete />
            <ListItemButton>삭제</ListItemButton>
          </ListItemButtonWrapper>
        </div>
      </ListItemButtonContainer>
    </ListItem>
  );
};

export default StoreListItem;

interface ToggleButton {
  isAvailable?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const StoreToggleButton = ({ isAvailable, onClick }: ToggleButton) => {
  return (
    <ToggleContainer>
      <ToggleButton onClick={onClick} isActive={isAvailable} size={5} />
      {isAvailable ? <span>열기</span> : <span>중지</span>}
    </ToggleContainer>
  );
};
