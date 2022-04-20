import React, {
  ReactElement,
  ReactHTMLElement,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ProductListValues } from "../../mockup/productList";
import {
  productListState,
  selectProductListState,
} from "../../state/productItemState";
import { SelectOption } from "../../Page/Admin/AdminManageProductItemList";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 27rem 0.5fr;
`;

const StateInfoContainer = styled.div``;
const FormContainer = styled.div`
  box-sizing: border-box;
  overflow-y: auto;
  form {
    box-sizing: border-box;
    .product-form-container {
      box-sizing: border-box;
      padding: 1rem 1rem;
      border: 1px solid ${(props) => props.theme.netural};
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }
  }
`;

const LabelInputContainer = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 8fr;
  margin-bottom: 0.7rem;
  label {
    font-size: 1.8rem;
  }
  input {
    width: 100%;
  }
  textarea {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  button {
    cursor: pointer;
    font-size: 2rem;
    border: 0;
    padding: 0.8rem 1.3rem;
    border-radius: 0.5rem;
    color: ${(props) => props.theme.white};
    &:nth-child(1) {
      background-color: ${(props) => props.theme.netural};
    }

    &:nth-child(2) {
      background-color: ${(props) => props.theme["warning-dark"]};
    }

    &:not(:first-child) {
      margin-left: 0.8rem;
    }
  }
`;

interface ISelectModalChildrenProps<T> {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectOption: React.Dispatch<React.SetStateAction<SelectOption>>;
  items?: Array<T>;
}

const UpdateModalChildren = ({
  setModal,
  setSelectOption,
  items,
}: ISelectModalChildrenProps<ProductListValues>) => {
  const [currentSelectFormContainer, setCurrentSelectFormContainer] =
    useState("");
  const [selectList, setSelectList] = useRecoilState<ProductListValues[]>(
    selectProductListState,
  );
  const [productList, setProductList] = useRecoilState(productListState);
  const { register, setError: errors, handleSubmit } = useForm();

  const handleModal = () => {
    setSelectList([]);
    setProductList((preValue) => [
      ...preValue.map((value) => ({ ...value, select: false })),
    ]);
    setModal(false);
    setSelectOption({ option: "none" });
  };

  const selectUpdateItemsSubmitHandler = handleSubmit((data) => {
    console.log(data);
    console.log(register);
    setModal(false);
    setSelectList([]);
  });

  const selectFormContainer = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.dataset.id;
    if (id) {
      setCurrentSelectFormContainer(id);
    }
  };

  useEffect(() => {
    if (currentSelectFormContainer) {
      const containerList = document.querySelectorAll<HTMLDivElement>(
        ".product-form-container",
      );
      if (containerList) {
        const [selected] = Array.from(containerList)
          .map((item) => {
            item.style.backgroundColor = "white";
            return item;
          })
          .filter((value) => value.dataset.id === currentSelectFormContainer);
        selected.style.backgroundColor = "#E0FFDF";
      }
    }
  }, [currentSelectFormContainer]);

  useEffect(() => {
    if (items) {
      setSelectList(
        items
          .map((value) => ({ ...value, select: true }))
          .sort((a, b) => (a.id > b.id ? 1 : -1)),
      );
    }
  }, []);

  return (
    <>
      <Wrapper>
        <StateInfoContainer>
          <h1>수정하기</h1>
          <h2>수정할 내용을 입력하고 버튼을 누르세요.</h2>
          <p>수정 할 내용을 입력하지 않으면 이전 내용으로 저장됩니다.</p>
        </StateInfoContainer>
        <FormContainer>
          {selectList?.map((item, index) => (
            <form key={item.id} ref={`register${item.id}`}>
              <div
                className="product-form-container"
                key={item.id}
                data-id={item.id}
                onClick={selectFormContainer}
              >
                <LabelInputContainer>
                  <label htmlFor="">상품 썸네일</label>
                  <input type="file" />
                </LabelInputContainer>
                <LabelInputContainer>
                  <label>상품 이름</label>
                  <input
                    type="text"
                    defaultValue={item.name}
                    {...register(`productName`)}
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <label>상품 가격</label>
                  <input
                    type="number"
                    defaultValue={item.price}
                    {...register(`productPrice`)}
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <label>상품 옵션</label>
                  <input
                    type="text"
                    defaultValue={item.option}
                    {...register(`productOption`)}
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <label>상품 정보</label>
                  <textarea
                    defaultValue={item.desc}
                    {...register(`productDetail`)}
                  ></textarea>
                </LabelInputContainer>
              </div>
            </form>
          ))}
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
