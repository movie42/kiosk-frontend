import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { Headline2, SubTitle2, Body1 } from "../../../mixin";
import { selectMenuListState } from "../../../state/productItemState";
import ButtonDefaultStyle from "../../../Components/Buttons/ButtonDefault";
import { RequestPayParams, RequestPayResponse } from "../Payment";

interface IPaymentModalChildrenProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentBox = styled.div`
  h1 {
    text-align: center;
  }
  h2 {
    ${Headline2};
  }
  h3 {
    ${SubTitle2};
    font-weight: 700;
  }
  span {
    ${Body1};
  }
  p {
    ${Body1};
    font-weight: 700;
  }
`;
const MenuBox = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid black;
  text-align: right;
  span:nth-child(3n-2) {
    text-align: left;
  }
`;
const BtnGroup = styled.div`
  text-align: center;
`;
const ConfirmButton = styled(ButtonDefaultStyle)`
  background-color: ${(props) => props.theme.color.primary500};
  margin: 0 0.5rem;
`;
const CancelButton = styled(ButtonDefaultStyle)`
  background-color: ${(props) => props.theme.color.gray300};
  margin: 0 0.5rem;
`;

const PaymentModalChildren: React.FC<IPaymentModalChildrenProps> = ({
  setIsModal,
}) => {
  const navigate = useNavigate();
  const { userId, storeId } = useParams();

  // paid done
  const [isPaid, setIsPaid] = useState(false);
  // print done
  const [isPrint, setIsPrint] = useState(false);
  // handle print receipt
  const [printReceipt, setPrintReceipt] = useState<Boolean>(false);

  // set time out

  const handleReceipt = (receipt: Boolean) => {
    setPrintReceipt(receipt);
    setIsPrint(true);
  };

  // reset all menu list and go back to Main
  const [orderList, setOrderList] = useRecoilState(selectMenuListState);
  const confirmOrder = () => {
    setOrderList([]);
    navigate(`/client/${userId}/${storeId}/main`);
  };

  // close the receipt modal automatically in 5 secs
  const [remain, setRemain] = useState(5);
  const closeReceipt = () => {
    setIsPaid(true);
    setPrintReceipt(true);
  };

  // payment
  const handlePayment = () => {
    window.IMP?.init("");

    const amount: number = orderList.reduce(
      (acc, obj) => acc + obj.totalPrice,
      0
    );
    if (!amount) {
      alert("결제 금액을 확인해주세요");
      return;
    }
    const data: RequestPayParams = {
      pg: "kakaopay",
      pay_method: "card",
      name: "Kiosk Payment",
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: amount,
      buyer_tel: "000-000-0000",
    };
    const callback = (response: RequestPayResponse) => {
      const { success, merchant_uid, error_msg, imp_uid, error_code } =
        response;
      if (success) {
        console.log(response);
        closeReceipt();
      } else {
        console.log(error_msg, error_code);
      }
    };
    window.IMP?.request_pay(data, callback);
  };

  useEffect(() => {
    if (isPaid) {
      let closeTimer = setTimeout(() => {
        setIsPrint(true);
      }, 5000);

      return () => clearTimeout(closeTimer);
    }
  }, [isPaid]);

  useEffect(() => {
    if (isPaid) {
      let showTimer = setInterval(() => {
        setRemain((prv) => prv - 1);
      }, 1000);
      return () => clearInterval(showTimer);
    }
  }, [closeReceipt]);

  return (
    <PaymentBox>
      {!isPaid && (
        <>
          <h2>결제를 진행중입니다</h2>
          <h3>주문 내용과 금액을 확인해주세요</h3>
          <p>
            총 결제&nbsp;
            {orderList
              .reduce((acc, obj) => acc + obj.totalPrice, 0)
              .toLocaleString()}
            원
          </p>
          <p>주문 상품</p>
          {orderList.map((el, i) => (
            <MenuBox key={`${el.productId}${el.option}`}>
              <span>
                {el.name} {el.option}
              </span>
              <span>{el.totalCount}개</span>
              <span>{el.totalPrice.toLocaleString()}원</span>
            </MenuBox>
          ))}
          <button onClick={handlePayment}>결제하기</button>
          <button onClick={() => setIsModal(false)}>취소하기</button>
        </>
      )}
      {isPaid && !isPrint && (
        <>
          <h2>결제가 완료되었습니다</h2>
          <h3>영수증을 출력하시겠습니까?</h3>
          <h1>{remain}</h1>
          <span>선택하지 않을 경우 자동으로 출력됩니다</span>
          <BtnGroup>
            <ConfirmButton onClick={() => handleReceipt(true)}>
              예
            </ConfirmButton>
            <CancelButton onClick={() => handleReceipt(false)}>
              아니요
            </CancelButton>
          </BtnGroup>
        </>
      )}
      {isPaid && isPrint && (
        <>
          <h2>주문이 완료되었습니다</h2>
          <h3>주문 번호를 확인해주세요</h3>
          <BtnGroup>
            <ConfirmButton onClick={confirmOrder}>확인</ConfirmButton>
          </BtnGroup>
        </>
      )}
    </PaymentBox>
  );
};

export default PaymentModalChildren;
