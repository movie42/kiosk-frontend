import React from "react";
import { AiFillMinusCircle } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { useRecoilState } from "recoil";
import {
  IOrderSelectedItem,
  selectMenuListState
} from "../../../../lib/state/productItemState";
import { MenuListItemProps } from "../../types";
import { AddCountButton, MinusCountButton } from "../styles";

const MenuListItemDetail: React.FC<MenuListItemProps> = ({ item }) => {
  const [totalSelectMenu, setTotalSelectMenu] =
    useRecoilState(selectMenuListState);

  const handleAddCount = (current: IOrderSelectedItem) => {
    const [selected] = totalSelectMenu.filter(
      (menu) =>
        menu.productId === current.productId && menu.option === current.option
    );

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

export default MenuListItemDetail;
