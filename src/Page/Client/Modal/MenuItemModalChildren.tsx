import React, { useState } from "react";
import styled from "styled-components";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";
import { ProductListValues } from "../../../state/productItemState";
import ButtonDefaultStyle from "../../../Components/Buttons/ButtonDefault";
import { IOrderSelectedItem } from "../ClientMenu";
import { AddCountButton, MinusCountButton } from "../ClientSelectList";
import { translateLocalCurrency } from "../../../utils/helper/translateLocalCurrency";
import Noimage from "../../../Components/Images/Noimage";
import { SubTitle2 } from "../../../mixin";
import Images from "../../../Components/Images/Images";
const Wrapper = styled.div`
  position: relative;
  color: ${(props) => props.theme.color.fontColorBlack};
  .image-container {
    overflow: hidden;
    position: relative;
    height: 25rem;
    .transparent-box {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-color: ${({ theme }) => theme.color.backgroundBlack60};
    }
  }
  .item-info-container {
    align-self: center;
    padding: 2rem;
    .item-title {
      ${SubTitle2}
    }
    h4 {
      font-size: 2rem;
      align-self: end;
    }
  }
`;
const ItemNameContainer = styled.div`
  display: flex;
  font-size: 1.4rem;
  font-weight: 600;
  padding: 0.5rem;
  align-items: center;
  color: ${({ theme }) => theme.color.fontColorWhite};
  margin: 0.4rem;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  h2 {
    margin-left: 0.5rem;
  }
`;
const OptionButton = styled(ButtonDefaultStyle)<{ selected?: boolean }>`
  background-color: ${(props) =>
    props.selected ? props.theme.color.primary800 : props.theme.color.gray300};
  margin-right: 1rem;
  font-size: 1.6rem;
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
  padding: 0.8rem;
  font-family: "Noto Sans KR";
`;
const OrderButton = styled(ButtonDefaultStyle)`
  background-color: ${(props) => props.theme.color.primary800};
  padding: 0.8rem;
  font-family: "Noto Sans KR";
`;
const Title = styled.h4<{ composition?: boolean }>`
  font-size: 1.7rem;
  font-weight: bold;
  margin: ${(props) =>
    props.composition ? "0.5rem 0 0.5rem" : "2rem 0 0.5rem"};
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
        ordered.productId === selected.id && ordered.option === selectedOption
    );

    const { options: hasOption }: any = selected;

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
            optionId: selectedOptionId,
            price: selected.price,
            totalCount: count,
            totalPrice: selected.price * count,
            imageUrl: selected.imageUrl,
          },
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
            totalPrice: sameMenu.totalPrice + sameMenu.price * count,
          },
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
              {selected.options?.map((item, i) => (
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

export default MenuItemModalChildren;
