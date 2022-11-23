import { atom, selector } from "recoil";
import { NewOrder, OrderStatusType } from "./interface";

export const orderStatusState = atom<OrderStatusType>({
  key: "orderStatusState",
  default: OrderStatusType.Ready
});

export const orderStateForFrontend = atom<NewOrder[]>({
  key: "orderStateForFrontend",
  default: []
});

export const getOrderForFrontend = selector<NewOrder[]>({
  key: "getOrderForFrontend",
  get: ({ get }) => {
    const orders = get(orderStateForFrontend);
    const orderStatus = get(orderStatusState);

    switch (orderStatus) {
      case "READY":
        return orders.filter((item) => item.status === OrderStatusType.Ready);
      case "DONE":
        return orders.filter((item) => item.status === OrderStatusType.Done);
      case "COMPLETE":
        return orders.filter(
          (item) => item.status === OrderStatusType.Complete
        );
      case "CANCELED":
        return orders.filter(
          (item) => item.status === OrderStatusType.Canceled
        );
      default:
        return orders;
    }
  }
});

export const orderType = atom({
  key: "orderType",
  default: ""
});
