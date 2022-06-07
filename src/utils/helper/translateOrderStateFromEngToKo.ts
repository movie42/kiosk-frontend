import { OrderState } from "../../mockup/orderList";

export const translateOrderStateFromEngToKo = (state: OrderState) => {
  if (state === OrderState.ORDER) {
    return "접수";
  }

  if (state === OrderState.CANCEL) {
    return "취소";
  }

  if (state === OrderState.COMPLETE) {
    return "완료";
  }

  return;
};
