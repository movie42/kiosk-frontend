import { atom } from "recoil";
import { storeStateProps } from "./interface";

const initialValue = {
  id: "",
  name: "",
  code: "",
  address: "",
  phone: "",
  isAvailable: false
};

export const storesState = atom<storeStateProps[]>({
  key: "stores",
  default: [initialValue]
});

export const storeState = atom<storeStateProps>({
  key: "store",
  default: initialValue
});
