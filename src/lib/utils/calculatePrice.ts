import { ProductInfo } from "../state";

const calculatePrice = (
  price?: ProductInfo["productPrice"],
  amount?: ProductInfo["amount"]
) => {
  if (price && amount) {
    const wholePrice = price * amount;
    return wholePrice.toLocaleString("ko-KR");
  }
};

export default calculatePrice;
