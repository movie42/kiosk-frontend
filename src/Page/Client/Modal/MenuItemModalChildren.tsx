import React, { useState } from "react";
import styled from "styled-components";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";
import { ProductListValues } from "../../../mockup/productList";
import ButtonDefaultStyle from "../../../Components/Buttons/ButtonDefault";
import { IOrderSelectedItem } from "../ClientMenu";
import { AddCountButton, MinusCountButton } from "../ClientSelectList";

const OptionButton = styled(ButtonDefaultStyle)<{ selected?: boolean }>`
  background-color: ${(props) =>
    props.selected ? props.theme.color.primary800 : props.theme.color.gray300};
  margin-right: 1rem;
  flex-grow: 1;
`;
const OrderContainer = styled.div`
  display: grid;
  grid-template-columns: 50px 0.5fr 50px 1fr 1fr;
  column-gap: 10px;
  align-items: center;
`;
const OptionContainer = styled.div`
  display: flex;
`;
const CancelButton = styled(ButtonDefaultStyle)`
  background-color: ${(props) => props.theme.color.gray300};
  padding: 0.8rem 1rem;
`;
const OrderButton = styled(ButtonDefaultStyle)`
  background-color: ${(props) => props.theme.color.primary800};
  padding: 0.8rem 1rem;
`;
const Title = styled.h4`
  font-size: 1.7rem;
  font-weight: bold;
  margin: 2rem 0 0.5rem;
`;
const ProductCount = styled.span`
  font-size: 2rem;
  font-weight: bold;
  margin: 0 1.5rem 0.8rem;
  text-align: center;
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
  const [selected] = selectedItem;
  const orderSelectedItem = () => {
    const [sameMenu] = orderItem.filter(
      (ordered) =>
        ordered.productId === selected.id && ordered.option === selectedOption,
    );

    const { option: hasOption }: any = selected;

    if (count === 0) {
      alert("수량을 선택해주세요");
      return;
    }

    if (hasOption?.length > 0 && !selectedOption) {
      alert("옵션을 선택하세요");
      return;
    }

    if (!sameMenu || sameMenu.option !== selectedOption) {
      setOrderItem((orderItem) =>
        [
          ...orderItem,
          {
            productId: selected.id,
            name: selected.name,
            option: selectedOption,
            price: selected.price,
            totalCount: count,
            totalPrice: selected.price * count,
          },
        ].sort((a: any, b: any) => {
          if (a.productId === b.productId) {
            return a?.option > b?.option ? 1 : -1;
          }
          return a.productId - b.productId;
        }),
      );
    }

    if (sameMenu?.option === selectedOption) {
      setOrderItem((orderItem) =>
        [
          ...orderItem.filter((el) => el !== sameMenu),
          {
            ...sameMenu,
            totalCount: sameMenu.totalCount + count,
            totalPrice: sameMenu.totalPrice + sameMenu.price * count,
          },
        ].sort((a: any, b: any) => {
          if (a.productId === b.productId) {
            return a?.option > b?.option ? 1 : -1;
          }
          return a.productId - b.productId;
        }),
      );
    }

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
      <h2>{selected.name}</h2>
      <Title>구성</Title>
      <p>{selected.name} 1개</p>
      <Title>상품옵션</Title>
      <OptionContainer>
        {/* {selected.option?.map((item, i) => (
          <OptionButton
            key={item}
            selected={selectedOption === item ? true : false}
            onClick={() => setSelectedOption(item)}
          >
            {item}
          </OptionButton>
        ))} */}
      </OptionContainer>
      <Title>
        총 가격&nbsp;
        {(count * Number(selected.price)).toLocaleString()}원
      </Title>
      <OrderContainer>
        <MinusCountButton
          onClick={() => {
            if (count < 1) return;
            setCount((count) => count - 1);
          }}
        >
          <AiFillMinusCircle />
        </MinusCountButton>
        <ProductCount>{count}</ProductCount>
        <AddCountButton
          onClick={() => {
            if (count < 0) return;
            setCount((count) => count + 1);
          }}
        >
          <IoIosAddCircle />
        </AddCountButton>
        <CancelButton onClick={cancelItem}>취소하기</CancelButton>
        <OrderButton onClick={orderSelectedItem}>주문하기</OrderButton>
      </OrderContainer>
    </>
  );
};

export default MenuItemModalChildren;
