import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { useUpdateStoreMutation } from "../../../../lib/generated/graphql";
import graphqlReqeustClient from "../../../../lib/graphqlRequestClient";
import { userState } from "../../../../lib/state/userState";

const useUpdateStore = () => {
  const { accessToken } = useRecoilValue(userState);
  //   const [errorState, setErrorState] = useState<ErrorState>();
  const queryClient = useQueryClient();

  return useUpdateStoreMutation<Error>(graphqlReqeustClient(accessToken), {
    onSuccess: () => {
      queryClient.invalidateQueries("stores");
    }
    //   onError: (error) => {
    //     handleErrorMessage(error, setErrorState);
    //     if (errorState) {
    //       const [message] = errorState.response.errors;
    //       const error = message.extensions.exception.response.error;
    //       setError("addFail", { message: error });
    //       setIsLoading(false);
    //     }
    //   }
  });
};

export default useUpdateStore;
