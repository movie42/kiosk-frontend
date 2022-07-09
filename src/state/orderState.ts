import { atom } from "recoil";
import { Order } from "../mockup/orderList";

export const orderState = atom<Order[]>({
  key: "orderState",
  default: [],
});

export const orderType = atom({
  key: "orderType",
  default: "",
});
