import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useStoreQuery } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { userState } from "@/lib/state/userState";

const useGetStore = () => {
  const { storeId } = useParams();
  const { accessToken } = useRecoilValue(userState);
  return useStoreQuery(
    graphqlReqeustClient(accessToken),
    {
      id: Number(storeId)
    },
    {
      select: (data) => {
        return data.store;
      }
    }
  );
};

export default useGetStore;
