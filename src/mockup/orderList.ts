export interface Order {
  id: number;
  orderNumber: number;
  orderList: OrderList[];
}

export interface OrderList {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  optionID: "기본" | "매운맛" | "아주 매운맛";
  state: "order" | "complete" | "cancel";
}

export const orderList: Order[] = [
  {
    id: 1,
    orderNumber: 1001,
    orderList: [
      {
        productId: 1,
        productName: "소고기 덮밥",
        quantity: 1,
        price: 8000,
        optionID: "기본",
        state: "complete",
      },
      {
        productId: 1,
        productName: "소고기 덮밥",
        quantity: 1,
        price: 8000,
        optionID: "매운맛",
        state: "complete",
      },
    ],
  },
  {
    id: 2,
    orderNumber: 1002,
    orderList: [
      {
        productId: 2,
        productName: "장어 덮밥",
        quantity: 3,
        price: 30000,
        optionID: "기본",
        state: "order",
      },
    ],
  },
  {
    id: 4,
    orderNumber: 1003,
    orderList: [
      {
        productId: 3,
        productName: "돼지고기 덮밥",
        quantity: 2,
        price: 8000,
        optionID: "기본",
        state: "order",
      },
      {
        productId: 1,
        productName: "소고기 덮밥",
        quantity: 1,
        price: 8000,
        optionID: "매운맛",
        state: "order",
      },
      {
        productId: 1,
        productName: "소고기 덮밥",
        quantity: 2,
        price: 16000,
        optionID: "아주 매운맛",
        state: "cancel",
      },
    ],
  },

  {
    id: 7,
    orderNumber: 1005,
    orderList: [
      {
        productId: 1,
        productName: "소고기 덮밥",
        quantity: 2,
        price: 16000,
        optionID: "아주 매운맛",
        state: "cancel",
      },
    ],
  },
  {
    id: 8,
    orderNumber: 1004,
    orderList: [
      {
        productId: 3,
        productName: "돼지고기 덮밥",
        quantity: 2,
        price: 16000,
        optionID: "아주 매운맛",
        state: "cancel",
      },
    ],
  },

  {
    id: 9,
    orderNumber: 2001,
    orderList: [
      {
        productId: 1,
        productName: "소고기 덮밥",
        quantity: 1,
        price: 8000,
        optionID: "매운맛",
        state: "cancel",
      },
    ],
  },
  {
    id: 10,
    orderNumber: 2002,
    orderList: [
      {
        productId: 1,
        productName: "소고기 덮밥",
        quantity: 1,
        price: 8000,
        optionID: "기본",
        state: "cancel",
      },
    ],
  },
];
