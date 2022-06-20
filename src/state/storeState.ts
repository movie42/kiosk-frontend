import { atom } from "recoil";

export interface storeStateProps {
  id: string | undefined;
  name: string | undefined;
  code: string | undefined;
  address: string | undefined;
  phone: string | undefined;
}

export const storeState = atom<storeStateProps[]>({
  key: "stores",
  default: [
    {
      id: "",
      name: "",
      code: "",
      address: "",
      phone: "",
    },
  ],
});
