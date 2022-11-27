import { useToggleStoreIsAvailableMutation } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { userState } from "@/lib/state";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

const useUpdateStoreOpenCloseToggle = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useRecoilValue(userState);
  return useToggleStoreIsAvailableMutation(graphqlReqeustClient(accessToken), {
    onSuccess: () => {
      queryClient.invalidateQueries("getProducts");
      queryClient.invalidateQueries("myStores");
    }
  });
};

export default useUpdateStoreOpenCloseToggle;
