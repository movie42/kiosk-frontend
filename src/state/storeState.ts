import { atom } from "recoil";

export interface storeStateProps {
  id?: string | undefined;
  name: string | undefined;
  code: string | undefined;
  address: string | undefined;
  phone: string | undefined;
  isAvailable?: boolean | undefined;
}

const initialValue = {
  id: "",
  name: "",
  code: "",
  address: "",
  phone: "",
  isAvailable: false,
};

export const storeState = atom<storeStateProps[]>({
  key: "stores",
  default: [initialValue],
});
