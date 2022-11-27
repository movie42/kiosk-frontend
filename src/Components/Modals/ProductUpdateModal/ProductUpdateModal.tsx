import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {
  useAddProductOptionsMutation,
  useUpdateProductMutation,
  useUpdateProductOptionsMutation
} from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";

import {
  ProductListValues,
  selectOptionState,
  Option,
  updateProductState,
  userState
} from "@/lib/state";

import Modal from "../Modal";
import UpdateModalForm from "./ProductUpdateForm";
import { ButtonContainer, FormContainer, StateInfoContainer } from "./styles";
import { ModalContainer } from "../styles";

interface ISelectModalChildrenProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const updateDefault = {
  id: 0,
  name: "",
  price: 0,
  isAvailable: false,
  options: [],
  imageUrl: "",
  description: ""
};

const UpdateModalChildren = ({ setIsModal }: ISelectModalChildrenProps) => {
  const { accessToken } = useRecoilValue(userState);
  const queryClient = useQueryClient();
  const setSelectOption = useSetRecoilState(selectOptionState);

  const { mutate: updateProductMutation } = useUpdateProductMutation(
    graphqlReqeustClient(accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getProducts");
      }
    }
  );

  const { isSuccess: isAddOptionSuccess, mutate: addProductOptionMutate } =
    useAddProductOptionsMutation(graphqlReqeustClient(accessToken));

  const {
    isSuccess: isUpdateProductSuccess,
    mutate: updateProductOptionsMutate
  } = useUpdateProductOptionsMutation(graphqlReqeustClient(accessToken));

  const [selectUpdateProduct, setSelectUpdateProduct] =
    useRecoilState<ProductListValues>(updateProductState);

  const { register, handleSubmit, setValue } = useForm<ProductListValues>();

  const {
    register: optionRegister,
    control: optionControl,
    formState: { errors: optionErrors },
    setValue: setOptionValue,
    setError: optionSetError,
    getValues: optionValue
  } = useForm<{
    options: {
      optionId: number;
      name: string;
    }[];
  }>();

  const {
    fields: optionsFields,
    append: optionsAppend,
    remove: optionsRemove
  } = useFieldArray({
    control: optionControl,
    name: "options"
  });

  const onCancel = () => {
    setSelectUpdateProduct(updateDefault);
    setSelectOption({ options: Option.NONE });
    setIsModal(false);
  };

  const selectUpdateItemsSubmitHandler = handleSubmit((data) => {
    const options = optionValue("options");

    const addOptions = options
      .filter((value) => value.optionId === undefined)
      .map((item) => ({ productId: selectUpdateProduct.id, name: item.name }));

    const updateOptions = options.filter(
      (value) => value.optionId !== undefined
    );

    if (options.length !== 0) {
      const updateData = {
        productId: selectUpdateProduct.id,
        name: data.name,
        price: Number(data.price),
        imageUrl: (data.imageUrl as string) || undefined,
        description: (data.description as string) || undefined
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

    optionSetError("options", {
      message: "반드시 하나 이상의 옵션이 있어야합니다."
    });
  });

  useEffect(() => {
    if (selectUpdateProduct.options) {
      const setOptions = selectUpdateProduct.options.map((value) => ({
        optionId: value.id,
        name: value.name
      }));

      setOptionValue("options", setOptions);
    }
  }, []);

  useEffect(() => {
    if (isAddOptionSuccess && isUpdateProductSuccess) {
      setIsModal(false);
      setSelectUpdateProduct(updateDefault);
      queryClient.invalidateQueries("getProducts");
    }
  }, [isAddOptionSuccess, isUpdateProductSuccess]);

  return (
    <Modal>
      <ModalContainer>
        <StateInfoContainer>
          <h1>수정하기</h1>
          <p>
            수정할 내용을 입력하고 버튼을 누르세요. 수정 할 내용을 입력하지
            않으면 이전 내용으로 저장됩니다.
          </p>
        </StateInfoContainer>
        <FormContainer>
          <form>
            <UpdateModalForm
              register={register}
              setValue={setValue}
              optionsFields={optionsFields}
              optionsRegister={optionRegister}
              optionsError={optionErrors}
              optionsAppend={optionsAppend}
              optionsRemove={optionsRemove}
            />
          </form>
        </FormContainer>
        <ButtonContainer>
          <button className="cancel-button" onClick={onCancel}>
            돌아가기
          </button>
          <button
            className="confirm-button"
            onClick={selectUpdateItemsSubmitHandler}
          >
            수정하기
          </button>
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  );
};

export default UpdateModalChildren;
