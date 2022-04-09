import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled, { StyledComponent } from "styled-components";
import { ProductListValues } from "../../mockup/productList";
import {
  productListState,
  selectProductListState,
} from "../../state/productItemState";

const Item: React.FC<
  | IProductItemProps
  | React.DetailedHTMLProps<
      React.LiHTMLAttributes<HTMLLIElement>,
      HTMLLIElement
    >
> = styled.li<IProductItemProps>`
  padding: 1rem;
  border-radius: 0.3rem;
  background-color: ${(props) =>
    props.select ? props.theme.warning : props.theme.netural};

  div {
    display: grid;
    height: 100%;

    h3 {
      font-size: 2rem;
      font-weight: bold;
    }

    h4 {
      font-size: 1.7rem;
      font-weight: bold;
      align-self: end;
    }
  }
`;

interface IProductItemProps {
  id: string | number;
  name: string;
  price: string | number;
  imageUrl?: string;
  select?: boolean;
  handler?: (value: any) => any;
}

const ProductItem: React.FC<IProductItemProps> = ({
  id,
  name,
  price,
  imageUrl,
  handler,
  select,
}) => {
  const [productList, setProductList] = useRecoilState(productListState);
  return (
    <Item
      data-id={id}
      select={select}
      onClick={(e) => {
        handler && handler(e);
        setProductList((item) =>
          [
            ...item.filter((value) => value.id !== id),
            ...item
              .filter((value) => value.id === id)
              .map((item) => ({ ...item, select: !item.select })),
          ].sort((a, b) => (a.id > b.id ? 1 : -1)),
        );
      }}
    >
      <div>
        {imageUrl && <img src={imageUrl} alt={name} />}
        <h3>{name}</h3>
        <h4>가격 {price}원</h4>
      </div>
    </Item>
  );
};

export default ProductItem;
