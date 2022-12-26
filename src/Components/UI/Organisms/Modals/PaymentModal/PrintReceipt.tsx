import { NewModal } from "@/Components/UI/Molecules";
import { PaymentBox } from "./styles";

interface ReceiptProps {
  remain: number;
  handleReceipt: (receipt: boolean) => void;
}

const PrintReceipt = ({ remain, handleReceipt }: ReceiptProps) => {
  return (
    <NewModal
      title="결제가 완료되었습니다"
      subtitle="영수증을 출력하시겠습니까?"
      confirmFn={() => handleReceipt(true)}
      cancelFn={() => handleReceipt(false)}
      confirmText="예"
      cancelText="아니요"
    >
      <PaymentBox>
        <h1>{remain}</h1>
        <span>선택하지 않을 경우 자동으로 출력됩니다</span>
      </PaymentBox>
    </NewModal>
  );
};

export default PrintReceipt;
