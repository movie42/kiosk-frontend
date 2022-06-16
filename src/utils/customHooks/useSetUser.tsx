import React from "react";
import { useRecoilValue } from "recoil";

import { userState, UserState } from "../../state/userState";

interface IuseSetUserInfoToLocalStroageProps {}

const useSetUserInfoToLocalStorage = () => {
  const setUser = (user: UserState) => {
    localStorage.setItem("user", JSON.stringify(user));
  };
  return { setUser };
};

export default useSetUserInfoToLocalStorage;
