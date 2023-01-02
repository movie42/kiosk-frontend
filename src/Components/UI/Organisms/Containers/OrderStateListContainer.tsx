import React from "react";
import { useRecoilValue } from "recoil";
import { translateLocalCurrency } from "@/lib/utils";
import { getOrderForFrontend, NewOrder } from "@/lib/state";
import { useModalHook } from "@/lib/hooks";
import { OrderStatusValue } from "@/lib/state/interface";
import OrderModal from "../Modals/OrderModal";
import {
  List,
  OrderInfoHeader,
  buttonBlinkVariants,
  ReadyOrderButton,
  DoneOrderButton,
  CompleteOrderButton,
  CancelOrderButton,
  OrderProductInfoContainer
} from "./styles";
import { useGetStatusWithId } from "../hooks/useGetStatusWithId";
import { ModalStatusKey } from "../interface";

const OrderStateListContainer = () => {
  const orders = useRecoilValue(getOrderForFrontend);

  const { isModal, setIsModal } = useModalHook();
  const { orderId: id, orderStatus, getStatusWithId } = useGetStatusWithId();

  if (isModal)
    return (
      <OrderModal
        orderId={id as string}
        status={orderStatus as ModalStatusKey}
        setIsModal={setIsModal}
        getStatusWithId={getStatusWithId}
      />
    );

  return (
    <List>
      {orders.map((order) => (
        <li className="list-container" key={order.id} data-id={order.id}>
          <OrderInfoHeader>
            <StatusButtonContainer
              number={order.number}
              price={order.price}
              id={order.id}
              status={order.status}
              getStatusWithId={getStatusWithId}
              setIsModal={setIsModal}
            />
          </OrderInfoHeader>
          <OrderProductInfo order={order} />
        </li>
      ))}
    </List>
  );
};

export default OrderStateListContainer;

interface StatusButtonContainerProps {
  number: number;
  price: number;
  id: string;
  status: OrderStatusValue;
  getStatusWithId: (id: string, status: OrderStatusValue | null) => void;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const StatusButtonContainer = ({
  number,
  price,
  id,
  status,
  getStatusWithId,
  setIsModal
}: StatusButtonContainerProps) => {
  const handleSetModalItem = (id: string, status: OrderStatusValue) => () => {
    getStatusWithId(id, status);
    setIsModal(() => true);
  };

  return (
    <>
      <div className="list-header">
        <span>
          <strong>주문번호</strong>
          {number}
        </span>
        <span>
          <strong>총 금액</strong>
          {translateLocalCurrency(price)}원
        </span>
      </div>

      <div className="order-button-container">
        <ReadyOrderButton
          onClick={handleSetModalItem(id, "READY")}
          variants={buttonBlinkVariants}
          animate={status === "READY" && "animation"}
          status={status}
        >
          주문접수
        </ReadyOrderButton>
        <DoneOrderButton
          onClick={handleSetModalItem(id, "DONE")}
          status={status}
        >
          준비완료
        </DoneOrderButton>
        <CompleteOrderButton
          onClick={handleSetModalItem(id, "COMPLETE")}
          status={status}
        >
          주문완료
        </CompleteOrderButton>
        <CancelOrderButton
          onClick={handleSetModalItem(id, "CANCELED")}
          status={status}
        >
          주문취소
        </CancelOrderButton>
      </div>
    </>
  );
};

interface OrderProductInfoProps {
  order: NewOrder;
}

const OrderProductInfo = ({ order }: OrderProductInfoProps) => {
  return (
    <OrderProductInfoContainer>
      <div>
        <ul>
          {order.orderProducts.map((product, index) => (
            <li
              data-orderid={product?.orderId}
              key={`${product?.orderId}-${index}`}
            >
              <span
                data-productid={`${product?.orderId}-${product?.productId}-${index}`}
              >
                <strong>상품 이름</strong>
                {product?.productName}
              </span>
              <span>
                <strong>가격</strong>
                {product?.productPrice &&
                  translateLocalCurrency(Number(product?.productPrice))}
                원
              </span>
              <span>
                <strong>주문 수량</strong>
                {product?.amount}
              </span>
              <span data-optionid={product?.productOptionId}>
                <strong>옵션</strong>
                {product?.optionName}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </OrderProductInfoContainer>
  );
};
