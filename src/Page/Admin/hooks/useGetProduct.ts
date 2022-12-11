import { useGetProductsQuery } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { userState } from "@/lib/state";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

const useGetProduct = () => {
  const { storeId } = useParams();
  const { accessToken } = useRecoilValue(userState);
  return useGetProductsQuery(
    graphqlReqeustClient(accessToken),
    {
      id: Number(storeId)
    },
    {
      select: ({ store }) => {
        const products = store?.products.map(
          ({
            id,
            name,
            price,
            options,
            imageUrl,
            description,
            isAvailable
          }) => ({
            id: Number(id),
            name,
            price,
            options: options.map(({ id, name }) => ({ id: Number(id), name })),
            imageUrl,
            description,
            isAvailable
          })
        );
        return {
          store: {
            id: store?.id,
            name: store?.name
          },
          products
        };
      }
    }
  );
};

export default useGetProduct;
