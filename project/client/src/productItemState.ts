import { atom } from "recoil";
import { productList } from "./mockup/productList";

export const productListState = atom({
  key: "productList",
  default: productList,
});
