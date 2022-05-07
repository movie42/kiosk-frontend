import React, { useState } from "react";
import { ProductListValues } from "../../../mockup/productList";
import ButtonDefaultStyle from "../../../Components/Buttons/ButtonDefault";
import styled from "styled-components";

const OptionButton = styled(ButtonDefaultStyle)<{ selected?: boolean }>`
  background-color: ${(props) =>
    props.selected ? props.theme.color.primary800 : props.theme.color.gray300};
`;

interface IOrderSelectedItem {
  id: number;
  name: string;
  option?: string;
  totalCount: number;
  totalPrice: number;
}

interface IMenuItemModalChildrenProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: ProductListValues[];
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  orderItem: IOrderSelectedItem[];
  setOrderItem: React.Dispatch<React.SetStateAction<IOrderSelectedItem[]>>;
}

const MenuItemModalChildren: React.FC<IMenuItemModalChildrenProps> = ({
  setIsModal,
  selectedItem,
  count,
  setCount,
  orderItem,
  setOrderItem,
}) => {
  const orderSelectedItem = () => {
    setOrderItem([
      ...orderItem,
      {
        id: selectedItem[0].id,
        name: selectedItem[0].name,
        option: selectedOption,
        totalCount: count,
        totalPrice: selectedItem[0].price * count,
      },
    ]);
    setCount(0);
    setIsModal(false);
  };

  const cancelItem = () => {
    setCount(0);
    setIsModal(false);
  };

  const [selectedOption, setSelectedOption] = useState("");

  return (
    <>
      <h2> 선택하신 메뉴요</h2>
      <h2>{selectedItem[0].name}</h2>
      <p>주문 수: {count}</p>
      <p>주문 가격: {count * Number(selectedItem[0].price)}</p>
      {selectedItem[0].option?.map((item, i) => (
        <OptionButton
          key={item}
          selected={i === 0 ? true : false}
          onClick={() => setSelectedOption(item)}
        >
          {item}
        </OptionButton>
      ))}

      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={cancelItem}>취소하기</button>
      <button onClick={orderSelectedItem}>주문하기</button>
    </>
  );
};

export default MenuItemModalChildren;
