import { createContext, ReactNode, useContext } from "react";
import { LocalStorageService } from "@/Service";
import { ILocalStorageService } from "@/Service/interface";

const UserContext = createContext<ILocalStorageService>(null!);
export const useUserContext = () => useContext(UserContext);
const localStorageService = new LocalStorageService();

interface UserContextAPIProps {
  children: ReactNode;
}

export const UserContextAPI = ({ children }: UserContextAPIProps) => {
  return (
    <UserContext.Provider value={localStorageService}>
      {children}
    </UserContext.Provider>
  );
};
