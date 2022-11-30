import { useRecoilValue } from "recoil";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAddStoreMutation } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { userState } from "@/lib/state";
// import { handleErrorMessage } from "@/lib/utils";
// import { ErrorState } from "@/lib/interface";

const useAddStore = () => {
  const isUser = useRecoilValue(userState);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: mutateStore } = useAddStoreMutation<Error>(
    graphqlReqeustClient(isUser.accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("stores");
        navigate("/login");
      }
      //   onError: (error) => {
      //     handleErrorMessage(error, setErrorState);
      //   }
    }
  );

  return { mutateStore };
};

export default useAddStore;
