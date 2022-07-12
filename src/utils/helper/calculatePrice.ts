import { ProductInfo } from "../../state/orderState";

export const calculatePrice = (
  price?: ProductInfo["productPrice"],
  amount?: ProductInfo["amount"]
) => {
  if (price && amount) {
    const wholePrice = price * amount;
    return wholePrice.toLocaleString("ko-KR");
  }
};
