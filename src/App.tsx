import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useRecoilState } from "recoil";

import Router from "./Routers/Routers";
import { userState } from "./lib/state";
import { useGetUserStateFromLocalStorage } from "./lib/hooks";

function App() {
  const [user, setUser] = useRecoilState(userState);

  const { getUser } = useGetUserStateFromLocalStorage();

  useEffect(() => {
    const storageUser = getUser();

    if (storageUser === undefined) {
      return;
    }
    if (storageUser && !user.isLogin) {
      setUser(storageUser);
    }
  }, []);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
