export interface Order {
  id: number;
  orderNumber: number;
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
    productName: "소고기 덮밥",
    quantity: 1,
    price: 8000,
    optionID: "기본",
    state: "complete",
  },
  {
    id: 2,
    orderNumber: 1001,
    productName: "소고기 덮밥",
    quantity: 1,
    price: 8000,
    optionID: "매운맛",
    state: "complete",
  },
  {
    id: 3,
    orderNumber: 1002,
    productName: "장어 덮밥",
    quantity: 3,
    price: 30000,
    optionID: "기본",
    state: "order",
  },
  {
    id: 4,
    orderNumber: 1005,
    productName: "돼지고기 덮밥",
    quantity: 2,
    price: 8000,
    optionID: "기본",
    state: "order",
  },
  {
    id: 4,
    orderNumber: 1005,
    productName: "소고기 덮밥",
    quantity: 1,
    price: 8000,
    optionID: "매운맛",
    state: "order",
  },
  {
    id: 4,
    orderNumber: 1005,
    productName: "소고기 덮밥",
    quantity: 2,
    price: 16000,
    optionID: "아주 매운맛",
    state: "cancel",
  },
  {
    id: 4,
    orderNumber: 1005,
    productName: "소고기 덮밥",
    quantity: 2,
    price: 16000,
    optionID: "아주 매운맛",
    state: "cancel",
  },
  {
    id: 4,
    orderNumber: 1005,
    productName: "소고기 덮밥",
    quantity: 2,
    price: 16000,
    optionID: "아주 매운맛",
    state: "cancel",
  },
  {
    id: 5,
    orderNumber: 2001,
    productName: "소고기 덮밥",
    quantity: 1,
    price: 8000,
    optionID: "매운맛",
    state: "cancel",
  },
  {
    id: 6,
    orderNumber: 2002,
    productName: "소고기 덮밥",
    quantity: 1,
    price: 8000,
    optionID: "기본",
    state: "cancel",
  },
];
