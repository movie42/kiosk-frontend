import React, { useEffect, useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import Router from "./Routers/Routers";
import { userState } from "./state/userState";
import useGetUserInfoFromLocalStorage from "./utils/customHooks/useGetUserStateFromLocalStorage";

function App() {
  const [user, setUser] = useRecoilState(userState);
  const { getUser } = useGetUserInfoFromLocalStorage();

  useMemo(() => {
    const storageUser = getUser();

    if (!storageUser) {
      return;
    }

    if (!user.isLogin) {
      setUser(storageUser);
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
