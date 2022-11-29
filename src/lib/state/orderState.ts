import { atom, selector } from "recoil";

import { NewOrder, OrderStatusValue } from "./interface";

export const orderStatusState = atom<OrderStatusValue>({
  key: "orderStatusState",
  default: "READY"
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
        return orders.filter((item) => item.status === "READY");
      case "DONE":
        return orders.filter((item) => item.status === "DONE");
      case "COMPLETE":
        return orders.filter((item) => item.status === "COMPLETE");
      case "CANCELED":
        return orders.filter((item) => item.status === "CANCELED");
      default:
        return orders;
    }
  }
});

export const orderType = atom({
  key: "orderType",
  default: ""
});
