import { useMyStoresQuery } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { storesState, storeStateProps, userState } from "@/lib/state";
import { useRecoilState, useRecoilValue } from "recoil";

const useGetMyStore = () => {
  const user = useRecoilValue(userState);
  const [store, setStore] = useRecoilState(storesState);
  const storeQuery = useMyStoresQuery(
    graphqlReqeustClient(user.accessToken),
    undefined,
    {
      onSuccess: (data) => {
        const stores = data.myStores.map<storeStateProps>((value) => ({
          id: value?.id,
          name: value?.name,
          code: value?.code,
          address: value?.address,
          phone: value?.phone,
          isAvailable: value?.isAvailable
        }));

        setStore(stores);
      }
    }
  );
  return { store, ...storeQuery };
};

export default useGetMyStore;
