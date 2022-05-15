import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { selectMenuListState } from "../../../state/productItemState";

interface IPaymentModalChildrenProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentBox = styled.div`
  p {
    font-size: 1.5rem;
    padding: 0.3rem 0;
  }
`;

const PaymentModalChildren: React.FC<IPaymentModalChildrenProps> = ({
  setIsModal,
}) => {
  const navigate = useNavigate();

  // paid done
  const [isPaid, setIsPaid] = useState(false);
  // print done
  const [isPrint, setIsPrint] = useState(false);

  // handle print receipt
  const [printReceipt, setPrintReceipt] = useState<Boolean>(false);
  const handleReceipt = (receipt: Boolean) => {
    setPrintReceipt(receipt);
    setIsPrint(true);
  };

  // reset all menu list and go back to Main
  const [orderList, setOrderList] = useRecoilState(selectMenuListState);
  const confirmOrder = () => {
    setOrderList([]);
    navigate("/client/main");
  };
  return (
    <PaymentBox>
      {!isPaid ? (
        <>
          <h2>결제중입니다</h2>
          <p>카드를 삽입해주세요</p>
          <button onClick={() => setIsPaid(true)}>결제완료</button>
          <button onClick={() => setIsModal(false)}>취소하기</button>
        </>
      ) : !isPrint ? (
        <>
          <h2>결제가 완료되었습니다</h2>
          <p>영수증을 출력하시겠습니까?</p>
          <button onClick={() => handleReceipt(true)}>예</button>
          <button onClick={() => handleReceipt(false)}>아니요</button>
        </>
      ) : (
        <>
          <h2>주문이 완료되었습니다</h2>
          <p>주문 번호를 확인해주세요</p>
          <button onClick={confirmOrder}>확인</button>
        </>
      )}
    </PaymentBox>
  );
};

export default PaymentModalChildren;
