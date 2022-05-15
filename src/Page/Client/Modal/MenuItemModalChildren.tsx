import React, { useState } from "react";
import { ProductListValues } from "../../../mockup/productList";
import ButtonDefaultStyle from "../../../Components/Buttons/ButtonDefault";
import styled from "styled-components";
import { IOrderSelectedItem } from "../ClientMenu";

const OptionButton = styled(ButtonDefaultStyle)<{ selected?: boolean }>`
  background-color: ${(props) =>
    props.selected ? props.theme.color.primary800 : props.theme.color.gray300};
`;

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
    const [sameMenu] = orderItem.filter(
      (ordered) => ordered.productId === selectedItem[0].id
    );

    if (
      count === 0 ||
      (selectedItem[0].option?.length !== 0 && selectedOption === "")
    ) {
      alert("수량과 옵션을 선택해주세요");
    } else {
      if (sameMenu && sameMenu.option === selectedOption) {
        setOrderItem((orderItem) =>
          [
            ...orderItem.filter((el) => el !== sameMenu),
            {
              ...sameMenu,
              totalCount: sameMenu.totalCount + count,
              totalPrice: sameMenu.totalPrice + sameMenu.price + count,
            },
          ].sort(function (a, b) {
            if (a.productId === b.productId) {
              return a.option && b.option && a.option > b.option ? 1 : -1;
            } else {
              return a.productId - b.productId;
            }
          })
        );
      } else {
        setOrderItem((orderItem) =>
          [
            ...orderItem,
            {
              productId: selectedItem[0].id,
              name: selectedItem[0].name,
              option: selectedOption,
              price: selectedItem[0].price,
              totalCount: count,
              totalPrice: selectedItem[0].price * count,
            },
          ].sort(function (a, b) {
            if (a.productId === b.productId) {
              return a.option && b.option && a.option > b.option ? 1 : -1;
            } else {
              return a.productId - b.productId;
            }
          })
        );
      }
      setCount(0);
      setIsModal(false);
    }
  };

  const cancelItem = () => {
    setCount(0);
    setIsModal(false);
  };

  const [selectedOption, setSelectedOption] = useState("");

  return (
    <>
      <h2>{selectedItem[0].name}</h2>
      <p>주문 수: {count}</p>
      <p>주문 가격: {count * Number(selectedItem[0].price)}</p>
      {selectedItem[0].option?.map((item, i) => (
        <OptionButton
          key={item}
          selected={selectedOption === item ? true : false}
          onClick={() => setSelectedOption(item)}
        >
          {item}
        </OptionButton>
      ))}

      <button
        onClick={() => {
          if (count < 1) return;
          setCount(count - 1);
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          if (count < 0) return;
          setCount(count + 1);
        }}
      >
        +
      </button>
      <button onClick={cancelItem}>취소하기</button>
      <button onClick={orderSelectedItem}>주문하기</button>
    </>
  );
};

export default MenuItemModalChildren;
