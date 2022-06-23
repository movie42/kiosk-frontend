export interface ProductOptions {
  id: number;
  name: string;
}

export interface ProductListValues {
  id: number;
  name: string;
  price: number;
  option?: ProductOptions[];
  imageUrl?: string | null | undefined;
  description?: string | null | undefined;
}

export const productList: ProductListValues[] = [
  {
    id: 1,
    imageUrl: "",
    name: "소고기 덮밥",
    price: 9000,
    // option: ["기본", "매운맛", "아주 매운맛"],
    description: "",
  },
  {
    id: 2,
    imageUrl: "",
    name: "돼지고기 덮밥",
    price: 8000,
    // option: ["기본", "매운맛", "아주 매운맛"],
    description: "",
  },
  {
    id: 3,
    imageUrl: "",
    name: "장어 덮밥",
    price: 11000,
    // option: ["기본", "매운맛", "순한맛"],
    description: "",
  },
  {
    id: 4,
    imageUrl: "",
    name: "가지 덮밥",
    price: 7000,
    // option: ["기본", "매운맛", "아주 매운맛"],
    description: "",
  },
  {
    id: 5,
    imageUrl: "",
    name: "채소 튀김 모듬 덮밥",
    price: 8000,
    // option: [],
    description: "",
  },
  {
    id: 6,
    imageUrl: "",
    name: "돈부리",
    price: 8000,
    // option: ["기본", "매운맛"],
    description: "",
  },
  {
    id: 7,
    imageUrl: "",
    name: "라면 덮밥",
    price: 5000,
    // option: [],
    description: "",
  },
  {
    id: 8,
    imageUrl: "",
    name: "카레 덮밥",
    price: 7000,
    // option: ["기본", "매운맛"],
    description: "",
  },
];
