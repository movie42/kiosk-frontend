// import { useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import { useLoginMutation } from "../../../../lib/generated/graphql";
import graphqlReqeustClient from "../../../../lib/graphqlRequestClient";
import { userState } from "../../../../lib/state/userState";

const useLogin = () => {
  // const queryClient = useQueryClient();

  const setIsUser = useSetRecoilState(userState);

  return useLoginMutation<Error>(graphqlReqeustClient(), {
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
      // queryClient.invalidateQueries("me");
    }
    // onError: (error) => {
    //   handleErrorMessage(error, setErrorState);
    /**
     * TODO:
     * 에러 메시지가 일관되지 않아 처리에 어려움이 있다.
     * 백앤드 개발자에게 에러 메시지를 보낼때 message에 실어 보낼 수 있도록 요청하기.
     * 에러 메시지를 처리할 수 있는 방법 생각해보기
     */
    //   if (errorState) {
    //     const [message] = errorState.response.errors;
    //     const error = message.extensions.exception.response.error;
    //     return error;
    //   }
    // }
  });
};

export default useLogin;
