import { selectMenuListState } from "@/lib/state";
import { ProductListValues } from "@/lib/state/productItemState";
import { useState } from "react";
import { useRecoilState } from "recoil";

interface OrderSelectedItemProps {
  selected: ProductListValues;
  count: number;
  selectedOption: {
    name: string;
    id: number;
  };
}

export const useHandleOrderItem = () => {
  const [orderItem, setOrderItem] = useRecoilState(selectMenuListState);
  const [orderDone, setOrderDone] = useState(false);

  const orderSelectedItem = ({
    selected,
    count,
    selectedOption
  }: OrderSelectedItemProps) => {
    const [sameMenu] = orderItem.filter(
      (ordered) =>
        ordered.productId === selected.id &&
        ordered.option === selectedOption.name
    );

    if (!sameMenu || sameMenu.option !== selectedOption.name) {
      setOrderItem((orderItem) =>
        [
          ...orderItem,
          {
            productId: selected.id,
            name: selected.name,
            option: selectedOption.name,
            optionId: selectedOption.id,
            price: selected.price,
            totalCount: count,
            totalPrice: selected.price * count,
            imageUrl: selected.imageUrl
          }
        ].sort((a: any, b: any) => {
          if (a.productId === b.productId) {
            return a?.option > b?.option ? 1 : -1;
          }
          return a.productId - b.productId;
        })
      );
      setOrderDone(true);
    }

    if (sameMenu?.option === selectedOption.name) {
      setOrderItem((orderItem) =>
        [
          ...orderItem.filter((el) => el !== sameMenu),
          {
            ...sameMenu,
            totalCount: sameMenu.totalCount + count,
            totalPrice: sameMenu.totalPrice + sameMenu.price * count
          }
        ].sort((a: any, b: any) => {
          if (a.productId === b.productId) {
            return a?.option > b?.option ? 1 : -1;
          }
          return a.productId - b.productId;
        })
      );
      setOrderDone(true);
    }
  };

  return { orderSelectedItem, orderDone };
};
