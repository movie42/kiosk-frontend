import { OrderStatusType } from "@/lib/state";
import { IOrderSelectedItem } from "@/lib/state/productItemState";

export interface OrderProductInput {
  productId: number;
  amount: number;
  productOptionId: number;
}

export interface AddOrderInput {
  storeId: number;
  imp_uid: string;
  merchant_uid: string;
  products: OrderProductInput[];
  type: OrderStatusType;
}
