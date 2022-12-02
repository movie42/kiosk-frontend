import React from "react";
import { useParams } from "react-router-dom";
import { useHandleReceipt, useTimer } from "@/Page/Client/hooks";
import OrderConfirm from "./OrderConfirm";
import PrintReceipt from "./PrintReceipt";
import ProceedPayment from "./ProceedPayment";

interface PaymentModalProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentModal = ({ setIsModal }: PaymentModalProps) => {
  const { userId, storeId } = useParams();

  const {
    isPaid,
    isPrint,
    setIsPrint,
    orderNumber,
    setOrderNumber,
    handleReceipt,
    closeReceipt
  } = useHandleReceipt();

  const { remain } = useTimer(isPaid, setIsPrint);

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
