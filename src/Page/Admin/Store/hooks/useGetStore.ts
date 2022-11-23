import { useState } from "react";

import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useStoreQuery } from "../../../../lib/generated/graphql";
import graphqlReqeustClient from "../../../../lib/graphqlRequestClient";
import { userState } from "../../../../lib/state/userState";

const useGetStore = () => {
  const { accessToken } = useRecoilValue(userState);
  const [store, setStore] = useState<{
    name: string;
    phone: string;
    code: string;
    address: string;
  }>({
    name: "",
    phone: "",
    code: "",
    address: ""
  });

  const { storeId } = useParams();
  const storeQuery = useStoreQuery(
    graphqlReqeustClient(accessToken),
    {
      id: Number(storeId)
    },
    {
      onSuccess: (data) => {
        if (data.store) {
          const { name, code, address, phone } = data.store;
          setStore({ name, code, address, phone });
        }
      }
    }
  );

  return { store, ...storeQuery };
};

export default useGetStore;
