import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { orderStateForFrontend } from "../../state/orderState";
import OrderStateList from "./OrderStateList";
import {
  GetOrdersQuery,
  OrderStatusType,
  useGetOrdersQuery,
} from "../../generated/graphql";
import { userState } from "../../state/userState";
import graphqlReqeustClient from "../../lib/graphqlRequestClient";
import { useParams } from "react-router-dom";

import OptionsContainer from "./OptionsContainer";

const Wrapper = styled.div``;

const OrderStateContainer = styled.div``;

interface SelectOrder {
  id: string;
  products: Array<{
    __typename?: "Product";
    id: string;
    name: string;
    price: number;
    options: Array<{ __typename?: "Option"; id: string; name: string }>;
  }>;
  orders: Array<{
    __typename?: "Order";
    id: string;
    number: number;
    price: number;
    storeId: number;
    status: OrderStatusType;
    orderProducts: Array<{
      __typename?: "OrderProduct";
      orderId: number;
      productId: number;
      amount: number;
      productOptionIds: Array<number>;
    }>;
  }>;
}

const handleDataToNew = (data: SelectOrder, term?: string) => {
  const orders = data.orders.map((order) => ({
    id: order.id,
    storeId: order.storeId,
    number: order.number,
    price: order.price,
    status: order.status,
    orderProducts: order.orderProducts.map((orderProduct) => {
      const [selectProduct] = data.products.filter(
        (product) => product.id === String(orderProduct.productId)
      );
      if (!selectProduct) {
        return {
          productId: 0,
          orderId: 0,
          amount: 0,
          productName: "",
          productPrice: 0,
          optionId: "",
          optionName: "",
        };
      }

      const optionId = orderProduct.productOptionIds[0];
      const [selectOption] = selectProduct.options.filter(
        (option) => option.id === String(optionId)
      );
      return {
        productId: orderProduct.productId,
        orderId: orderProduct.orderId,
        amount: orderProduct.amount,
        productName: selectProduct.name,
        productPrice: selectProduct.price,
        optionId: selectOption?.id ? selectOption.id : "",
        optionName: selectOption?.name ? selectOption.name : "",
      };
    }),
  }));

  if (term) {
    return orders.filter((order) => order.number === Number(term));
  }

  return orders;
};

const MangeOrderMain = () => {
  // const sticky = useRef<HTMLDivElement>(null);
  // const [stickyPos, setStickyPos] = useState<number>(0);
  // const { accessToken } = useRecoilValue(userState);
  // const { storeId } = useParams();
  // const [searchTerm, setSearchTerm] = useState("");
  // const setOrders = useSetRecoilState(orderStateForFrontend);

  // const { data, isSuccess } = useGetOrdersQuery(
  //   graphqlReqeustClient(accessToken),
  //   undefined,
  //   {
  //     select: (data) => {
  //       const [selectStore] = data.myStores.filter(
  //         (value) => value.id === storeId
  //       );
  //       return selectStore;
  //     },
  //     onSuccess: (data) => {
  //       const orders = handleDataToNew(data);
  //       setOrders(orders);
  //     }
  //   }
  // );

  // useEffect(() => {
  //   if (sticky.current) {
  //     const offsetTop = sticky.current.offsetTop as number;
  //     setStickyPos(offsetTop);
  //   }
  // }, [sticky.current]);

  // useEffect(() => {
  //   if (searchTerm && isSuccess) {
  //     const orders = handleDataToNew(data, searchTerm);
  //     setOrders(orders);
  //   }

  //   if (!searchTerm && isSuccess) {
  //     const orders = handleDataToNew(data);
  //     setOrders(orders);
  //   }
  // }, [searchTerm, isSuccess]);

  return (
    <Wrapper>
      {/* <div ref={sticky}>
        <OptionsContainer
          setSearchTerm={setSearchTerm}
          stickyPos={stickyPos as number}
        />
      </div>
      <OrderStateContainer>
        <OrderStateList />
      </OrderStateContainer> */}
    </Wrapper>
  );
};

export default MangeOrderMain;
