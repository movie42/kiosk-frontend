export const ORDER_STATUS = {
  All: "ALL",
  Canceled: "CANCELED",
  Complete: "COMPLETE",
  Done: "DONE",
  Ready: "READY"
} as const;

export type OrderStatusType = typeof ORDER_STATUS;
export type OrderStatusKey = keyof OrderStatusType;
export type OrderStatusValue = OrderStatusType[OrderStatusKey];

export const OPTION = {
  NONE: "NONE",
  DELETE: "DELETE",
  UPDATE: "UPDATE"
} as const;

export type OptionType = typeof OPTION;
export type OptionKey = keyof OptionType;
export type OptionValue = OptionType[OptionKey];

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
  status: OrderStatusValue;
  orderProducts: OrderProducts[];
}

export interface ProductInfo {
  id: string;
  productId: number;
  orderId: number;
  amount: number;
  productName: string;
  productPrice: number;
  productOptionId: string;
  optionName: string;
}

export interface NewOrder {
  id: string;
  storeId: number;
  number: number;
  price: number;
  status: OrderStatusValue;
  orderProducts: ProductInfo[];
}

export interface ProductOptions {
  id: number;
  name: string;
}

export interface ProductListValues {
  id: number;
  name: string;
  price: number;
  options?: ProductOptions[];
  imageUrl?: string | null;
  description?: string | null;
  isAvailable?: boolean;
}

export interface Sales {
  name: string;
  price: number;
  option: string;
  quantity: number;
  createdAt: string;
}

export interface SalesInfo {
  productId: number;
  createdAt: string;
  sales: Sales[];
}

export interface SelectOption {
  options: OptionValue;
}

export interface storeStateProps {
  id?: string | undefined;
  name: string | undefined;
  code: string | undefined;
  address: string | undefined;
  phone: string | undefined;
  isAvailable?: boolean | undefined;
}

export interface UserState {
  id: string | undefined;
  name: string | undefined;
  email: string | undefined;
  isLogin: boolean;
  accessToken: string | undefined;
  refreshToken: string | undefined;
}
