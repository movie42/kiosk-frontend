import { useRecoilState, useSetRecoilState } from "recoil";
import {
  ProductListValues,
  productListState,
  selectOptionState,
  selectProductListState
} from "@/lib/state";
import useModalHook from "@/lib/hooks/useModalHook";
import StatusBar from "./StatusBar";

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
    <StatusBar
      statusMessage={`${selectList.length}개의 상품을 삭제하려면 버튼을 누르세요.`}
      confirmButtonProps={{
        onClick: handleModalAppear,
        children: "삭제하기",
        className: "confirm-button"
      }}
      cancelButtonProps={{
        onClick: updateSelectOptionToNone,
        children: "취소하기",
        className: "cancel-button"
      }}
    />
  );
};

export default MenuStatusBar;
