import {
  AddProductInput,
  AddProductOptionInput,
  AddProductOptionsMutation,
  AddProductsMutation,
  Exact,
  useAddProductOptionsMutation,
  useAddProductsMutation
} from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { userState } from "@/lib/state";
import { UseMutateFunction, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

export interface UseCreateProductReturn {
  newProducts: AddProductsMutation | undefined;
  addProductMutate: UseMutateFunction<
    AddProductsMutation,
    unknown,
    Exact<{
      products: AddProductInput | AddProductInput[];
    }>,
    unknown
  >;
  isProductAddSuccess: boolean;
  addProductOptionMutate: UseMutateFunction<
    AddProductOptionsMutation,
    unknown,
    Exact<{
      option: AddProductOptionInput | AddProductOptionInput[];
    }>,
    unknown
  >;
  isProductAdding: boolean;
  isOptionAdding: boolean;
}

const useCreateProduct = (): UseCreateProductReturn => {
  const navigate = useNavigate();
  const { userId, storeId } = useParams();
  const { accessToken } = useRecoilValue(userState);
  const queryClient = useQueryClient();

  const {
    data: newProducts,
    mutate: addProductMutate,
    isSuccess: isProductAddSuccess,
    isLoading: isProductAdding
  } = useAddProductsMutation(graphqlReqeustClient(accessToken));

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
