import {
  useCreateProduct,
  UseCreateProductReturn,
  useUpdateProduct,
  UseUpdateProductReturn
} from "@/Page/Admin/hooks";

import React, { createContext, useContext } from "react";
import {
  useFieldArray,
  UseFieldArrayReturn,
  useForm,
  UseFormReturn
} from "react-hook-form";

interface ProductDefaultValue {
  imageUrl?: string;
  name: string;
  price: number;
  description?: string;
}

interface ProductMutationValue extends ProductDefaultValue {
  storeId: number;
}

export interface CreateProductOptionValue {
  options: { optionId: number; name: string }[];
}

interface ProductOptionContextProps {
  productOptionsForm: UseFormReturn<CreateProductOptionValue, any>;
  optionFieldArray: UseFieldArrayReturn<
    CreateProductOptionValue,
    "options",
    "id"
  >;
}

const CreateProductMutationContext = createContext<UseCreateProductReturn>(
  null!
);
const UpdateProductMutationContext = createContext<UseUpdateProductReturn>(
  null!
);
const ProductFormContext = createContext<
  UseFormReturn<ProductMutationValue, any>
>(null!);

const ProductOptionsContext = createContext<ProductOptionContextProps>(null!);

export const useCreateProductMutationContext = () =>
  useContext(CreateProductMutationContext);
export const useProductFormContext = () => useContext(ProductFormContext);
export const useProductOptionsFormContext = () =>
  useContext(ProductOptionsContext);
export const useUpdateProductMutationContext = () =>
  useContext(UpdateProductMutationContext);

interface ProductContextProviderProps {
  children: React.ReactNode;
}

export const ProductContextProvider = ({
  children
}: ProductContextProviderProps) => {
  const updateProductMethod = useUpdateProduct();
  const createProductMethod = useCreateProduct();
  const productForm = useForm<ProductMutationValue>();
  const productOptionsForm = useForm<CreateProductOptionValue>();
  const optionFieldArray = useFieldArray({
    name: "options",
    control: productOptionsForm.control
  });

  const optionValue = {
    productOptionsForm,
    optionFieldArray
  };

  return (
    <CreateProductMutationContext.Provider value={createProductMethod}>
      <UpdateProductMutationContext.Provider value={updateProductMethod}>
        <ProductFormContext.Provider value={productForm}>
          <ProductOptionsContext.Provider value={optionValue}>
            {children}
          </ProductOptionsContext.Provider>
        </ProductFormContext.Provider>
      </UpdateProductMutationContext.Provider>
    </CreateProductMutationContext.Provider>
  );
};
