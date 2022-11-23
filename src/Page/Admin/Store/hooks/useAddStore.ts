import { GraphQLError } from "graphql";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { useAddStoreMutation } from "../../../../lib/generated/graphql";
import graphqlReqeustClient from "../../../../lib/graphqlRequestClient";
import { userState } from "../../../../lib/state/userState";

const useAddStore = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useRecoilValue(userState);

  return useAddStoreMutation<GraphQLError>(graphqlReqeustClient(accessToken), {
    onSuccess: () => {
      queryClient.invalidateQueries("stores");
    }
  });
};
export default useAddStore;
