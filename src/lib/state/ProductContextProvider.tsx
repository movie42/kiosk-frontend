import { useCreateProduct } from "@/Page/Admin/hooks";
import { UseCreateProductReturn } from "@/Page/Admin/hooks/useCreateProduct";

import React, { createContext, useContext } from "react";
import {
  useFieldArray,
  UseFieldArrayReturn,
  useForm,
  UseFormReturn
} from "react-hook-form";
import { useParams } from "react-router-dom";

const ProductMutationContext = createContext<UseCreateProductReturn>(null!);
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
  createProductOptionsForm: UseFormReturn<ProductOptionValue, any>;
  createOptionFieldArray: UseFieldArrayReturn<
    ProductOptionValue,
    "options",
    "id"
  >;
}
const ProductOptionsContext = createContext<ProductOptionContextProps>(null!);

export const useProductMutationContext = () =>
  useContext(ProductMutationContext);

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
  const createProductMethod = useCreateProduct();
  const createProductForm = useProductForm();
  const createProductOptionsForm = useProductOptionsForm();
  const createOptionFieldArray = useFieldArray({
    name: "options",
    control: createProductOptionsForm.control
  });

  const optionValue = {
    createProductOptionsForm,
    createOptionFieldArray
  };

  return (
    <ProductMutationContext.Provider value={createProductMethod}>
      <ProductFormContext.Provider value={createProductForm}>
        <ProductOptionsContext.Provider value={optionValue}>
          {children}
        </ProductOptionsContext.Provider>
      </ProductFormContext.Provider>
    </ProductMutationContext.Provider>
  );
};
