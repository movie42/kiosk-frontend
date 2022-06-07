import { OrderList } from "../../mockup/orderList";

export const calculatePrice = (
  price: OrderList["price"],
  quantity: OrderList["quantity"],
) => {
  const wholePrice = price * quantity;
  return wholePrice.toLocaleString("ko-KR");
};
