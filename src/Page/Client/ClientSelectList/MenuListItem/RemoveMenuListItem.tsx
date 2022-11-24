import React from "react";
import { useRecoilState } from "recoil";
import {
  IOrderSelectedItem,
  selectMenuListState
} from "../../../../lib/state/productItemState";
import { translateLocalCurrency } from "../../../../lib/utils/helper/translateLocalCurrency";
import { MenuListItemProps } from "../../types";
import { DeleteButton } from "../styles";

const RemoveMenuListItem: React.FC<MenuListItemProps> = ({ item }) => {
  const [totalSelectMenu, setTotalSelectMenu] =
    useRecoilState(selectMenuListState);

  const handleDelete = (current: IOrderSelectedItem) => {
    const [filtered] = totalSelectMenu.filter(
      (el) => el.productId === current.productId && el.option === current.option
    );
    const isDelete = window.confirm("정말 삭제하시겠습니까?");
    if (isDelete)
      setTotalSelectMenu((item) => [...item.filter((el) => el !== filtered)]);
  };

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

export default RemoveMenuListItem;
