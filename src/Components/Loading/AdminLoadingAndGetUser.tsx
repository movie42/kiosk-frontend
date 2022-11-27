import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { Loading } from "@/Components";
import { MeQuery, useMeQuery } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { userState } from "@/lib/state";
import { useSetUserInfoToLocalStorage } from "@/lib/hooks";

const AdminLoadingAndGetUser = () => {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useRecoilState(userState);
  const { setUser } = useSetUserInfoToLocalStorage();

  const { isSuccess, isRefetching } = useMeQuery<MeQuery, Error>(
    graphqlReqeustClient(isUser.accessToken),
    undefined,
    {
      onSuccess: (data) => {
        const { id, email, name } = data.me;
        setIsUser((pre) => ({ ...pre, id, email, name }));
      }
    }
  );

  useEffect(() => {
    if (isSuccess && !isRefetching) {
      setUser(isUser);
      setTimeout(() => navigate(`/admin/${isUser.id}/store`), 3000);
    }
  }, [isSuccess, isRefetching, isUser]);

  return <Loading title="로그인 중입니다." subTitle="잠시만 기다려주세요." />;
};

export default AdminLoadingAndGetUser;
