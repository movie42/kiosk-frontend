import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useStoreQuery } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { userState } from "@/lib/state/userState";

const useGetStore = () => {
  const { accessToken } = useRecoilValue(userState);

  const { storeId } = useParams();
  return useStoreQuery(graphqlReqeustClient(accessToken), {
    id: Number(storeId)
  });
};

export default useGetStore;
