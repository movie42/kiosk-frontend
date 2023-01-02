import { useSetRecoilState } from "recoil";
import { useLoginMutation } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { userState } from "@/lib/state/userState";

import { useFormContext } from "react-hook-form";
import { IUserProps } from "../interface";
import { ClientError } from "graphql-request";
import { GraphQLError } from "graphql";

const useLogin = () => {
  const method = useFormContext<IUserProps>();

  if (method === null) {
    throw new Error("useLogin은 FormProvider 안에서만 사용할 수 있습니다.");
  }

  const setIsUser = useSetRecoilState(userState);

  return useLoginMutation<ClientError>(graphqlReqeustClient(), {
    onSuccess: (data) => {
      const {
        login: { accessToken, refreshToken }
      } = data;
      setIsUser((pre) => ({
        ...pre,
        isLogin: true,
        accessToken,
        refreshToken
      }));
    },
    onError: (errors) => {
      const [
        {
          extensions: {
            response: { statusCode }
          }
        }
      ] = errors.response.errors as GraphQLError[];

      if (statusCode >= 500) {
        method.setError("loginFail", {
          message: "서버에 문제가 있습니다. 나중에 다시 시도해주세요."
        });
        return;
      }
      method.setError("loginFail", {
        message: "존재하지 않는 회원이거나 비밀번호가 다릅니다."
      });
    }
  });
};

export default useLogin;
