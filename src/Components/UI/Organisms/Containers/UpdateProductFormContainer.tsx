import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import {
  ProductListValues,
  updateProductState,
  useProductOptionsFormContext
} from "@/lib/state";
import {
  CreateProductOptionValue,
  useProductFormContext,
  useUpdateProductMutationContext
} from "@/lib/state/ProductContextProvider";
import ProductForm from "../../Molecules/Form/ProductForm";

interface UpdateProductFormContainerProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  confirm: boolean;
  product?: ProductListValues;
}
const UpdateProductFormContainer = ({
  setIsModal,
  confirm,
  product
}: UpdateProductFormContainerProps) => {
  const { userId, storeId, productId } = useParams();

  const navigate = useNavigate();
  const { getValues: getProductValue } = useProductFormContext();
  const {
    productOptionsForm: { getValues: getOptionsValue, setError }
  } = useProductOptionsFormContext();
  const {
    updateProductMutation,
    updateProductOptionsMutate,
    addProductOptionMutate,
    isSuccessAddNewOptions,
    isSuccessUpdateProduct,
    isSuccessUpdateProductOptions
  } = useUpdateProductMutationContext();

  const setSelectUpdateProduct =
    useSetRecoilState<ProductListValues>(updateProductState);

  const hasOptions = ({ options }: CreateProductOptionValue) => {
    if (options.length === 0) {
      setError("options", {
        message: "반드시 기본 옵션을 들어가야합니다."
      });
      return false;
    }

    setError("options", { message: "" });
    return true;
  };

  const handleSubmitUpdateProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const options = getOptionsValue("options");
    const isOption = hasOptions({ options });
    if (!isOption) {
      return;
    }
    setIsModal(true);
  };

  useEffect(() => {
    if (product && product.options) {
      setSelectUpdateProduct((pre) => ({
        ...pre,
        options: product?.options?.map((value) => ({
          id: value.id,
          name: value.name
        }))
      }));
    }
  }, [product, product?.options, setSelectUpdateProduct]);

  useEffect(() => {
    if (confirm) {
      const options = getOptionsValue("options");
      const product = getProductValue();
      const addOptions = options
        .filter((value) => !value.optionId)
        .map((item) => ({
          productId: Number(productId),
          name: item.name
        }));

      const updateOptions = options.filter(
        (value) => value.optionId !== undefined
      );

      if (options.length !== 0) {
        const updateData = {
          productId: Number(productId),
          name: product.name,
          price: Number(product.price),
          description: product.description
        };
        updateProductMutation(
          { products: updateData },
          {
            onSuccess: () => {
              updateProductOptionsMutate({ option: updateOptions });
              addProductOptionMutate({ option: addOptions });
            }
          }
        );
        return;
      }
    }
  }, [confirm]);

  useEffect(() => {
    if (
      isSuccessAddNewOptions &&
      isSuccessUpdateProduct &&
      isSuccessUpdateProductOptions
    ) {
      setIsModal(false);
      navigate(`/admin/${userId}/store/${storeId}/product/manage-product`);
    }
  }, [
    isSuccessAddNewOptions,
    isSuccessUpdateProduct,
    isSuccessUpdateProductOptions
  ]);

  return (
    <ProductForm handleSubmit={handleSubmitUpdateProduct} product={product} />
  );
};

export default UpdateProductFormContainer;
