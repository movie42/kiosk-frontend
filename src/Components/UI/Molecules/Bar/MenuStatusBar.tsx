import { useRecoilState, useSetRecoilState } from "recoil";
import {
  ProductListValues,
  productListState,
  selectOptionState,
  selectProductListState
} from "@/lib/state";
import useModalHook from "@/lib/hooks/useModalHook";
import { CancelButton, ConfirmButton, MenuBarContainer } from "./styles";

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
