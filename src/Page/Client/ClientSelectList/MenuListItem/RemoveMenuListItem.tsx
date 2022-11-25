import React from "react";
import { translateLocalCurrency } from "@/lib/utils";
import { MenuListItemProps } from "../../types";
import useHandleSelectMenu from "../hooks/useHandleSelectMenu";
import { DeleteButton } from "../styles";

const RemoveMenuListItem: React.FC<MenuListItemProps> = ({ item }) => {
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

export default RemoveMenuListItem;
