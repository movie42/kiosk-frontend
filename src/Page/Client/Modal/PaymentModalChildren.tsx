import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { Headline2, SubTitle2, Body1 } from "../../../mixin";
import { selectMenuListState } from "../../../state/productItemState";
import ButtonDefaultStyle from "../../../Components/Buttons/ButtonDefault";

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
    navigate("/client/main");
  };

  // close the receipt modal automatically in 5 secs
  const [remain, setRemain] = useState(5);
  const closeReceipt = () => {
    setIsPaid(true);
    setPrintReceipt(true);
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
          <h2>결제중입니다</h2>
          <h3>카드를 삽입해주세요</h3>
          <p>
            총 결제&nbsp;
            {orderList
              .reduce(function (acc, obj) {
                return acc + obj.totalPrice;
              }, 0)
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
          <button onClick={closeReceipt}>결제완료</button>
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
