import React from "react";
import { AiFillMinusCircle } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import useHandleSelectMenu from "../hooks/useHandleSelectMenu";
import { MenuListItemProps } from "../../types";
import { AddCountButton, MinusCountButton } from "../styles";

const MenuListItemDetail: React.FC<MenuListItemProps> = ({ item }) => {
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

export default MenuListItemDetail;
