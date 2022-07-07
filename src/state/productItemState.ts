import { atom } from "recoil";
import { Z_ASCII } from "zlib";
import { ProductListValues } from "../mockup/productList";
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
  default: <ProductListValues[]>[],
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

export const isCurrentSelectItemState = atom({
  key: "isCurrentSelectItemState",
  default: 0,
});

export const updateProductState = atom({
  key: "updateProductState",
  default: <ProductListValues>{},
});
