import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { Loading } from "@/Components";
import { userState } from "@/lib/state";
import { useRemoveUserInfoInLocalStorage } from "@/lib/hooks";

const Logout = () => {
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(userState);
  const { removeUser } = useRemoveUserInfoInLocalStorage();

  useEffect(() => {
    setTimeout(() => {
      setUserInfo({
        isLogin: false,
        id: undefined,
        email: undefined,
        name: undefined,
        accessToken: undefined,
        refreshToken: undefined
      });
      removeUser("kiosk-user");
      navigate("/");
    }, 3000);
  }, []);

  return (
    <Loading
      title="로그아웃 중입니다."
      subTitle="오늘 하루 수고한 나 치맥이닷!"
    />
  );
};

export default Logout;
