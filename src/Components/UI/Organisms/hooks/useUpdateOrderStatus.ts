import { useUpdateOrderStatusMutation } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { userState } from "@/lib/state";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useRecoilValue(userState);

  return useUpdateOrderStatusMutation(graphqlReqeustClient(accessToken), {
    onSuccess: () => {
      queryClient.invalidateQueries("getOrders");
    }
  });
};
export default useUpdateOrderStatus;
