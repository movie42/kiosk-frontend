import { atom } from "recoil";
import { UserState } from "./interface";

export const userState = atom<UserState>({
  key: "user",
  default: {
    isLogin: false,
    id: undefined,
    name: undefined,
    email: undefined,
    accessToken: undefined,
    refreshToken: undefined
  }
});
