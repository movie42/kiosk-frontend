import { atom, selector } from "recoil";

export enum OrderStatusType {
  All = "ALL",
  Canceled = "CANCELED",
  Complete = "COMPLETE",
  Done = "DONE",
  Ready = "READY",
}

export interface OrderProducts {
  productId: number;
  orderId: number;
  amount: number;
  productOptionIds: number[];
}

export interface Order {
  id: string;
  storeId: number;
  number: number;
  price: number;
  status: OrderStatusType;
  orderProducts: OrderProducts[];
}

export interface ProductInfo {
  productId: number;
  orderId: number;
  amount: number;
  productName: string;
  productPrice: number;
  optionId: string;
  optionName: string;
}

export interface NewOrder {
  id: string;
  storeId: number;
  number: number;
  price: number;
  status: OrderStatusType;
  orderProducts: ProductInfo[] | undefined[];
}

export const orderStatusState = atom<OrderStatusType>({
  key: "orderStatusState",
  default: OrderStatusType.Ready,
});

export const orderStateForFrontend = atom<NewOrder[]>({
  key: "orderStateForFrontend",
  default: [],
});

export const getOrderForFrontend = selector<NewOrder[]>({
  key: "getOrderForFrontend",
  get: ({ get }) => {
    const orders = get(orderStateForFrontend);
    const orderStatus = get(orderStatusState);

    switch (orderStatus) {
      case "ALL":
        return orders.filter((item) => item.status === OrderStatusType.All);
      case "READY":
        return orders.filter((item) => item.status === OrderStatusType.Ready);
      case "DONE":
        return orders.filter((item) => item.status === OrderStatusType.Done);
      case "COMPLETE":
        return orders.filter(
          (item) => item.status === OrderStatusType.Complete,
        );
      case "CANCELED":
        return orders.filter(
          (item) => item.status === OrderStatusType.Canceled,
        );
      default:
        return orders;
    }
  },
});

export const orderType = atom({
  key: "orderType",
  default: "",
});
