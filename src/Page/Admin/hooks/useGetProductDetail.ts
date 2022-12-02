import { useGetProductsQuery } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { userState } from "@/lib/state";
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
          const [product] = store.products.filter(
            (product) => product.id === productId
          );
          return product;
        }
      }
    }
  );
};

export default useGetProductDetail;
