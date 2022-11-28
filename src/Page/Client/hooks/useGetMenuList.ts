import { useRecoilValue } from "recoil";
import { useGetProductsQuery } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { userState } from "@/lib/state";
import { ProductListValues } from "@/lib/state/productItemState";

const useGetMenuList = (storeId: string | undefined) => {
  const { accessToken } = useRecoilValue(userState);

  const { isLoading, data: menuList } = useGetProductsQuery(
    graphqlReqeustClient(accessToken),
    {
      id: Number(storeId)
    },
    {
      select: (data) => {
        if (data.store?.products) {
          const productList = data.store.products
            .map<ProductListValues>((value) => ({
              id: Number(value.id),
              name: value.name,
              price: value.price,
              imageUrl: value.imageUrl,
              description: value.description,
              options: value.options.map((value) => ({
                id: Number(value.id),
                name: value.name
              })),
              isAvailable: value.isAvailable
            }))
            .filter((value) => value.isAvailable === true);
          return productList;
        }
      }
    }
  );

  return { isLoading, menuList };
};

export default useGetMenuList;
