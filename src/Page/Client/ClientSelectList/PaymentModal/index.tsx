/* eslint-disable */

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { IPaymentModalProps } from "../../types";
import useTimer from "../hooks/useTimer";
import OrderConfirm from "./OrderConfirm";
import PrintReceipt from "./PrintReceipt";
import ProceedPayment from "./ProceedPayment";

const PaymentModal: React.FC<IPaymentModalProps> = ({ setIsModal }) => {
  const { userId, storeId } = useParams();
  const [isPaid, setIsPaid] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);
  const [isPrint, setIsPrint] = useState(false);
  const [, setPrintReceipt] = useState(false);

  const { remain } = useTimer(isPaid, setIsPrint);

  const handleReceipt = (receipt: boolean) => {
    setPrintReceipt(receipt);
    setIsPrint(true);
  };

  const closeReceipt = () => {
    setPrintReceipt(true);
    setIsPaid(true);
  };

  if (!isPaid)
    return (
      <ProceedPayment
        storeId={storeId}
        setIsModal={setIsModal}
        setOrderNumber={setOrderNumber}
        closeReceipt={closeReceipt}
      />
    );

  if (isPaid && !isPrint)
    return <PrintReceipt remain={remain} handleReceipt={handleReceipt} />;

  return (
    <>
      {isPaid && isPrint && (
        <OrderConfirm
          orderNumber={orderNumber}
          userId={userId}
          storeId={storeId}
        />
      )}
    </>
  );
};

export default PaymentModal;
