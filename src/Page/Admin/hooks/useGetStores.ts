import { useMyStoresQuery } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { userState } from "@/lib/state";

import { useRecoilValue } from "recoil";

const useGetStores = () => {
  const { accessToken } = useRecoilValue(userState);

  return useMyStoresQuery(graphqlReqeustClient(accessToken), undefined, {
    select: (data) => {
      return data.myStores;
    }
  });
};

export default useGetStores;
