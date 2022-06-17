import React from "react";
import { UserState } from "../../state/userState";

interface IuseGetUserStateFromLocalStorageProps {}

const useGetUserInfoFromLocalStorage = () => {
  const getUser = () => {
    const user = localStorage.getItem("kioks-user");

    if (user) {
      return JSON.parse(user) as UserState;
    }

    return undefined;
  };

  return { getUser };
};

export default useGetUserInfoFromLocalStorage;
