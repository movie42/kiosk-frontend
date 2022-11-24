import React from "react";
import { BtnGroup, CancelButton, ConfirmButton, PaymentBox } from "../styles";

interface ReceiptProps {
  remain: number;
  handleReceipt: (receipt: boolean) => void;
}
const PrintReceipt: React.FC<ReceiptProps> = ({ remain, handleReceipt }) => {
  return (
    <PaymentBox>
      <h2>결제가 완료되었습니다</h2>
      <h4>영수증을 출력하시겠습니까?</h4>
      <h1>{remain}</h1>
      <span>선택하지 않을 경우 자동으로 출력됩니다</span>
      <BtnGroup>
        <ConfirmButton onClick={() => handleReceipt(true)}>예</ConfirmButton>
        <CancelButton onClick={() => handleReceipt(false)}>아니요</CancelButton>
      </BtnGroup>
    </PaymentBox>
  );
};

export default PrintReceipt;
