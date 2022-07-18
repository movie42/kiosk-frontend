import { UserState } from "../../state/userState";

const useSetUserInfoToLocalStorage = () => {
  const setUser = (user: UserState) => {
    localStorage.setItem("kiosk-user", JSON.stringify(user));
  };
  return { setUser };
};

export default useSetUserInfoToLocalStorage;
