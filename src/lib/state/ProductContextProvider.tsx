import {
  useCreateProduct,
  useUpdateProduct,
  UseCreateProductReturn,
  UseUpdateProductReturn
} from "@/Page/Admin/hooks";

import React, { createContext, useContext } from "react";
import {
  useFieldArray,
  UseFieldArrayReturn,
  useForm,
  UseFormReturn
} from "react-hook-form";
import { useParams } from "react-router-dom";

const CreateProductMutationContext = createContext<UseCreateProductReturn>(
  null!
);
const UpdateProductMutationContext = createContext<UseUpdateProductReturn>(
  null!
);

const ProductFormContext = createContext<
  UseFormReturn<ProductMutationValue, any>
>(null!);

interface ProductDefaultValue {
  imageUrl?: string;
  name: string;
  price: number;
  description?: string;
}

interface ProductMutationValue extends ProductDefaultValue {
  storeId: number;
}

export interface ProductOptionValue {
  options: { name: string }[];
}

interface ProductOptionContextProps {
  productOptionsForm: UseFormReturn<ProductOptionValue, any>;
  optionFieldArray: UseFieldArrayReturn<ProductOptionValue, "options", "id">;
}
const ProductOptionsContext = createContext<ProductOptionContextProps>(null!);

export const useCreateProductMutationContext = () =>
  useContext(CreateProductMutationContext);
export const useUpdateProductMutationContext = () =>
  useContext(UpdateProductMutationContext);
export const useProductFormContext = () => useContext(ProductFormContext);

export const useProductOptionsFormContext = () =>
  useContext(ProductOptionsContext);

const useProductForm = () => {
  const { storeId } = useParams();
  return useForm<ProductMutationValue>({
    defaultValues: {
      storeId: storeId ? Number(storeId) : 0,
      imageUrl: "",
      name: "",
      price: 0,
      description: ""
    }
  });
};

const useProductOptionsForm = () =>
  useForm<ProductOptionValue>({
    defaultValues: {
      options: [{ name: "기본" }]
    }
  });

interface ProductContextProviderProps {
  children: React.ReactNode;
}

export const ProductContextProvider = ({
  children
}: ProductContextProviderProps) => {
  const updateProductMethod = useUpdateProduct();
  const createProductMethod = useCreateProduct();
  const productForm = useProductForm();
  const productOptionsForm = useProductOptionsForm();
  const optionFieldArray = useFieldArray({
    name: "options",
    control: productOptionsForm.control
  });

  const optionValue = {
    productOptionsForm,
    optionFieldArray
  };

  return (
    <UpdateProductMutationContext.Provider value={updateProductMethod}>
      <CreateProductMutationContext.Provider value={createProductMethod}>
        <ProductFormContext.Provider value={productForm}>
          <ProductOptionsContext.Provider value={optionValue}>
            {children}
          </ProductOptionsContext.Provider>
        </ProductFormContext.Provider>
      </CreateProductMutationContext.Provider>
    </UpdateProductMutationContext.Provider>
  );
};
