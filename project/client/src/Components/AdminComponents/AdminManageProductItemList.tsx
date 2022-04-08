import React, { MouseEvent, useState } from "react";
import styled from "styled-components";
import ProductItem from "./ProductItem";
import { ProductListValues } from "../../mockup/productList";
import StateMenuBar from "./StateMenuBar";
import { useRecoilState } from "recoil";
import { productListState } from "../../productItemState";

const Container = styled.div`
  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }

  ul.productList {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(20rem, auto);
  }
`;

const AdminManageProductItemList = () => {
  const [productList, setProductList] = useRecoilState(productListState);
  const [selectList, setSelectList] = useState<ProductListValues[]>([]);

  const selectHandler = (event: React.MouseEvent<HTMLLIElement>) => {
    const id = event.currentTarget.dataset.id;

    const selectProduct = productList.filter((item) => item.id === Number(id));

    id &&
      setSelectList((prevState: ProductListValues[]) => {
        const itemIndex = prevState.findIndex(
          (value) => value.id === Number(id),
        );
        if (itemIndex !== -1) {
          return prevState.filter((value) => value.id !== Number(id));
        }
        return [...prevState, ...selectProduct];
      });
  };

  return (
    <>
      <Container>
        <h1>메뉴</h1>
        <ul className="productList">
          {productList &&
            productList.map((item) => (
              <ProductItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                handler={selectHandler}
              />
            ))}
        </ul>
      </Container>
      {selectList.length !== 0 && <StateMenuBar selectItems={selectList} />}
    </>
  );
};

export default AdminManageProductItemList;
