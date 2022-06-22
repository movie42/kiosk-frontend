import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Noimage from "../../../Images/Noimage";
import {
  productListState,
  SelectOption,
  selectOptionState,
} from "../../../state/productItemState";

const Item: React.FC<
  | IProductItemProps
  | React.DetailedHTMLProps<
      React.LiHTMLAttributes<HTMLLIElement>,
      HTMLLIElement
    >
> = styled.li<IProductItemProps>`
  background-color: ${(props) => props.theme.color.background100};
  height: 100%;
  min-width: 20rem;
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr 0.7fr;
  border: 1px solid ${({ theme }) => theme.color.gray300};
  border-radius: 0.4rem;
  .image-container {
    position: relative;
    .transparent-box {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${({ theme }) => theme.color.backgroundBlack60};
    }
  }
  .item-info-container {
    align-self: center;
    padding: 0.8rem;
    h3 {
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 0.6rem;
    }
    h4 {
      font-size: 2rem;
      align-self: end;
    }
  }
`;

interface IProductItemProps {
  id: string | number;
  name: string;
  price: string | number;
  imageUrl?: string;
  handler?: (value: any) => any;
}

const ProductItem: React.FC<IProductItemProps> = ({
  id,
  name,
  price,
  imageUrl,
  handler,
}) => {
  const [productList, setProductList] = useRecoilState(productListState);
  const [selectOption, setSelectOption] = useRecoilState(selectOptionState);

  const handleSelectItem = (e: React.MouseEvent<HTMLLIElement>) => {
    if (selectOption?.options === "none") {
      return;
    }
    handler && handler(e);
    setProductList((item) =>
      [
        ...item.filter((value) => value.id !== id),
        ...item.filter((value) => value.id === id),
        // .map((item) => ({ ...item, select: !item.select })),
      ].sort((a, b) => (a.id > b.id ? 1 : -1)),
    );
  };

  return (
    <Item data-id={id} onClick={handleSelectItem}>
      <div className="image-container">
        <span className="transparent-box"></span>
        {imageUrl ? <img src={imageUrl} alt={name} /> : <Noimage />}
      </div>
      <div className="item-info-container">
        <h3>{name}</h3>
        <h4>가격 {price}원</h4>
      </div>
    </Item>
  );
};

export default ProductItem;
