import { useStoreQuery } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { userState } from "@/lib/state";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

const useGetStore = () => {
  const { userId } = useParams();
  console.log(userId);
  const { accessToken } = useRecoilValue(userState);

  return useStoreQuery(graphqlReqeustClient(accessToken), {
    id: Number(userId)
  });
};

export default useGetStore;
