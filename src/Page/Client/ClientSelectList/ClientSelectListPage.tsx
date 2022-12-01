import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillMinusCircle } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
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
  MenuListItemBox,
  MinusCountButton,
  AddCountButton,
  DeleteButton
} from "./styles";
import { useHandleSelectMenu } from "../hooks";

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
    <MenuListItemBox>
      {item.imageUrl ? (
        <div style={{ padding: "0.5rem 1rem 0.5rem 0" }}>
          <Images src={item.imageUrl} alt={item.name} />
        </div>
      ) : (
        <Noimage />
      )}
      <MenuListItemDetail item={item} />
      <RemoveMenuListItem item={item} />
    </MenuListItemBox>
  );
};

const MenuListItemDetail = ({ item }: MenuListItemProps) => {
  const { handleMinusCount, handleAddCount } = useHandleSelectMenu();

  return (
    <div>
      <h2>{item.name}</h2>
      {item.option && <p>선택옵션: {item.option}</p>}
      <p>
        주문수량:
        <MinusCountButton onClick={() => handleMinusCount(item)}>
          <AiFillMinusCircle />
        </MinusCountButton>
        {item.totalCount}
        <AddCountButton onClick={() => handleAddCount(item)}>
          <IoIosAddCircle />
        </AddCountButton>
      </p>
    </div>
  );
};

const RemoveMenuListItem = ({ item }: MenuListItemProps) => {
  const { handleDelete } = useHandleSelectMenu();

  return (
    <div>
      <p className="price">
        총 가격:&nbsp;
        {translateLocalCurrency(item.totalPrice, "ko-KR")}원
      </p>
      <DeleteButton onClick={() => handleDelete(item)}>삭제하기</DeleteButton>
    </div>
  );
};
