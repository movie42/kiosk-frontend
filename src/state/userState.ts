import { atom } from "recoil";

interface UserState {
  login: boolean;
}

export const userState = atom<UserState>({
  key: "user",
  default: { login: false },
});
