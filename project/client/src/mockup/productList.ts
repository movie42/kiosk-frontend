export interface ProductListValues {
  id: number;
  thumbnail: string | null | undefined;
  name: string;
  price: number;
  option?: string[];
  desc?: "";
  select?: boolean;
}

export const productList: ProductListValues[] = [
  {
    id: 1,
    thumbnail: null,
    name: "소고기 덮밥",
    price: 9000,
    option: [],
    desc: "",
    select: false,
  },
  {
    id: 2,
    thumbnail: null,
    name: "돼지고기 덮밥",
    price: 8000,
    option: [],
    desc: "",
    select: false,
  },
  {
    id: 3,
    thumbnail: null,
    name: "장어 덮밥",
    price: 11000,
    option: [],
    desc: "",
    select: false,
  },
  {
    id: 4,
    thumbnail: null,
    name: "가지 덮밥",
    price: 7000,
    option: [],
    desc: "",
    select: false,
  },
  {
    id: 5,
    thumbnail: null,
    name: "채소 튀김 모듬 덮밥",
    price: 8000,
    option: [],
    desc: "",
    select: false,
  },
  {
    id: 6,
    thumbnail: null,
    name: "돈부리",
    price: 8000,
    option: [],
    desc: "",
    select: false,
  },
  {
    id: 7,
    thumbnail: null,
    name: "라면 덮밥",
    price: 5000,
    option: [],
    desc: "",
    select: false,
  },
  {
    id: 8,
    thumbnail: null,
    name: "카레 덮밥",
    price: 7000,
    option: [],
    desc: "",
    select: false,
  },
];
