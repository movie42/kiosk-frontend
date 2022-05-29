export interface Order {
  id: number;
  orderNumber: number;
  orders: OrderList[];
}

export enum OrderState {
  ALL = "all",
  ORDER = "order",
  COMPLETE = "complete",
  CANCEL = "cancel",
}

export interface OrderList {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  optionID: "기본" | "매운맛" | "아주 매운맛";
  state: OrderState;
}

export const orderList: Order[] = [
  {
    id: 1,
    orderNumber: 1001,
    orders: [
      {
        productId: 1,
        productName: "소고기 덮밥",
        quantity: 1,
        price: 8000,
        optionID: "기본",
        state: OrderState.COMPLETE,
      },
      {
        productId: 1,
        productName: "소고기 덮밥",
        quantity: 1,
        price: 8000,
        optionID: "매운맛",
        state: OrderState.COMPLETE,
      },
    ],
  },
  {
    id: 2,
    orderNumber: 1002,
    orders: [
      {
        productId: 2,
        productName: "장어 덮밥",
        quantity: 3,
        price: 10000,
        optionID: "기본",
        state: OrderState.ORDER,
      },
    ],
  },
  {
    id: 4,
    orderNumber: 1003,
    orders: [
      {
        productId: 3,
        productName: "돼지고기 덮밥",
        quantity: 2,
        price: 8000,
        optionID: "기본",
        state: OrderState.ORDER,
      },
      {
        productId: 1,
        productName: "소고기 덮밥",
        quantity: 1,
        price: 8000,
        optionID: "매운맛",
        state: OrderState.ORDER,
      },
      {
        productId: 1,
        productName: "소고기 덮밥",
        quantity: 2,
        price: 16000,
        optionID: "아주 매운맛",
        state: OrderState.CANCEL,
      },
    ],
  },

  {
    id: 7,
    orderNumber: 1005,
    orders: [
      {
        productId: 1,
        productName: "소고기 덮밥",
        quantity: 2,
        price: 16000,
        optionID: "아주 매운맛",
        state: OrderState.CANCEL,
      },
    ],
  },
  {
    id: 8,
    orderNumber: 1004,
    orders: [
      {
        productId: 3,
        productName: "돼지고기 덮밥",
        quantity: 2,
        price: 16000,
        optionID: "아주 매운맛",
        state: OrderState.CANCEL,
      },
    ],
  },

  {
    id: 9,
    orderNumber: 2001,
    orders: [
      {
        productId: 1,
        productName: "소고기 덮밥",
        quantity: 1,
        price: 8000,
        optionID: "매운맛",
        state: OrderState.CANCEL,
      },
    ],
  },
  {
    id: 10,
    orderNumber: 2002,
    orders: [
      {
        productId: 1,
        productName: "소고기 덮밥",
        quantity: 1,
        price: 8000,
        optionID: "기본",
        state: OrderState.CANCEL,
      },
    ],
  },
];
