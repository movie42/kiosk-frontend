import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { selectMenuListState } from "@/lib/state";
import { PaymentBox } from "./styles";
import { NewModal } from "@/Components/UI/Molecules";

interface ConfirmProps {
  orderNumber: number;
  userId: string | undefined;
  storeId: string | undefined;
}

const OrderConfirm = ({ orderNumber, userId, storeId }: ConfirmProps) => {
  const navigate = useNavigate();
  const setOrderList = useSetRecoilState(selectMenuListState);

  const confirmOrder = () => {
    setOrderList([]);
    navigate(`/client/${userId}/${storeId}/main`);
  };

  return (
    <NewModal
      title="주문이 완료되었습니다"
      subtitle="주문 번호를 확인해주세요"
      confirmFn={confirmOrder}
      confirmText="확인"
    >
      <PaymentBox>
        <h1>{orderNumber}</h1>
      </PaymentBox>
    </NewModal>
  );
};

export default OrderConfirm;
