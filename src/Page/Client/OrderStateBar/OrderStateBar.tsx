import { translateLocalCurrency } from "@/lib/utils";
import { GoBackButton, MenuBarContainer, OrderButton } from "./styles";

export interface TotalOrderMenu {
  totalCount: number;
  totalPrice: number;
  label: string;
  goBack?: (value: any) => void;
  handler?: (value: any) => void;
}

const OrderStateBar = ({
  totalCount = 0,
  totalPrice = 0,
  label,
  goBack,
  handler
}: TotalOrderMenu) => {
  return (
    <div>
      <MenuBarContainer>
        <h2>
          총 상품 수:&nbsp;{totalCount}개 &nbsp;&nbsp;&nbsp; 주문 가격:&nbsp;
          {translateLocalCurrency(totalPrice, "ko-KR")}원
        </h2>
        <div>
          <GoBackButton onClick={goBack}>돌아가기</GoBackButton>
          <OrderButton onClick={handler}>{label}</OrderButton>
        </div>
      </MenuBarContainer>
    </div>
  );
};

export default OrderStateBar;
