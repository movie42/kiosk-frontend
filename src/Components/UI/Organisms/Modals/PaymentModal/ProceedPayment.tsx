import React from "react";
import { useRecoilValue } from "recoil";
import { OrderType, useAddOrderMutation } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { orderType, selectMenuListState, userState } from "@/lib/state";
import {
  AddOrderInput,
  OrderProductInput
} from "../../../../../Page/Client/interface";
import { calculateTotalAmount, translateLocalCurrency } from "@/lib/utils";
import { MenuBox, PaymentBox } from "./styles";
import { NewModal } from "@/Components/UI/Molecules";

interface PaymentProps {
  storeId: string | undefined;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOrderNumber: React.Dispatch<React.SetStateAction<number>>;
  closeReceipt: () => void;
}

const ProceedPayment = ({
  storeId,
  setIsModal,
  setOrderNumber,
  closeReceipt
}: PaymentProps) => {
  const ordertype = useRecoilValue(orderType);
  const orderList = useRecoilValue(selectMenuListState);

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
    const amount: number = calculateTotalAmount(orderList, "totalPrice");
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

    addOrderItems(orderProducts);
  };

  return (
    <NewModal
      title="결제를 진행중입니다"
      subtitle="주문 내용과 금액을 확인해주세요"
      confirmFn={handlePayment}
      cancelFn={() => setIsModal(false)}
      confirmText="결제하기"
      cancelText="취소하기"
    >
      <PaymentBox>
        <p>주문 상품</p>
        {orderList.map((el) => (
          <MenuBox key={`${el.productId}${el.option}`}>
            <span>
              {el.name} {el.option}
            </span>
            <span>{el.totalCount}개</span>
            <span>{translateLocalCurrency(el.totalPrice)}원</span>
          </MenuBox>
        ))}
        <h3>
          총 결제&nbsp;
          {translateLocalCurrency(
            calculateTotalAmount(orderList, "totalPrice")
          )}
          원
        </h3>
      </PaymentBox>
    </NewModal>
  );
};

export default ProceedPayment;
