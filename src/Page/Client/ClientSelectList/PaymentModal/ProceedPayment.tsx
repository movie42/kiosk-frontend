/* eslint-disable */
import React from "react";
import { useRecoilValue } from "recoil";
import { OrderType, useAddOrderMutation } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { orderType, selectMenuListState, userState } from "@/lib/state";
import { RequestPayResponse, RequestPayParams } from "@/lib/types/Payment";
import { AddOrderInput, OrderProductInput } from "../../types";
import {
  MenuBox,
  BtnGroup,
  ConfirmButton,
  CancelButton,
  PaymentBox
} from "../styles";

interface PaymentProps {
  storeId: string | undefined;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOrderNumber: React.Dispatch<React.SetStateAction<number>>;
  closeReceipt: () => void;
}

const ProceedPayment: React.FC<PaymentProps> = ({
  storeId,
  setIsModal,
  setOrderNumber,
  closeReceipt
}) => {
  const ordertype = useRecoilValue(orderType);
  const orderList = useRecoilValue(selectMenuListState);
  const impkey = (process.env.REACT_APP_IMP as string) || "temporary";

  const { accessToken } = useRecoilValue(userState);
  const { mutate } = useAddOrderMutation<AddOrderInput>(
    graphqlReqeustClient(accessToken)
  );

  const addOrderItems = (
    orderProducts: OrderProductInput[],
    imp?: string,
    merchant?: string
  ) => {
    mutate(
      {
        order: {
          storeId: Number(storeId),
          imp_uid: imp || "temporary",
          merchant_uid: merchant || "temporary",
          products: orderProducts,
          type: ordertype === "go" ? OrderType.Go : OrderType.Here
        }
      },
      {
        onSuccess: (data) => {
          setOrderNumber(data.addOrder);
          closeReceipt();
        }
      }
    );
  };

  const handlePayment = () => {
    // window.IMP?.init(impkey);

    const amount: number = orderList.reduce(
      (acc, obj) => acc + obj.totalPrice,
      0
    );

    const orderProducts = orderList.map((item) => {
      return {
        productId: item.productId,
        amount: item.totalCount,
        productOptionId: item.optionId
      };
    });

    if (!amount) {
      alert("결제 금액을 확인해주세요");
      return;
    }

    // const data: RequestPayParams = {
    //   pg: "kakaopay",
    //   pay_method: "card",
    //   name: "Kiosk Payment",
    //   merchant_uid: `mid_${new Date().getTime()}`,
    //   amount: amount,
    //   buyer_tel: "000-000-0000"
    // };
    // const callback = (response: RequestPayResponse) => {
    //   const { success, merchant_uid, error_msg, imp_uid, error_code } =
    //     response;
    //   if (success) {
    //     addOrderItems(orderProducts, imp_uid, merchant_uid);
    addOrderItems(orderProducts);
    //   }
    // };
    // window.IMP?.request_pay(data, callback);
  };

  return (
    <PaymentBox>
      <h2>결제를 진행중입니다</h2>
      <h4>주문 내용과 금액을 확인해주세요</h4>

      <p>주문 상품</p>
      {orderList.map((el) => (
        <MenuBox key={`${el.productId}${el.option}`}>
          <span>
            {el.name} {el.option}
          </span>
          <span>{el.totalCount}개</span>
          <span>{el.totalPrice.toLocaleString()}원</span>
        </MenuBox>
      ))}
      <h3>
        총 결제&nbsp;
        {orderList
          .reduce((acc, obj) => acc + obj.totalPrice, 0)
          .toLocaleString()}
        원
      </h3>
      <BtnGroup>
        <ConfirmButton onClick={handlePayment}>결제하기</ConfirmButton>
        <CancelButton onClick={() => setIsModal(false)}>취소하기</CancelButton>
      </BtnGroup>
    </PaymentBox>
  );
};

export default ProceedPayment;
