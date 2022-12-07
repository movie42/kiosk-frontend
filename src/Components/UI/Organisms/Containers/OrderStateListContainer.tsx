import React from "react";
import { useRecoilValue } from "recoil";
import { translateLocalCurrency } from "@/lib/utils";
import { getOrderForFrontend, NewOrder } from "@/lib/state";
import { useModalHook } from "@/lib/hooks";
import { OrderStatusType } from "@/lib/generated/graphql";
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
import useUpdateOrderStatus from "./hooks/useUpdateOrderStatus";

const OrderStateListContainer = () => {
  const orders = useRecoilValue(getOrderForFrontend);

  const { id, setId, isModal, setIsModal, confirm, setConfirm } =
    useModalHook();

  const { orderStatus, handleSetModalItem } = useUpdateOrderStatus({
    id,
    confirm,
    setId,
    setIsModal,
    setConfirm
  });

  return (
    <>
      {isModal && (
        <OrderModal
          orderId={id as string}
          setIsModal={setIsModal}
          setConfirm={setConfirm}
          status={orderStatus as OrderStatusType}
        />
      )}

      <List>
        {orders.map((order) => (
          <li className="list-container" key={order.id} data-id={order.id}>
            <OrderInfoHeader>
              <div className="list-header">
                <span>
                  <strong>주문번호</strong>
                  {order.number}
                </span>
                <span>
                  <strong>총 금액</strong>
                  {translateLocalCurrency(order.price)}원
                </span>
              </div>
              <div className="order-button-container">
                <ReadyOrderButton
                  onClick={(e: any) =>
                    handleSetModalItem(e, OrderStatusType.Ready)
                  }
                  variants={buttonBlinkVariants}
                  animate={order.status === "READY" && "animation"}
                  status={order.status}
                >
                  주문접수
                </ReadyOrderButton>
                <DoneOrderButton
                  onClick={(e: any) =>
                    handleSetModalItem(e, OrderStatusType.Done)
                  }
                  status={order.status}
                >
                  준비완료
                </DoneOrderButton>
                <CompleteOrderButton
                  onClick={(e: any) =>
                    handleSetModalItem(e, OrderStatusType.Complete)
                  }
                  status={order.status}
                >
                  주문완료
                </CompleteOrderButton>
                <CancelOrderButton
                  onClick={(e: any) =>
                    handleSetModalItem(e, OrderStatusType.Canceled)
                  }
                  status={order.status}
                >
                  주문취소
                </CancelOrderButton>
              </div>
            </OrderInfoHeader>
            <OrderProductInfo order={order} />
          </li>
        ))}
      </List>
    </>
  );
};

export default OrderStateListContainer;
interface OrderProps {
  order: NewOrder;
}

const OrderProductInfo = ({ order }: OrderProps) => {
  const handleProductState = (e: React.MouseEvent<HTMLSpanElement>) => {
    const productId = e.currentTarget.dataset.productid;
    console.log(productId);
  };

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
                onClick={handleProductState}
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
