import { useRecoilState } from "recoil";
import { MeQuery, useMeQuery } from "@/lib/generated/graphql";
import { userState } from "@/lib/state";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";

const useUserQuery = () => {
  const [isUser, setIsUser] = useRecoilState(userState);

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

  return { refetch };
};

export default useUserQuery;
