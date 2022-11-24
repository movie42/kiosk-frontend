import { OrderStatusType } from "../state";

const translateOrderStateFromEngToKo = (state: OrderStatusType) => {
  if (state === OrderStatusType.Ready) {
    return "접수";
  }

  if (state === OrderStatusType.Canceled) {
    return "취소";
  }

  if (state === OrderStatusType.Complete) {
    return "완료";
  }

  return;
};

export default translateOrderStateFromEngToKo;
