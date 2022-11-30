import { OrderStatusValue } from "@/lib/state/interface";

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
  type: OrderStatusValue;
}
