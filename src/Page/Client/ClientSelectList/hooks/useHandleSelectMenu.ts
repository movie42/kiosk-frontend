import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  IOrderSelectedItem,
  selectMenuListState
} from "../../../../lib/state/productItemState";

const useHandleSelectMenu = () => {
  const navigate = useNavigate();
  const [totalSelectMenu, setTotalSelectMenu] =
    useRecoilState(selectMenuListState);

  const handleAddCount = (current: IOrderSelectedItem) => {
    const [selected] = totalSelectMenu.filter(
      (menu) =>
        menu.productId === current.productId && menu.option === current.option
    );

    const newCount = selected.totalCount + 1;

    setTotalSelectMenu((item) =>
      [
        ...item.filter((el) => el !== selected),
        {
          ...selected,
          totalCount: newCount,
          totalPrice: selected.price * newCount
        }
      ].sort((a: any, b: any) => {
        if (a.productId === b.productId) {
          return a?.option > b?.option ? 1 : -1;
        }
        return a.productId - b.productId;
      })
    );
  };

  const handleMinusCount = (current: IOrderSelectedItem) => {
    const [selected] = totalSelectMenu.filter(
      (menu) =>
        menu.productId === current.productId && menu.option === current.option
    );

    const newCount = selected.totalCount - 1;

    if (newCount < 1) {
      return;
    }

    setTotalSelectMenu((item) =>
      [
        ...item.filter((el) => el !== selected),
        {
          ...selected,
          totalCount: newCount,
          totalPrice: selected.price * newCount
        }
      ].sort((a: any, b: any) => {
        if (a.productId === b.productId) {
          return a?.option > b?.option ? 1 : -1;
        }
        return a.productId - b.productId;
      })
    );
  };

  const handleDelete = (current: IOrderSelectedItem) => {
    const [filtered] = totalSelectMenu.filter(
      (el) => el.productId === current.productId && el.option === current.option
    );
    const isDelete = window.confirm("정말 삭제하시겠습니까?");
    if (isDelete)
      setTotalSelectMenu((item) => [...item.filter((el) => el !== filtered)]);
  };

  const deleteAll = (
    userId: string | undefined,
    storeId: string | undefined
  ) => {
    const confirm = window.confirm("전체 주문을 취소하시겠습니까?");
    if (confirm) {
      setTotalSelectMenu([]);
      alert("전체 주문이 취소되었습니다");
      navigate(`/client/${userId}/${storeId}/menu`);
    }
  };

  return { handleMinusCount, handleAddCount, handleDelete, deleteAll };
};

export default useHandleSelectMenu;
