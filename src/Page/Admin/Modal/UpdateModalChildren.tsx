import React, { useEffect, useRef, useState } from "react";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Product, useUpdateProductMutation } from "../../../generated/graphql";
import graphqlReqeustClient from "../../../lib/graphqlRequestClient";
import { ProductListValues } from "../../../mockup/productList";
import {
  productListState,
  selectOptionState,
  selectProductListState,
  Option,
  updateProductState,
} from "../../../state/productItemState";
import { userState } from "../../../state/userState";

import UpdateModalForm from "../Product/UpdateModalForm";

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
  description: "",
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
      },
    },
  );
  const [selectUpdateProduct, setSelectUpdateProduct] =
    useRecoilState<ProductListValues>(updateProductState);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<ProductListValues>();

  const onCancel = () => {
    setSelectUpdateProduct(updateDefault);
    setSelectOption({ options: Option.NONE });
    setIsModal(false);
  };

  const selectUpdateItemsSubmitHandler = handleSubmit((data) => {
    console.log(selectUpdateProduct.id);
    // TODO: productId가 잘못되었습니다. 백앤드에 수정을 요청해야합니다.
    const updateData = {
      productId: selectUpdateProduct.id,
      name: data.name,
      price: Number(data.price),
      imageUrl: (data.imageUrl as string) || undefined,
      description: (data.description as string) || undefined,
    };
    updateProductMutation(
      { products: updateData },
      {
        onSuccess: () => {
          setIsModal(false);
          setSelectUpdateProduct(updateDefault);
        },
      },
    );
  });

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
            <UpdateModalForm register={register} setValue={setValue} />
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
