import { useMyStoresQuery } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { userState } from "@/lib/state";

import { useRecoilValue } from "recoil";

const useGetStores = () => {
  /* FIXME: 새로고침을 했을 떄, user 상태가 사라지고 app에서 
    user를 불러오는 작업을 해야하는데 불러온 뒤의 상태가 새롭게 반영되지 않기 때문에 
   가게 정보를 불러오지 못합니다. 해당 버그는 user상태를 계속해서 감시하고 반영할 수 있도록
   수정해야합니다.
  */
  const { accessToken } = useRecoilValue(userState);

  return useMyStoresQuery(graphqlReqeustClient(accessToken), undefined, {
    select: (data) => {
      return data.myStores;
    }
  });
};

export default useGetStores;
