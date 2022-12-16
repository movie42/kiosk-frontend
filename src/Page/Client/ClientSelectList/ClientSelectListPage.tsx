import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import { Images, Noimage } from "@/Components/UI/Atoms";
import { Modal, PaymentModal } from "@/Components/UI/Organisms";
import { IOrderSelectedItem } from "@/lib/state/productItemState";
import { calculateTotalAmount, translateLocalCurrency } from "@/lib/utils";
import { selectMenuListState } from "@/lib/state";
import { OrderStateBar } from "../OrderStateBar";
import {
  Header,
  MenuListWrapper,
  ResetButtonWrapper,
  ResetButton,
  MenuListItemWrapper,
  MinusCountButton,
  AddCountButton,
  DeleteButton,
  ListItemDetailBox,
  RemoveItemBox,
  CountBox
} from "./styles";
import { useHandleSelectMenu } from "../hooks";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";

const ClientSelectListPage = () => {
  const navigate = useNavigate();
  const { userId, storeId } = useParams();
  const totalSelectMenu = useRecoilValue(selectMenuListState);
  const [isModal, setIsModal] = useState(false);

  const { deleteAll } = useHandleSelectMenu();
  return (
    <>
      {isModal && (
        <Modal strach={true}>
          <PaymentModal setIsModal={setIsModal} />
        </Modal>
      )}
      <Header>
        <h1>주문 목록</h1>
      </Header>
      <MenuListWrapper>
        {totalSelectMenu.map((item) => (
          <MenuListItem
            key={`${item.productId}_${item.optionId || ""}`}
            item={item}
          />
        ))}
      </MenuListWrapper>
      {totalSelectMenu.length !== 0 && (
        <ResetButtonWrapper>
          <ResetButton onClick={() => deleteAll(userId, storeId)}>
            전체삭제
          </ResetButton>
        </ResetButtonWrapper>
      )}
      <OrderStateBar
        totalCount={calculateTotalAmount(totalSelectMenu, "totalCount")}
        totalPrice={calculateTotalAmount(totalSelectMenu, "totalPrice")}
        label="주문하기"
        goBack={() => navigate(`/client/${userId}/${storeId}/menu`)}
        handler={() => setIsModal(() => true)}
      />
    </>
  );
};

export default ClientSelectListPage;

interface MenuListItemProps {
  item: IOrderSelectedItem;
}

const MenuListItem = ({ item }: MenuListItemProps) => {
  return (
    <MenuListItemWrapper>
      {item.imageUrl ? (
        <Images src={item.imageUrl} alt={item.name} />
      ) : (
        <Noimage />
      )}
      <MenuListItemDetail item={item} />
      <RemoveMenuListItem item={item} />
    </MenuListItemWrapper>
  );
};

const MenuListItemDetail = ({ item }: MenuListItemProps) => {
  const { handleMinusCount, handleAddCount } = useHandleSelectMenu();

  return (
    <ListItemDetailBox>
      <h2>{item.name}</h2>
      {item.option && <p>선택옵션: {item.option}</p>}
      <CountBox>
        <span>주문수량:</span>
        <MinusCountButton
          ReactIcon={MdRemoveCircle}
          hidden={true}
          text="수량 감소"
          onClick={() => handleMinusCount(item)}
        />
        {item.totalCount}
        <AddCountButton
          ReactIcon={MdAddCircle}
          hidden={true}
          text="수량 증가"
          onClick={() => handleAddCount(item)}
        />
      </CountBox>
    </ListItemDetailBox>
  );
};

const RemoveMenuListItem = ({ item }: MenuListItemProps) => {
  const { handleDelete } = useHandleSelectMenu();

  return (
    <RemoveItemBox>
      총 가격
      <p className="price">
        {translateLocalCurrency(item.totalPrice, "ko-KR")}원
      </p>
      <DeleteButton onClick={() => handleDelete(item)}>삭제하기</DeleteButton>
    </RemoveItemBox>
  );
};
