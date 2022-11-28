import { IOrderSelectedItem } from "../state/productItemState";

const calculateTotalAmount = (list: IOrderSelectedItem[], property: string) => {
  const result = list
    .map((x) => x[property as keyof IOrderSelectedItem])
    .reduce((acc, obj) => {
      if (typeof acc === "number" && typeof obj === "number") {
        return acc + obj;
      }
    }, 0);
  return result as number;
};

export default calculateTotalAmount;
