import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  useAddProductOptionsMutation,
  useUpdateProductMutation,
  useUpdateProductOptionsMutation
} from "../../../../lib/generated/graphql";
import graphqlReqeustClient from "../../../../lib/graphqlRequestClient";
import { ProductListValues } from "../../../../lib/state/productItemState";
import {
  selectOptionState,
  Option,
  updateProductState
} from "../../../../lib/state/productItemState";
import { userState } from "../../../../lib/state/userState";

import UpdateModalForm from "../../Product/UpdateModalForm";

const Wrapper = styled.div`
  display: grid;
  overflow-y: hidden;
  grid-template-rows: 1fr 5fr 0.5fr;
`;

const StateInfoContainer = styled.div`
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  button {
    cursor: pointer;
    font-size: 2rem;
    border: 0;
    padding: 0.8rem 1.3rem;
    border-radius: 0.5rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    &.cancel-button {
      background-color: ${(props) => props.theme.color.gray200};
      margin-right: 0.8rem;
    }
    &.confirm-button {
      background-color: ${(props) => props.theme.color.secondary500};
    }
  }
`;

const FormContainer = styled.div`
  box-sizing: border-box;
  overflow-y: auto;
  form {
    box-sizing: border-box;
  }
`;

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
    <>
      <Wrapper>
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
      </Wrapper>
    </>
  );
};

export default UpdateModalChildren;
