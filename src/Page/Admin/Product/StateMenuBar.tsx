import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ProductListValues } from "../../../mockup/productList";
import {
  productListState,
  selectOptionState,
  selectProductListState,
  Option,
  SelectOption,
} from "../../../state/productItemState";

import Modal from "../../../Components/Modals/Modal";
import DeleteModalChildren from "../Modal/DeleteModalChildren";
import useModalHook from "../../../utils/customHooks/useModalHook";
import { Headline3, SubTitle2 } from "../../../mixin";

const MenuBarContainer: React.FC<SelectOption> = styled.div<SelectOption>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background-color: ${(props) => props.theme.color.background100};
  color: ${(props) => props.theme.color.fontColorBlack};
  height: 6rem;
  z-index: 20;
  border: 1px solid ${(props) => props.theme.color.gray300};
  h2 {
    ${SubTitle2}
  }

  button {
    cursor: pointer;
    padding: 0.7rem 2rem;
    border: 0;
    font-size: 2.4rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    border-radius: 0.3rem;
    line-height: 2.8rem;

    &.confirm-button {
      background-color: ${(props) =>
        props.options === "delete"
          ? props.theme.color.error500
          : props.theme.color.secondary500};
    }
    &.cancel-button {
      margin-right: 1.3rem;
      background-color: ${(props) => props.theme.color.gray400};
    }
  }
`;

const StateMenuBar = () => {
  const [selectOption, setSelectOption] = useRecoilState(selectOptionState);
  const { isModal, setIsModal } = useModalHook();
  const [selectList, setSelectList] = useRecoilState<ProductListValues[]>(
    selectProductListState,
  );
  const setProductList = useSetRecoilState(productListState);

  const handleModalAppear = () => {
    setIsModal(!isModal);
  };

  const updateSelectOptionToNone = () => {
    setSelectOption({ options: Option.NONE });
    setProductList((preValue) => [
      ...preValue.map((item) => ({ ...item, select: false })),
    ]);
    setSelectList([]);
  };

  return (
    <>
      {isModal && selectOption.options === "delete" && (
        <Modal strach={true}>
          <DeleteModalChildren setIsModal={setIsModal} />
        </Modal>
      )}
      <MenuBarContainer options={selectOption.options}>
        {selectOption.options === "delete" && (
          <>
            <h2>{selectList.length}개의 상품을 삭제하려면 버튼을 누르세요.</h2>
            <div>
              <button
                className="cancel-button"
                onClick={updateSelectOptionToNone}
              >
                취소하기
              </button>
              <button className="confirm-button" onClick={handleModalAppear}>
                삭제하기
              </button>
            </div>
          </>
        )}
      </MenuBarContainer>
    </>
  );
};

export default StateMenuBar;
