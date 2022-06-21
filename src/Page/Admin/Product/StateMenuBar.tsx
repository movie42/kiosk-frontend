import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled, { StyledComponent } from "styled-components";
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
import UpdateModalChildren from "../Modal/UpdateModalChildren";

const MenuBarContainer: React.FC<SelectOption> = styled.div<SelectOption>`
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

interface ISateMenuBarProps {
  selectItems: Array<ProductListValues>;
  selectOption: SelectOption;
}

const StateMenuBar: React.FC<ISateMenuBarProps> = ({
  selectItems,
  selectOption,
}) => {
  const setSelectOption = useSetRecoilState(selectOptionState);
  const [isModal, setModal] = useState(false);
  const setProductList = useSetRecoilState(productListState);
  const setSelectList = useSetRecoilState<ProductListValues[]>(
    selectProductListState,
  );

  const handleModalAppear = () => {
    setModal(!isModal);
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
      {isModal &&
        (selectOption.options === "delete" ? (
          <Modal strach={true}>
            <DeleteModalChildren setModal={setModal} items={selectItems} />
          </Modal>
        ) : (
          <Modal strach={true}>
            <UpdateModalChildren setModal={setModal} items={selectItems} />
          </Modal>
        ))}

      <MenuBarContainer options={selectOption.options}>
        {selectOption.options === "delete" ? (
          <>
            <h2>{selectItems.length}개의 상품을 삭제하려면 버튼을 누르세요.</h2>
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
        ) : (
          <>
            <h2>{selectItems.length}개의 상품을 수정하려면 버튼을 누르세요.</h2>
            <div>
              <button
                className="cancel-button"
                onClick={updateSelectOptionToNone}
              >
                취소하기
              </button>
              <button className="confirm-button" onClick={handleModalAppear}>
                수정하기
              </button>
            </div>
          </>
        )}
      </MenuBarContainer>
    </>
  );
};

export default StateMenuBar;
