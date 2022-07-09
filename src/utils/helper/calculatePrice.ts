import { Order } from "../../state/orderState";

export const calculatePrice = (price: Order["price"]) => {
  return price.toLocaleString("ko-KR");
};
