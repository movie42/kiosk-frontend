import { Images, Noimage } from "@/Components";
import { IOrderSelectedItem } from "@/lib/state/productItemState";
import { translateLocalCurrency } from "@/lib/utils";
import { AiFillMinusCircle } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { useHandleSelectMenu } from "../../hooks";
import {
  AddCountButton,
  DeleteButton,
  MenuListItemBox,
  MinusCountButton
} from "../styles";

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

export default MenuListItem;

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
