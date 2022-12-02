import { OrderStatusValue } from "../state/interface";

const translateOrderStateFromEngToKo = (state: OrderStatusValue) => {
  if (state === "READY") {
    return "접수";
  }

  if (state === "CANCELED") {
    return "취소";
  }

  if (state === "COMPLETE") {
    return "완료";
  }

  return;
};

export default translateOrderStateFromEngToKo;
