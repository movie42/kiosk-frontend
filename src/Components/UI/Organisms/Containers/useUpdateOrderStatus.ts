import { useEffect, useState } from "react";
import {
  useUpdateOrderStatusMutation,
  OrderStatusType
} from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { userState } from "@/lib/state";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

interface Props {
  id: string | null;
  confirm: boolean;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

const useUpdateOrderStatus = ({
  id,
  confirm,
  setId,
  setIsModal,
  setConfirm
}: Props) => {
  const queryClient = useQueryClient();
  const { accessToken } = useRecoilValue(userState);

  const [orderStatus, setOrderStatus] = useState<OrderStatusType | null>(null);

  const { mutate: updateOrderStatusMutate } = useUpdateOrderStatusMutation(
    graphqlReqeustClient(accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getOrders");
      }
    }
  );

  const handleSetModalItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    status: OrderStatusType
  ) => {
    const orderId = String(e.currentTarget.closest("li")?.dataset.id);

    if (orderId && status) {
      setId(() => orderId);
      setIsModal(() => true);
      setOrderStatus(() => status);
    }
  };

  useEffect(() => {
    if (confirm) {
      const orderId = Number(id);

      updateOrderStatusMutate(
        { id: orderId, status: orderStatus as OrderStatusType },
        {
          onSuccess: () => {
            setOrderStatus(null);
            setConfirm(false);
          }
        }
      );
    }
  }, [confirm, id, orderStatus, setConfirm, updateOrderStatusMutate]);

  return { orderStatus, handleSetModalItem };
};
export default useUpdateOrderStatus;
