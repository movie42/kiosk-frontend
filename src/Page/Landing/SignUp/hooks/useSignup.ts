import {
  MeQuery,
  useMeQuery,
  useSignupMutation
} from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { userState } from "@/lib/state";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
// import { ErrorState } from "@/lib/interface";
// import { handleErrorMessage } from "@/lib/utils";

interface useSignupProps {
  checkStore: boolean;
  //   setErrorState: React.Dispatch<React.SetStateAction<ErrorState | undefined>>;
}

const useSignup = ({ checkStore }: useSignupProps) => {
  const [isUser, setIsUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const { refetch } = useMeQuery<MeQuery, Error>(
    graphqlReqeustClient(isUser.accessToken),
    undefined,
    {
      enabled: false,
      onSuccess: (data) => {
        const { id, email, name } = data.me;
        setIsUser((pre) => ({ ...pre, id, email, name }));
      }
    }
  );

  const { mutate } = useSignupMutation<Error>(graphqlReqeustClient(), {
    onSuccess: (data) => {
      const {
        signup: { accessToken, refreshToken }
      } = data;
      setIsUser((pre) => ({
        ...pre,
        isLogin: true,
        accessToken,
        refreshToken
      }));
      alert("정상적으로 회원가입이 완료되었습니다.");
      if (checkStore) refetch();
      if (!checkStore) {
        navigate("/login");
      }
    }
    // onError: (error) => {
    //   handleErrorMessage(error, setErrorState);
    // }
  });

  return { mutate };
};

export default useSignup;
