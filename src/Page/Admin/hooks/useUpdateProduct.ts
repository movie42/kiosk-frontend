import { UseMutateFunction, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

import {
  AddProductOptionInput,
  AddProductOptionsMutation,
  EditProductInput,
  EditProductOptionInput,
  Exact,
  UpdateProductMutation,
  UpdateProductOptionsMutation,
  useAddProductOptionsMutation,
  useUpdateProductMutation,
  useUpdateProductOptionsMutation
} from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { userState } from "@/lib/state";

export interface UseUpdateProductReturn {
  updateProductMutation: UseMutateFunction<
    UpdateProductMutation,
    unknown,
    Exact<{
      products: EditProductInput;
    }>,
    unknown
  >;
  updateProductOptionsMutate: UseMutateFunction<
    UpdateProductOptionsMutation,
    unknown,
    Exact<{
      option: EditProductOptionInput | EditProductOptionInput[];
    }>,
    unknown
  >;
  addProductOptionMutate: UseMutateFunction<
    AddProductOptionsMutation,
    unknown,
    Exact<{
      option: AddProductOptionInput | AddProductOptionInput[];
    }>,
    unknown
  >;
  isSuccessUpdateProduct: boolean;
  isSuccessUpdateProductOptions: boolean;
  isSuccessAddNewOptions: boolean;
  isUpdatingProductOptions: boolean;
  isUpdatingProduct: boolean;
  isAddingNewOptions: boolean;
}
const useUpdateProduct = (): UseUpdateProductReturn => {
  const queryClient = useQueryClient();
  const { accessToken } = useRecoilValue(userState);
  const {
    mutate: updateProductMutation,
    isSuccess: isSuccessUpdateProduct,
    isLoading: isUpdatingProduct
  } = useUpdateProductMutation(graphqlReqeustClient(accessToken));
  const {
    isSuccess: isSuccessUpdateProductOptions,
    isLoading: isUpdatingProductOptions,
    mutate: updateProductOptionsMutate
  } = useUpdateProductOptionsMutation(graphqlReqeustClient(accessToken));
  const {
    isSuccess: isSuccessAddNewOptions,
    isLoading: isAddingNewOptions,
    mutate: addProductOptionMutate
  } = useAddProductOptionsMutation(graphqlReqeustClient(accessToken), {
    onSuccess: () => {
      queryClient.invalidateQueries("getProducts");
    }
  });

  return {
    updateProductMutation,
    updateProductOptionsMutate,
    addProductOptionMutate,
    isSuccessUpdateProduct,
    isSuccessUpdateProductOptions,
    isSuccessAddNewOptions,
    isUpdatingProduct,
    isUpdatingProductOptions,
    isAddingNewOptions
  };
};

export default useUpdateProduct;
