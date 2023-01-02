import { useState } from "react";
import { OrderStatusValue } from "@/lib/state/interface";

const useGetStatusWithId = () => {
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState<OrderStatusValue | null>(null);

  const getStatusWithId = (id: string, status: OrderStatusValue | null) => {
    setOrderId(() => id);
    setOrderStatus(() => status);
  };

  return { getStatusWithId, orderId, orderStatus };
};

export default useGetStatusWithId;
