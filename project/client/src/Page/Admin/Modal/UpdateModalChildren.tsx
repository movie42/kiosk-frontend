import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ProductListValues } from "../../../mockup/productList";
import {
  productListState,
  selectOptionState,
  selectProductListState,
} from "../../../state/productItemState";
import { SelectOption } from "../../../Page/Admin/AdminManageProductItemList";
import UpdateModalForm from "../UpdateModalForm";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 27rem 0.5fr;
`;

const StateInfoContainer = styled.div``;

const ButtonContainer = styled.div`
  button {
    cursor: pointer;
    font-size: 2rem;
    border: 0;
    padding: 0.8rem 1.3rem;
    border-radius: 0.5rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    &:nth-child(1) {
      background-color: ${(props) => props.theme.color.gray200};
    }

    &:nth-child(2) {
      background-color: ${(props) => props.theme.color.error500};
    }

    &:not(:first-child) {
      margin-left: 0.8rem;
    }
  }
`;

const FormContainer = styled.div`
  box-sizing: border-box;
  overflow-y: auto;
  form {
    box-sizing: border-box;
    .product-form-container {
      box-sizing: border-box;
      padding: 1rem 1rem;
      border: 1px solid ${(props) => props.theme.color.gray200};
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }
  }
`;

interface ISelectModalChildrenProps<T> {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  items?: Array<T>;
}

const UpdateModalChildren = ({
  setModal,
  items,
}: ISelectModalChildrenProps<ProductListValues>) => {
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
    setSelectOption({ option: "none" });
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

      if (selectProduct) {
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
      }
      return product;
    });

    setProductList(newProductList);
    setModal(false);
    setSelectList([]);
    setSelectOption({ option: "none" });
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
  form 필드 선택시 유저가 입력하려는 필드가 선택됐다는 것을 표시하기 위한 코드지만 
  useRef를 이용해서 조금 더 손쉽게 수정이 가능한 것으로 보이기 때문에 
  먼저 수정 데이터를 처리하는 로직이 끝난 다음에 바로 수정할 해야한다!!!!!
  
  */
  // const [currentSelectFormContainer, setCurrentSelectFormContainer] =
  //   useState("");

  // const selectFormContainer = (e: React.MouseEvent<HTMLFieldSetElement>) => {
  //   const id = e.currentTarget.dataset.id;
  //   if (id) {
  //     setCurrentSelectFormContainer(id);
  //   }
  // };

  // useEffect(() => {
  //   if (currentSelectFormContainer) {
  //     const containerList = document.querySelectorAll<HTMLDivElement>(
  //       ".product-form-container",
  //     );
  //     if (containerList) {
  //       const [selected] = Array.from(containerList)
  //         .map((item) => {
  //           item.style.backgroundColor = "white";
  //           return item;
  //         })
  //         .filter((value) => value.dataset.id === currentSelectFormContainer);
  //       selected.style.backgroundColor = "#E0FFDF";
  //     }
  //   }
  // }, [currentSelectFormContainer]);

  return (
    <>
      <Wrapper>
        <StateInfoContainer>
          <h1>수정하기</h1>
          <h2>수정할 내용을 입력하고 버튼을 누르세요.</h2>
          <p>수정 할 내용을 입력하지 않으면 이전 내용으로 저장됩니다.</p>
        </StateInfoContainer>
        <FormContainer>
          <form>
            {selectList?.map((item) => {
              const fieldName = item.id;
              return (
                <UpdateModalForm
                  fieldName={fieldName}
                  register={register}
                  item={item}
                />
              );
            })}
          </form>
        </FormContainer>
        <ButtonContainer>
          <button onClick={handleModal}>돌아가기</button>
          <button onClick={selectUpdateItemsSubmitHandler}>수정하기</button>
        </ButtonContainer>
      </Wrapper>
    </>
  );
};

export default UpdateModalChildren;
