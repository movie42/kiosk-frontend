import {
  useProductFormContext,
  useCreateProductMutationContext,
  useProductOptionsFormContext
} from "@/lib/state";
import { ProductOptionValue } from "@/lib/state/ProductContextProvider";
import { useEffect } from "react";

import { useParams } from "react-router-dom";
import ProductForm from "./ProductForm";

interface CreateProductFormContainerProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  confirm: boolean;
}

const CreateProductFormContainer = ({
  setIsModal,
  confirm
}: CreateProductFormContainerProps) => {
  const { storeId } = useParams();

  const { getValues } = useProductFormContext();
  const {
    productOptionsForm: { setError, getValues: getOptionsValue }
  } = useProductOptionsFormContext();
  const {
    addProductMutate,
    isProductAddSuccess,
    newProducts,
    addProductOptionMutate
  } = useCreateProductMutationContext();

  const hasOptions = ({ options }: ProductOptionValue) => {
    if (options.length === 0) {
      setError("options", {
        message: "반드시 기본 옵션을 들어가야합니다."
      });
      return false;
    }

    setError("options", { message: "" });
    return true;
  };

  const handleSubmitAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const options = getOptionsValue("options");
    const isOption = hasOptions({ options });
    if (!isOption) {
      return;
    }
    setIsModal(true);
  };

  useEffect(() => {
    if (confirm && storeId) {
      const products = {
        ...getValues(),
        price: Number(getValues().price),
        storeId: Number(storeId)
      };
      addProductMutate({ products });
    }
  }, [confirm, storeId]);

  useEffect(() => {
    if (isProductAddSuccess && newProducts?.addProducts) {
      const [productId] = newProducts.addProducts;
      const option = getOptionsValue("options").map((value) => ({
        productId,
        name: value.name
      }));
      addProductOptionMutate({ option });
    }
  }, [isProductAddSuccess]);

  return <ProductForm handleSubmit={handleSubmitAddProduct} />;
};

export default CreateProductFormContainer;
