/* eslint-disable */

import { AiFillMinusCircle } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { useRecoilState } from "recoil";
import { Images, Noimage } from "../../../Components";
import {
  IOrderSelectedItem,
  selectMenuListState
} from "../../../lib/state/productItemState";
import { translateLocalCurrency } from "../../../lib/utils/helper/translateLocalCurrency";
import { MenuListItemProps } from "../types";
import {
  AddCountButton,
  DeleteButton,
  MinusCountButton,
  MenuListItemBox
} from "./styles";

const MenuListItem: React.FC<MenuListItemProps> = ({ item }) => {
  const [totalSelectMenu, setTotalSelectMenu] =
    useRecoilState(selectMenuListState);

  const handleAddCount = (current: IOrderSelectedItem) => {
    const [selected] = totalSelectMenu.filter(
      (menu) =>
        menu.productId === current.productId && menu.option === current.option
    );
    console.log(selected);

    const newCount = selected.totalCount + 1;

    setTotalSelectMenu((item) =>
      [
        ...item.filter((el) => el !== selected),
        {
          ...selected,
          totalCount: newCount,
          totalPrice: selected.price * newCount
        }
      ].sort((a: any, b: any) => {
        if (a.productId === b.productId) {
          return a?.option > b?.option ? 1 : -1;
        }
        return a.productId - b.productId;
      })
    );
  };

  const handleMinusCount = (current: IOrderSelectedItem) => {
    const [selected] = totalSelectMenu.filter(
      (menu) =>
        menu.productId === current.productId && menu.option === current.option
    );

    console.log(selected);
    const newCount = selected.totalCount - 1;

    if (newCount < 1) {
      return;
    }

    setTotalSelectMenu((item) =>
      [
        ...item.filter((el) => el !== selected),
        {
          ...selected,
          totalCount: newCount,
          totalPrice: selected.price * newCount
        }
      ].sort((a: any, b: any) => {
        if (a.productId === b.productId) {
          return a?.option > b?.option ? 1 : -1;
        }
        return a.productId - b.productId;
      })
    );
  };

  const handleDelete = (current: IOrderSelectedItem) => {
    const [filtered] = totalSelectMenu.filter(
      (el) => el.productId === current.productId && el.option === current.option
    );
    const isDelete = window.confirm("정말 삭제하시겠습니까?");
    if (isDelete)
      setTotalSelectMenu((item) => [...item.filter((el) => el !== filtered)]);
  };

  return (
    <MenuListItemBox>
      {item.imageUrl ? (
        <div style={{ padding: "0.5rem 1rem 0.5rem 0" }}>
          <Images src={item.imageUrl} alt={item.name} />
        </div>
      ) : (
        <Noimage />
      )}
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
      <div>
        <p className="price">
          총 가격:&nbsp;
          {translateLocalCurrency(item.totalPrice, "ko-KR")}원
        </p>
        <DeleteButton onClick={() => handleDelete(item)}>삭제하기</DeleteButton>
      </div>
    </MenuListItemBox>
  );
};

export default MenuListItem;
