import { useState } from "react";

const useHandleReceipt = () => {
  const [orderNumber, setOrderNumber] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [isPrint, setIsPrint] = useState(false);
  const [, setPrintReceipt] = useState(false);

  const handleReceipt = (receipt: boolean) => {
    setPrintReceipt(receipt);
    setIsPrint(true);
  };

  const closeReceipt = () => {
    setPrintReceipt(true);
    setIsPaid(true);
  };

  return {
    isPaid,
    isPrint,
    setIsPrint,
    orderNumber,
    setOrderNumber,
    handleReceipt,
    closeReceipt
  };
};

export default useHandleReceipt;
