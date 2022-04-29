interface UserInfoValues {
  id: number | string;
  email: string;
  password: string;
  store: {
    storeId: number | string;
    storeName: string;
    storeContact: string;
    storeAddress: string;
  };
}

export const userInfo: UserInfoValues[] = [
  {
    id: 1,
    email: "admin@google.com",
    password: "123qwe!@",
    store: {
      storeId: 1,
      storeName: "덮밥아 놀자",
      storeContact: "000-000-0000",
      storeAddress: "대한민국 서울시 덮밥구 덮밥로 13",
    },
  },
];
