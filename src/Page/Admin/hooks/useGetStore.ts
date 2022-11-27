import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useMyStoresQuery } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { userState } from "@/lib/state/userState";

const useGetStore = () => {
  const { storeId } = useParams();

  const { accessToken } = useRecoilValue(userState);

  return useMyStoresQuery(graphqlReqeustClient(accessToken), undefined, {
    select: (data) => {
      const [store] = data.myStores.filter((store) => store.id === storeId);
      return store;
    }
  });
};

export default useGetStore;
