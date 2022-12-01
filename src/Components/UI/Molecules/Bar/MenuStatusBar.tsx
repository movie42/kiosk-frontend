import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

import {
  ProductListValues,
  productListState,
  selectOptionState,
  selectProductListState
} from "@/lib/state";
import useModalHook from "@/lib/hooks/useModalHook";
import { SubTitle2 } from "@/lib/styles/mixin";
import { BasicSquareButton } from "@/Components/UI/Atoms";

const MenuBarContainer = styled.div`
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
    border: 0;
    font-size: 2rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    border-radius: 0.3rem;
    line-height: 2.8rem;
  }
`;

const ConfirmButton = styled(BasicSquareButton)`
  background-color: ${(props) => props.theme.color.error500};
`;

const CancelButton = styled(BasicSquareButton)`
  background-color: ${(props) => props.theme.color.gray400};
  color: ${(props) => props.theme.color.fontColorWhite};
  margin-right: 0.3rem;
`;

const MenuStatusBar = () => {
  const [_, setSelectOption] = useRecoilState(selectOptionState);
  const { isModal, setIsModal } = useModalHook();
  const [selectList, setSelectList] = useRecoilState<ProductListValues[]>(
    selectProductListState
  );
  const setProductList = useSetRecoilState(productListState);

  const handleModalAppear = () => {
    setIsModal(!isModal);
  };

  const updateSelectOptionToNone = () => {
    setSelectOption({ options: "NONE" });
    setProductList((preValue) => [
      ...preValue.map((item) => ({ ...item, select: false }))
    ]);
    setSelectList([]);
  };

  return (
    <MenuBarContainer>
      <h2>{selectList.length}개의 상품을 삭제하려면 버튼을 누르세요.</h2>
      <div>
        <CancelButton onClick={updateSelectOptionToNone}>취소하기</CancelButton>
        <ConfirmButton onClick={handleModalAppear}>삭제하기</ConfirmButton>
      </div>
    </MenuBarContainer>
  );
};

export default MenuStatusBar;
