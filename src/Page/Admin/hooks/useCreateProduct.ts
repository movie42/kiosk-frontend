import {
  useAddProductOptionsMutation,
  useAddProductsMutation
} from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { userState } from "@/lib/state";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

const useCreateProduct = () => {
  const navigate = useNavigate();
  const { userId, storeId } = useParams();
  const { accessToken } = useRecoilValue(userState);
  const queryClient = useQueryClient();

  const {
    data: newProducts,
    mutate: addProductMutate,
    isSuccess: isProductAddSuccess,
    isLoading: isProductAdding
  } = useAddProductsMutation(graphqlReqeustClient(accessToken), {});

  const { mutate: addProductOptionMutate, isLoading: isOptionAdding } =
    useAddProductOptionsMutation(graphqlReqeustClient(accessToken), {
      onSuccess: () => {
        queryClient.invalidateQueries("getProducts");
        navigate(`/admin/${userId}/store/${storeId}/product/manage-product`);
      }
    });

  return {
    newProducts,
    addProductMutate,
    isProductAddSuccess,
    addProductOptionMutate,
    isProductAdding,
    isOptionAdding
  };
};

export default useCreateProduct;
