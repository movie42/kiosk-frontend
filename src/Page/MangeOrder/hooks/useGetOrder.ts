import {
  OrderStatusType,
  useGetOrdersQuery,
  useGetProductsQuery
} from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { orderStateForFrontend, userState } from "@/lib/state";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface SelectOrder {
  __typename?: "Query";
  orders: Array<{
    __typename?: "Order";
    id: string;
    number: number;
    price: number;
    storeId: number;
    imp_uid: string;
    merchant_uid: string;
    status: OrderStatusType;
    orderProducts: OrderProducts[];
  }>;
}

interface OrderProducts {
  __typename?: "OrderProduct";
  id: string;
  orderId: number;
  productId: number;
  amount: number;
  productOptionId: number;
}

interface ProductQuery {
  __typename?: "Query";
  store?: {
    __typename?: "Store";
    id: string;
    products: Array<{
      __typename?: "Product";
      id: string;
      name: string;
      price: number;
      imageUrl?: string | null;
      description?: string | null;
      isAvailable: boolean;
      options: Array<{ __typename?: "Option"; id: string; name: string }>;
    }>;
  } | null;
}

const normalizationManageOrderData = (
  todayOrdersData: SelectOrder,
  getProduct: ProductQuery,
  term?: string
) => {
  const orderProducts = (orderProducts: OrderProducts[]) =>
    orderProducts.map((orderProduct) => {
      if (getProduct.store) {
        const [selectProduct] = getProduct.store.products.filter(
          (product) => product.id === String(orderProduct.productId)
        );

        const [selectOption] = selectProduct.options.filter(
          (option) => option.id === String(orderProduct.productOptionId)
        );

        if (selectOption) {
          return {
            id: orderProduct.id,
            productId: orderProduct.productId,
            orderId: orderProduct.orderId,
            amount: orderProduct.amount,
            productName: selectProduct.name,
            productPrice: selectProduct.price,
            productOptionId: selectOption.id,
            optionName: selectOption.name
          };
        }
      }
      return {
        id: orderProduct.id,
        productId: orderProduct.productId,
        orderId: orderProduct.orderId,
        amount: orderProduct.amount,
        productName: "정보를 불러올 수 없습니다.",
        productPrice: 0,
        productOptionId: "정보를 불러올 수 없습니다.",
        optionName: "정보를 불러올 수 없습니다."
      };
    });

  const orders = todayOrdersData.orders.map((order) => ({
    id: order.id,
    storeId: order.storeId,
    number: order.number,
    price: order.price,
    status: order.status,
    orderProducts: orderProducts(order.orderProducts)
  }));

  if (term) {
    return orders.filter((order) => order.number === Number(term));
  }

  return orders;
};

const useGetOrder = () => {
  const [getOrderStatus, setGetOrderStatue] = useState({
    isLoading: false,
    isSuccess: false,
    isRefetching: false
  });

  const setOrders = useSetRecoilState(orderStateForFrontend);
  const { storeId } = useParams();
  const [queryString] = useSearchParams();
  const orderSearchTerm = queryString.get("order");
  const { accessToken } = useRecoilValue(userState);

  const {
    data: getProduct,
    isSuccess: isGetProductSuccess,
    isRefetching: isGetProductRefetcing,
    isLoading: isProductLoading
  } = useGetProductsQuery(graphqlReqeustClient(accessToken), {
    id: Number(storeId)
  });

  const {
    data: todayOrdersData,
    isSuccess: isTodayOrdersQuerySuccess,
    isRefetching: isTodayOrdersRefetcing,
    isLoading: isTodayOrdersLoading
  } = useGetOrdersQuery(graphqlReqeustClient(accessToken), {
    storeId: storeId ? Number(storeId) : 1,
    offset: 0,
    limit: 10
  });

  useEffect(() => {
    if (
      orderSearchTerm &&
      isGetProductSuccess &&
      isTodayOrdersQuerySuccess &&
      !isGetProductRefetcing &&
      !isTodayOrdersRefetcing
    ) {
      const orders = normalizationManageOrderData(
        todayOrdersData,
        getProduct,
        orderSearchTerm
      );
      setOrders(orders);
      return;
    }

    if (
      isGetProductSuccess &&
      isTodayOrdersQuerySuccess &&
      !isGetProductRefetcing &&
      !isTodayOrdersRefetcing
    ) {
      const orders = normalizationManageOrderData(todayOrdersData, getProduct);
      setOrders(orders);
      return;
    }
  }, [
    todayOrdersData,
    getProduct,
    setOrders,
    orderSearchTerm,
    isGetProductSuccess,
    isTodayOrdersQuerySuccess,
    isGetProductRefetcing,
    isTodayOrdersRefetcing
  ]);

  useEffect(() => {
    const isSuccess = [isGetProductSuccess, isTodayOrdersQuerySuccess].every(
      (value) => value
    );
    const isRefetching = [isGetProductRefetcing, isTodayOrdersRefetcing].some(
      (value) => value
    );
    const isLoading = [isProductLoading, isTodayOrdersLoading].some(
      (value) => value
    );
    setGetOrderStatue({
      isSuccess,
      isRefetching,
      isLoading
    });
  }, [
    isGetProductSuccess,
    isGetProductRefetcing,
    isProductLoading,
    isTodayOrdersQuerySuccess,
    isTodayOrdersRefetcing,
    isTodayOrdersLoading
  ]);

  return {
    ...getOrderStatus
  };
};

export default useGetOrder;
