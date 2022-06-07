import { atom } from "recoil";
import { productList, ProductListValues } from "../mockup/productList";
import { IOrderSelectedItem } from "../Page/Client/ClientMenu";

export enum Option {
  NONE = "none",
  DELETE = "delete",
  UPDATE = "update",
}

export interface SelectOption {
  options: Option;
}

export const productListState = atom({
  key: "productList",
  default: productList,
});

export const selectProductListState = atom({
  key: "selectProductList",
  default: <ProductListValues[]>[],
});

export const selectOptionState = atom<SelectOption>({
  key: "selectOption",
  default: { options: Option.NONE },
});

// client
export const selectMenuListState = atom({
  key: "selectMenuListState",
  default: <IOrderSelectedItem[]>[],
});
