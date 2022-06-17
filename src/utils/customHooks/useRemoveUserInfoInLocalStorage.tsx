import React from "react";

interface IuseRemoveUserInfoInLocalStorageProps {}

const useRemoveUserInfoInLocalStorage = () => {
  const removeUser = (key: string) => {
    localStorage.removeItem(key);
  };
  return { removeUser };
};

export default useRemoveUserInfoInLocalStorage;
