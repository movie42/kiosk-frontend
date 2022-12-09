export const MODAL_MESSAGE = {
  READY: "주문을 접수하시겠습니까?",
  DONE: "모든 상품이 준비되었나요?",
  COMPLETE: "주문을 완료하시겠어요?",
  CANCELED: "주문을 취소하시겠습니까?"
} as const;

export const CONFIRM_BUTTON_NAME = {
  READY: "주문접수",
  DONE: "준비완료",
  COMPLETE: "주문완료",
  CANCELED: "주문취소"
} as const;

export type ModalStatusType = typeof MODAL_MESSAGE;
export type ModalStatusKey = keyof ModalStatusType;
