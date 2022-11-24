import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectMenuListState } from "../../../lib/state/productItemState";
import {
  RequestPayParams,
  RequestPayResponse
} from "../../../lib/types/Payment";
import { OrderType, useAddOrderMutation } from "../../../lib/generated/graphql";
import graphqlReqeustClient from "../../../lib/graphqlRequestClient";
import { userState } from "../../../lib/state/userState";
import { orderType } from "../../../lib/state/orderState";
import {
  MenuBox,
  PaymentBox,
  BtnGroup,
  ConfirmButton,
  CancelButton
} from "./styles";
import { OrderProductInput, AddOrderInput, IPaymentModalProps } from "../types";

const PaymentModal: React.FC<IPaymentModalProps> = ({ setIsModal }) => {
  const navigate = useNavigate();
  const { userId, storeId } = useParams();
  const { accessToken } = useRecoilValue(userState);
  const ordertype = useRecoilValue(orderType);
  const impkey = process.env.REACT_APP_IMP as string;

  // paid done
  const [isPaid, setIsPaid] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);
  // print done
  const [isPrint, setIsPrint] = useState(false);
  // handle print receipt
  const [, setPrintReceipt] = useState(false);

  // set time out

  const handleReceipt = (receipt: boolean) => {
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

  // add order mutate
  const { mutate } = useAddOrderMutation<AddOrderInput>(
    graphqlReqeustClient(accessToken)
  );
  const addOrderItems = (
    orderProducts: OrderProductInput[],
    imp: string,
    merchant: string
  ) => {
    mutate(
      {
        order: {
          storeId: Number(storeId),
          imp_uid: imp,
          merchant_uid: merchant,
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
  // payment
  const handlePayment = () => {
    window.IMP?.init(impkey);

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
    const data: RequestPayParams = {
      pg: "kakaopay",
      pay_method: "card",
      name: "Kiosk Payment",
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: amount,
      buyer_tel: "000-000-0000"
    };
    const callback = (response: RequestPayResponse) => {
      const { success, merchant_uid, error_msg, imp_uid, error_code } =
        response;
      if (success) {
        addOrderItems(orderProducts, imp_uid, merchant_uid);
      }
    };
    window.IMP?.request_pay(data, callback);
  };

  useEffect(() => {
    if (isPaid) {
      const closeTimer = setTimeout(() => {
        setIsPrint(true);
      }, 5000);

      return () => clearTimeout(closeTimer);
    }
  }, [isPaid]);

  useEffect(() => {
    if (isPaid) {
      const showTimer = setInterval(() => {
        setRemain((prv) => prv - 1);
      }, 1000);
      return () => clearInterval(showTimer);
    }
  }, [setRemain, isPaid]);

  return (
    <PaymentBox>
      {!isPaid && (
        <>
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
            <CancelButton onClick={() => setIsModal(false)}>
              취소하기
            </CancelButton>
          </BtnGroup>
        </>
      )}
      {isPaid && !isPrint && (
        <>
          <h2>결제가 완료되었습니다</h2>
          <h4>영수증을 출력하시겠습니까?</h4>
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
          <h4>주문 번호를 확인해주세요</h4>
          <h1>{orderNumber}</h1>
          <BtnGroup>
            <ConfirmButton onClick={confirmOrder}>확인</ConfirmButton>
          </BtnGroup>
        </>
      )}
    </PaymentBox>
  );
};

export default PaymentModal;
