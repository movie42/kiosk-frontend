import { atom } from "recoil";
import { productList, ProductListValues } from "../mockup/productList";
import { SelectOption } from "../Page/Admin/AdminManageProductItemList";
import { IOrderSelectedItem } from "../Page/Client/ClientMenu";

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
  default: { option: "none" },
});

// client
export const selectMenuListState = atom({
  key: "selectMenuListState",
  default: <IOrderSelectedItem[]>[],
});