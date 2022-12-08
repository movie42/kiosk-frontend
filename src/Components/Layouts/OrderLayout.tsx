import { Outlet } from "react-router-dom";
import { Header, Main, Wrapper } from "./styles";
// import { useRecoilState } from "recoil";
// import { userState } from "../lib/state/userState";

const OrderLayout = () => {
  // const [user, setUser] = useRecoilState(userState);
  return (
    <Wrapper>
      <Header>
        <h1>누구나 키오스크</h1>
        {/* {user.login && (
          <button
            onClick={() => setUser({ login: false, name: "", storeName: "" })}
          >
            로그아웃
          </button>
        )} */}
      </Header>
      <Main>
        <Outlet />
      </Main>
    </Wrapper>
  );
};

export default OrderLayout;
