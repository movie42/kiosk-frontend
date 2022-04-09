import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { productList, ProductListValues } from "../../mockup/productList";
import {
  productListState,
  selectProductListState,
} from "../../state/productItemState";
import ProductItem from "./ProductItem";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;
const ModalContainer = styled.div`
  position: relative;
  width: 40rem;
  height: 40rem;
  background-color: ${(props) => props.theme.white};
  border-radius: 1rem;
  overflow-y: auto;
  padding: 2rem;
  h1 {
    font-size: 5rem;
    font-weight: bolder;
  }

  h2 {
    font-size: 2.3rem;
    word-break: keep-all;
    line-height: 1.2;
    margin-top: 0.7rem;
  }

  p {
    font-size: 1.6rem;
    margin-top: 0.7rem;
  }

  ul {
    margin-top: 1.5rem;
    li {
      display: flex;
      align-items: center;
      line-height: 1.6;

      label {
        margin-left: 0.5rem;
        font-size: 1.7rem;
      }
    }
  }
  div {
    position: absolute;
    bottom: 2rem;
    right: 2rem;

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
  }
`;

const SelectContainer: React.FC<{ select: boolean | undefined }> = styled.span<{
  select: boolean;
}>`
  background-color: ${(props) =>
    props.select ? props.theme.warning : props.theme.white};
  width: 1.2rem;
  height: 1.2rem;
  border: 3px solid ${(props) => props.theme.black};
  border-radius: 50%;
`;

const ModalWrapper = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.85;
  background-color: ${(props) => props.theme.black};
  overflow: hidden;
`;

interface IModalProps<T> {
  modalHeadtitle: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  items: Array<T>;
}

const Modal: React.FC<IModalProps<ProductListValues>> = ({
  setModal,
  modalHeadtitle,
  items,
}) => {
  const [selectList, setSelectList] = useRecoilState<ProductListValues[]>(
    selectProductListState,
  );
  const [productList, setProductList] = useRecoilState(productListState);
  const [isDeleteState, setDeleteState] = useState(false);

  const handleModal = () => {
    setSelectList([]);
    setProductList((preValue) => [
      ...preValue.map((value) => ({ ...value, select: false })),
    ]);
    setModal(false);
  };

  const selectDeleteItemsSubmitHandler = () => {
    const compare = (a: { id: number }, b: { id: number }) => a.id === b.id;
    const newProductList = productList.filter(
      (product) =>
        !selectList
          .filter((value) => value.select === true)
          .some((deleteProduct) => compare(product, deleteProduct)),
    );

    setProductList(newProductList);
    setModal(false);
    setSelectList([]);
  };

  const checkBoxChangeHandler = (event: React.MouseEvent<HTMLElement>) => {
    let id = event.currentTarget.dataset.id;
    const [unSelectItem] = selectList.filter(
      (value) => value.id === Number(id),
    );
    setSelectList((prevState) =>
      [
        ...prevState.filter((value) => value.id !== Number(id)),
        { ...unSelectItem, select: !unSelectItem.select },
      ].sort((a, b) => (a.id > b.id ? 1 : -1)),
    );
  };

  useEffect(() => {
    setSelectList(
      items
        .map((value) => ({ ...value, select: true }))
        .sort((a, b) => (a.id > b.id ? 1 : -1)),
    );
  }, []);

  return (
    <Wrapper>
      <ModalContainer>
        <h1>{modalHeadtitle}</h1>
        {!isDeleteState && (
          <>
            <h2>
              삭제 버튼을 누르면 복구할 수 없습니다. 삭제하기 전에 선택한 상품을
              확인하세요.
            </h2>
            <p>상품 이름을 클릭하면 삭제 여부를 다시 선택할 수 있습니다.</p>
          </>
        )}
        <ul>
          {selectList?.map((item) => (
            <li key={item.id} data-id={item.id} onClick={checkBoxChangeHandler}>
              <SelectContainer select={item.select} />
              <label htmlFor={`${item.id}`}>{item.name}</label>
            </li>
          ))}
        </ul>
        <div>
          <button onClick={handleModal}>돌아가기</button>
          <button onClick={selectDeleteItemsSubmitHandler}>삭제하기</button>
        </div>
      </ModalContainer>
      <ModalWrapper />
    </Wrapper>
  );
};

export default Modal;
