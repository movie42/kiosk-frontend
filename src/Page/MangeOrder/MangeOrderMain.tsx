import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { orderStateForFrontend } from "../../state/orderState";
import OrderStateList from "./OrderStateList";
import {
  GetOrdersQuery,
  OrderStatusType,
  useGetOrdersQuery,
  useGetProductsQuery,
  useTodayOrdersQuery
} from "../../generated/graphql";
import { userState } from "../../state/userState";
import graphqlReqeustClient from "../../lib/graphqlRequestClient";
import { useParams } from "react-router-dom";

import OptionsContainer from "./OptionsContainer";

const Wrapper = styled.div``;

const OrderStateContainer = styled.div``;

interface SelectOrder {
  __typename?: "Query";
  todayOrders: Array<{
    __typename?: "Order";
    id: string;
    number: number;
    price: number;
    storeId: number;
    imp_uid: string;
    merchant_uid: string;
    status: OrderStatusType;
    orderProducts: Array<{
      __typename?: "OrderProduct";
      id: string;
      orderId: number;
      productId: number;
      amount: number;
      productOptionId: number;
    }>;
  }>;
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

const handleDataToNew = (
  todayOrdersData: SelectOrder,
  getProduct: ProductQuery,
  term?: string
) => {
  const orders = todayOrdersData.todayOrders.map((order) => ({
    id: order.id,
    storeId: order.storeId,
    number: order.number,
    price: order.price,
    status: order.status,
    orderProducts: order.orderProducts.map((orderProduct) => {
      if (getProduct.store) {
        const [selectProduct] = getProduct.store?.products.filter(
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
        productName: "언노운",
        productPrice: 0,
        productOptionId: "언노운",
        optionName: "언노운"
      };
    })
  }));

  if (term) {
    return orders.filter((order) => order.number === Number(term));
  }

  return orders;
};

const MangeOrderMain = () => {
  const { storeId } = useParams();
  const sticky = useRef<HTMLDivElement>(null);
  const [stickyPos, setStickyPos] = useState<number>(0);
  const { accessToken } = useRecoilValue(userState);
  const [searchTerm, setSearchTerm] = useState("");
  const setOrders = useSetRecoilState(orderStateForFrontend);

  const { data: getProduct, isSuccess: isGetProductSuccess } =
    useGetProductsQuery(graphqlReqeustClient(accessToken), {
      id: Number(storeId)
    });

  const { data: todayOrdersData, isSuccess: isTodayOrdersQuerySuccess } =
    useTodayOrdersQuery(graphqlReqeustClient(accessToken), {
      offset: 0,
      limit: 10
    });

  useEffect(() => {
    if (sticky.current) {
      const offsetTop = sticky.current.offsetTop as number;
      setStickyPos(offsetTop);
    }
  }, [sticky.current]);

  useEffect(() => {
    if (searchTerm && isGetProductSuccess && isTodayOrdersQuerySuccess) {
      const orders = handleDataToNew(todayOrdersData, getProduct, searchTerm);
      setOrders(orders);
    }

    if (!searchTerm && isGetProductSuccess && isTodayOrdersQuerySuccess) {
      const orders = handleDataToNew(todayOrdersData, getProduct);
      setOrders(orders);
    }
  }, [searchTerm, isGetProductSuccess, isTodayOrdersQuerySuccess]);

  return (
    <Wrapper>
      <div ref={sticky}>
        <OptionsContainer
          setSearchTerm={setSearchTerm}
          stickyPos={stickyPos as number}
        />
      </div>
      <OrderStateContainer>
        <OrderStateList />
      </OrderStateContainer>
    </Wrapper>
  );
};

export default MangeOrderMain;
