import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ProductListValues } from "../../mockup/productList";
import {
  productListState,
  selectProductListState,
} from "../../state/productItemState";
import { SelectOption } from "./AdminManageProductItemList";
import Modal from "../../Components/Modals/Modal";
import DeleteModalChildren from "../../Components/Modals/DeleteModalChildren";
import UpdateModalChildren from "../../Components/Modals/UpdateModalChildren";

const MenuBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 2rem;
  background-color: ${(props) => props.theme.color.backgroundBlack100};
  height: 6rem;

  h2 {
    font-size: 2.2rem;
    font-weight: bold;
    color: ${(props) => props.theme.color.fontColorWhite};
  }

  button {
    cursor: pointer;
    padding: 0.7rem 2rem;
    border: 0;
    font-size: 2.4rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    border-radius: 0.3rem;
    line-height: 2.8rem;
    background-color: ${(props) => props.theme.color.error500};
  }
`;

interface ISateMenuBarProps {
  selectItems: Array<ProductListValues>;
  selectOption: SelectOption;
  setSelectOption: React.Dispatch<React.SetStateAction<SelectOption>>;
}

const StateMenuBar: React.FC<ISateMenuBarProps> = ({
  selectItems,
  selectOption,
  setSelectOption,
}) => {
  const [isModal, setModal] = useState(false);
  const [productList, setProductList] = useRecoilState(productListState);
  const [selectList, setSelectList] = useRecoilState<ProductListValues[]>(
    selectProductListState,
  );

  const handleModalAppear = () => {
    setModal(!isModal);
  };

  const updateSelectOptionToNone = () => {
    setSelectOption({ option: "none" });
    setProductList((preValue) => [
      ...preValue.map((item) => ({ ...item, select: false })),
    ]);
    setSelectList([]);
  };

  return (
    <>
      {isModal &&
        (selectOption.option === "delete" ? (
          <Modal strach={true}>
            <DeleteModalChildren
              setModal={setModal}
              setSelectOption={setSelectOption}
              items={selectItems}
            />
          </Modal>
        ) : (
          <Modal strach={true}>
            <UpdateModalChildren
              setModal={setModal}
              setSelectOption={setSelectOption}
              items={selectItems}
            />
          </Modal>
        ))}

      <MenuBarContainer>
        {selectOption.option === "delete" ? (
          <>
            <h2>{selectItems.length}개의 상품을 삭제하려면 버튼을 누르세요.</h2>
            <button onClick={updateSelectOptionToNone}>취소하기</button>
            <button onClick={handleModalAppear}>삭제하기</button>
          </>
        ) : (
          <>
            <h2>{selectItems.length}개의 상품을 수정하려면 버튼을 누르세요.</h2>
            <button onClick={updateSelectOptionToNone}>취소하기</button>
            <button onClick={handleModalAppear}>수정하기</button>
          </>
        )}
      </MenuBarContainer>
    </>
  );
};

export default StateMenuBar;
