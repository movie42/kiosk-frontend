export interface Order {
  id: number;
  orderNumber: number;
  orders: OrderList[];
}

export enum OrderState {
  all = "all",
  order = "order",
  complete = "complete",
  cancel = "cancel",
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
        state: OrderState.complete,
      },
      {
        productId: 1,
        productName: "소고기 덮밥",
        quantity: 1,
        price: 8000,
        optionID: "매운맛",
        state: OrderState.complete,
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
        price: 30000,
        optionID: "기본",
        state: OrderState.order,
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
        state: OrderState.order,
      },
      {
        productId: 1,
        productName: "소고기 덮밥",
        quantity: 1,
        price: 8000,
        optionID: "매운맛",
        state: OrderState.order,
      },
      {
        productId: 1,
        productName: "소고기 덮밥",
        quantity: 2,
        price: 16000,
        optionID: "아주 매운맛",
        state: OrderState.order,
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
        state: OrderState.cancel,
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
        state: OrderState.cancel,
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
        state: OrderState.cancel,
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
        state: OrderState.cancel,
      },
    ],
  },
];
