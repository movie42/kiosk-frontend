import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Loading from "../../Components/Loading";
import { userState } from "../../state/userState";
import useRemoveUserInfoInLocalStorage from "../../utils/customHooks/useRemoveUserInfoInLocalStorage";

interface ILogoutProps {}

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
        refreshToken: undefined,
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
