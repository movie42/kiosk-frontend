import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  getOrderForFrontend,
  orderStateForFrontend,
} from "../../state/orderState";
import OrderStateList from "./OrderStateList";
import { useGetOrdersQuery } from "../../generated/graphql";
import { userState } from "../../state/userState";
import graphqlReqeustClient from "../../lib/graphqlRequestClient";
import { useParams } from "react-router-dom";
import { OrderProducts } from "../../state/orderState";
import OptionsContainer from "./OptionsContainer";

const Wrapper = styled.div``;

const OrderStateContainer = styled.div``;

const MangeOrderMain = () => {
  const { accessToken } = useRecoilValue(userState);
  const { storeId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const setOrders = useSetRecoilState(orderStateForFrontend);

  const { data } = useGetOrdersQuery(
    graphqlReqeustClient(accessToken),
    undefined,
    {
      select: (data) => {
        const [selectStore] = data.myStores.filter(
          (value) => value.id === storeId,
        );
        return selectStore;
      },
      onSuccess: (data) => {
        const orders = data.orders.map((order) => ({
          id: order.id,
          storeId: order.storeId,
          number: order.number,
          price: order.price,
          status: order.status,
          orderProducts: order.orderProducts.map((orderProduct) => {
            const [selectProduct] = data.products.filter(
              (product) => product.id === String(orderProduct.productId),
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
              (option) => option.id === String(optionId),
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

        setOrders(orders);
      },
    },
  );

  return (
    <Wrapper>
      <OptionsContainer setSearchTerm={setSearchTerm} />
      <OrderStateContainer>
        <OrderStateList />
      </OrderStateContainer>
    </Wrapper>
  );
};

export default MangeOrderMain;
