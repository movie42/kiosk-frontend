import { useGetProductsQuery } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { ProductListValues, ProductOptions, userState } from "@/lib/state";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

const useGetProductDetail = () => {
  const { accessToken } = useRecoilValue(userState);
  const { storeId, productId } = useParams();
  return useGetProductsQuery(
    graphqlReqeustClient(accessToken),
    { id: Number(storeId) },
    {
      select: ({ store }) => {
        if (store?.products) {
          const [product] = store.products
            .filter((product) => product.id === productId)
            .map(
              ({
                id,
                name,
                price,
                imageUrl,
                description,
                isAvailable,
                options
              }): ProductListValues => ({
                id: Number(id),
                name,
                price,
                imageUrl,
                description,
                isAvailable,
                options: options.map(
                  ({ id, name }): ProductOptions => ({
                    id: Number(id),
                    name
                  })
                )
              })
            );

          return product;
        }
      }
    }
  );
};

export default useGetProductDetail;
