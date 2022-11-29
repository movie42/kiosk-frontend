import { useEffect } from "react";
import Router from "./Routers/Routers";
import { UserState, userState, useUserContext } from "./lib/state";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const { getLocalStorage } = useUserContext();

  useEffect(() => {
    const userInfo = getLocalStorage<UserState>();

    if (userInfo === null) {
      setUser({
        isLogin: false,
        id: "",
        name: "",
        accessToken: "",
        refreshToken: "",
        email: ""
      });
      return navigate("/");
    }

    setUser(userInfo);
  }, []);

  return <Router />;
}

export default App;
