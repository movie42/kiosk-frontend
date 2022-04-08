import { atom } from "recoil";
import { productList, ProductListValues } from "../mockup/productList";

export const productListState = atom({
  key: "productList",
  default: productList,
});

export const selectProductListState = atom({
  key: "selectProductList",
  default: <ProductListValues[]>[],
});
