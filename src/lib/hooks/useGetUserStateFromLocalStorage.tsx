import { UserState } from "@/lib/state";

const useGetUserInfoFromLocalStorage = () => {
  const getUser = () => {
    const user = localStorage.getItem("kiosk-user");

    if (user) {
      return JSON.parse(user) as UserState;
    }

    return undefined;
  };

  return { getUser };
};

export default useGetUserInfoFromLocalStorage;
