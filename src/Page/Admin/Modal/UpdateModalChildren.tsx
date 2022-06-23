import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ProductListValues } from "../../../mockup/productList";
import {
  productListState,
  selectOptionState,
  selectProductListState,
  Option,
} from "../../../state/productItemState";

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
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  items?: ProductListValues[];
}

const UpdateModalChildren = ({
  setModal,
  items,
}: ISelectModalChildrenProps) => {
  const setSelectOption = useSetRecoilState(selectOptionState);
  const [productList, setProductList] = useRecoilState(productListState);
  const [selectList, setSelectList] = useRecoilState<ProductListValues[]>(
    selectProductListState,
  );
  const { register, setError: errors, handleSubmit } = useForm();

  const handleModal = () => {
    setSelectList([]);
    setProductList((preValue) => [
      ...preValue.map((value) => ({ ...value, select: false })),
    ]);
    setModal(false);
    setSelectOption({ options: Option.NONE });
  };

  const selectUpdateItemsSubmitHandler = handleSubmit((data: object) => {
    const dataArray = Object.entries(data);

    let selectValue: {
      name: string;
      desc: string;
      option?: any;
      price: number;
      thumbnail?: any;
    };

    const newProductList: ProductListValues[] = productList.map((product) => {
      const selectProduct = dataArray.some((updateProduct) => {
        const [key, value] = updateProduct;
        selectValue = value;
        return Number(key) === product.id;
      });

      if (!selectProduct) {
        return product;
      }

      if (selectValue.option !== "") {
        selectValue.option = selectValue.option.split(",");
      } else {
        selectValue.option = [];
      }

      if (selectValue.thumbnail.length === 0) {
        selectValue.thumbnail = null;
      } else {
        selectValue.thumbnail = selectValue.thumbnail[0].name;
      }

      return { ...product, ...selectValue, select: false };
    });

    setProductList(newProductList);
    setModal(false);
    setSelectList([]);
    setSelectOption({ options: Option.NONE });
  });

  useEffect(() => {
    if (items) {
      setSelectList(
        items
          .map((value) => ({ ...value, select: true }))
          .sort((a, b) => (a.id > b.id ? 1 : -1)),
      );
    }
  }, []);

  /*
  TODO: form 필드 선택시 백그라운드를 변경하는 로직 필요
  */

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
            {selectList?.map((item) => {
              const fieldName = item.id;
              return (
                <UpdateModalForm
                  fieldName={fieldName.toString()}
                  register={register}
                  item={item}
                />
              );
            })}
          </form>
        </FormContainer>
        <ButtonContainer>
          <button className="cancel-button" onClick={handleModal}>
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
