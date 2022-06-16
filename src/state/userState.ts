import { atom } from "recoil";

interface UserState {
  id: string | undefined;
  name: string | undefined;
  email: string | undefined;
  isLogin: boolean;
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

export const userState = atom<UserState>({
  key: "user",
  default: {
    isLogin: false,
    id: undefined,
    name: undefined,
    email: undefined,
    accessToken: undefined,
    refreshToken: undefined,
  },
});
