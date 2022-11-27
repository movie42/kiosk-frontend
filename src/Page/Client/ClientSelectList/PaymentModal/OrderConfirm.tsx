import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { selectMenuListState } from "@/lib/state";
import { PaymentBox, BtnGroup, ConfirmButton } from "../styles";

interface ConfirmProps {
  orderNumber: number;
  userId: string | undefined;
  storeId: string | undefined;
}

const OrderConfirm = ({ orderNumber, userId, storeId }: ConfirmProps) => {
  const navigate = useNavigate();
  const setOrderList = useSetRecoilState(selectMenuListState);

  const confirmOrder = () => {
    setOrderList([]);
    navigate(`/client/${userId}/${storeId}/main`);
  };

  return (
    <PaymentBox>
      <h2>주문이 완료되었습니다</h2>
      <h4>주문 번호를 확인해주세요</h4>
      <h1>{orderNumber}</h1>
      <BtnGroup>
        <ConfirmButton onClick={confirmOrder}>확인</ConfirmButton>
      </BtnGroup>
    </PaymentBox>
  );
};

export default OrderConfirm;
