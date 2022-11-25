import { OrderStatusType } from "@/lib/state";
import {
  IOrderSelectedItem,
  ProductListValues
} from "@/lib/state/productItemState";

export interface IPaymentModalProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MenuListItemProps {
  item: IOrderSelectedItem;
}

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

export interface IMenuItemModalProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: ProductListValues[];
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  orderItem: IOrderSelectedItem[];
  setOrderItem: React.Dispatch<React.SetStateAction<IOrderSelectedItem[]>>;
}

export interface TotalOrderMenu {
  totalCount: number;
  totalPrice: number;
  label: string;
  goBack?: (value: any) => void;
  handler?: (value: any) => void;
}
