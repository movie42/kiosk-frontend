import { atom } from "recoil";

interface UserState {
  login: boolean;
  name: string;
  storeName: string;
}

export const userState = atom<UserState>({
  key: "user",
  default: { login: false, name: "", storeName: "" },
});
