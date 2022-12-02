import { atom } from "recoil";
import { OptionValue } from "./interface";
export interface IOrderSelectedItem {
  productId: number;
  name: string;
  optionId: number;
  option?: string;
  price: number;
  totalCount: number;
  totalPrice: number;
  imageUrl?: string | null | undefined;
}

export interface ProductOptions {
  id: number;
  name: string;
}

export interface ProductListValues {
  id: number;
  name: string;
  price: number;
  options?: ProductOptions[];
  imageUrl?: string | null | undefined;
  description?: string | null | undefined;
  isAvailable?: boolean | undefined;
}

export interface Sales {
  name: string;
  price: number;
  option: string;
  quantity: number;
  createdAt: string;
}

export interface SalesInfo {
  productId: number;
  createdAt: string;
  sales: Sales[];
}

export enum Option {
  NONE = "none",
  DELETE = "delete",
  UPDATE = "update"
}

export interface SelectOption {
  options: OptionValue;
}

export const productListState = atom({
  key: "productList",
  default: <ProductListValues[]>[]
});

export const selectProductListState = atom({
  key: "selectProductList",
  default: <ProductListValues[]>[]
});

export const selectOptionState = atom<SelectOption>({
  key: "selectOption",
  default: { options: "NONE" }
});

// client
export const selectMenuListState = atom({
  key: "selectMenuListState",
  default: <IOrderSelectedItem[]>[]
});

export const isCurrentSelectItemState = atom({
  key: "isCurrentSelectItemState",
  default: 0
});

export const updateProductState = atom({
  key: "updateProductState",
  default: <ProductListValues>{}
});
