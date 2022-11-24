import { UserState } from "@/lib/state";

const useSetUserInfoToLocalStorage = () => {
  const setUser = (user: UserState) => {
    localStorage.setItem("kiosk-user", JSON.stringify(user));
  };
  return { setUser };
};

export default useSetUserInfoToLocalStorage;
