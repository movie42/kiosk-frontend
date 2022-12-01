import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";
import { translateLocalCurrency } from "@/lib/utils";
import { Images, Noimage } from "@/Components/UI/Atoms/Images";
import {
  IOrderSelectedItem,
  ProductListValues
} from "@/lib/state/productItemState";
import {
  AddCountButton,
  MinusCountButton
} from "@/Page/Client/ClientSelectList/styles";
import {
  ItemNameContainer,
  Wrapper,
  OptionButton,
  OrderContainer,
  OptionContainer,
  CancelButton,
  OrderButton,
  Title,
  ProductCount
} from "./styles";

interface MenuItemModalProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: ProductListValues[];
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  orderItem: IOrderSelectedItem[];
  setOrderItem: React.Dispatch<React.SetStateAction<IOrderSelectedItem[]>>;
}

const MenuItemModal = ({
  setIsModal,
  selectedItem,
  count,
  setCount,
  orderItem,
  setOrderItem
}: MenuItemModalProps) => {
  const [warning, setWarning] = useState("");
  const [selected] = selectedItem;
  const orderSelectedItem = () => {
    const [sameMenu] = orderItem.filter(
      (ordered) =>
        ordered.productId === selected.id && ordered.option === selectedOption
    );

    const { options: hasOption }: any = selected;

    if (count === 0) {
      setWarning("수량을 선택해주세요");
      return;
    }

    if (hasOption?.length > 0 && !selectedOption) {
      setWarning("옵션을 선택하세요");
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
            optionId: selectedOptionId,
            price: selected.price,
            totalCount: count,
            totalPrice: selected.price * count,
            imageUrl: selected.imageUrl
          }
        ].sort((a: any, b: any) => {
          if (a.productId === b.productId) {
            return a?.option > b?.option ? 1 : -1;
          }
          return a.productId - b.productId;
        })
      );
    }

    if (sameMenu?.option === selectedOption) {
      setOrderItem((orderItem) =>
        [
          ...orderItem.filter((el) => el !== sameMenu),
          {
            ...sameMenu,
            totalCount: sameMenu.totalCount + count,
            totalPrice: sameMenu.totalPrice + sameMenu.price * count
          }
        ].sort((a: any, b: any) => {
          if (a.productId === b.productId) {
            return a?.option > b?.option ? 1 : -1;
          }
          return a.productId - b.productId;
        })
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
  const [selectedOptionId, setSelectedOptionId] = useState(0);
  const selectOption = (name: string, id: number) => {
    setSelectedOption(name);
    setSelectedOptionId(id);
  };

  return (
    <Wrapper>
      <div className="image-container">
        <span className="transparent-box"></span>
        <ItemNameContainer>
          <h2>{selected.name}</h2>
        </ItemNameContainer>
        {selected.imageUrl ? (
          <Images src={selected.imageUrl} alt={selected.name} />
        ) : (
          <Noimage />
        )}
      </div>
      <div className="item-info-container">
        <Title composition={true}>구성</Title>
        <p className="item-title">{selected.name} 1개</p>
        {selected.options && (
          <>
            <Title>상품옵션</Title>
            <OptionContainer>
              {selected.options?.map((item) => (
                <OptionButton
                  className="noto"
                  key={item.name}
                  selected={selectedOption === item.name ? true : false}
                  onClick={() => selectOption(item.name, item.id)}
                >
                  {item.name}
                </OptionButton>
              ))}
            </OptionContainer>
          </>
        )}
        <Title>
          총 가격&nbsp;
          {translateLocalCurrency(count * Number(selected.price), "ko-KR")}원
        </Title>
        <OrderContainer>
          {warning && <span className="warning">{warning}</span>}
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
      </div>
    </Wrapper>
  );
};

export default MenuItemModal;
