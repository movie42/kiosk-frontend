import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { MeQuery, useMeQuery } from "../../../generated/graphql";
import graphqlReqeustClient from "../../../lib/graphqlRequestClient";
import { userState } from "../../../state/userState";

interface IAdminLoadingAndGetUserProps {}

const AdminLoadingAndGetUser = () => {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useRecoilState(userState);
  const { isSuccess, isRefetching } = useMeQuery<MeQuery, Error>(
    graphqlReqeustClient(isUser.accessToken),
    undefined,
    {
      onSuccess: (data) => {
        const { id, email, name } = data.me;
        setIsUser((pre) => ({ ...pre, id, email, name }));
      },
    },
  );

  useEffect(() => {
    if (isSuccess && !isRefetching) {
      navigate(`/admin/${isUser.id}/store`);
    }
  }, [isSuccess, isRefetching]);

  return <div>로딩중입니다.</div>;
};

export default AdminLoadingAndGetUser;
