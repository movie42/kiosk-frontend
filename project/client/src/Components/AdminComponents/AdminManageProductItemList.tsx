import React, { useState } from "react";
import styled from "styled-components";
import ProductItem from "./ProductItem";
import { productList } from "../../mockup/productList";

const Container = styled.div`
  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }

  ul {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(20rem, auto);
  }
`;

const AdminManageProductItemList = () => {
  return (
    <Container>
      <h1>메뉴</h1>
      <ul>
        {productList &&
          productList.map((item) => (
            <ProductItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
            />
          ))}
      </ul>
    </Container>
  );
};

export default AdminManageProductItemList;
