import {
  NewModal,
  ModalHeader,
  ConfirmCancelButtons
} from "@/Components/UI/Molecules";
import { PaymentBox } from "./styles";

interface ReceiptProps {
  remain: number;
  handleReceipt: (receipt: boolean) => void;
}

const PrintReceipt = ({ remain, handleReceipt }: ReceiptProps) => {
  return (
    <>
      <NewModal
        modalOptions={{ stretch: false }}
        Header={
          <ModalHeader
            title="결제가 완료되었습니다"
            subtitle="영수증을 출력하시겠습니까?"
          />
        }
        Model={
          <PaymentBox>
            <h1>{remain}</h1>
            <span>선택하지 않을 경우 자동으로 출력됩니다</span>
          </PaymentBox>
        }
        Buttons={
          <ConfirmCancelButtons
            cancelProps={{
              onClick: () => handleReceipt(false),
              children: "아니요"
            }}
            confirmProps={{
              onClick: () => handleReceipt(true),
              children: "예"
            }}
          />
        }
      />
    </>
  );
};

export default PrintReceipt;
