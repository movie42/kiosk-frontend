import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import { selectMenuListState } from "@/lib/state";
import { calculateTotalAmount } from "@/lib/utils";
import { PaymentModal } from "@/Components/Modals/PaymentModal";
import { Modal } from "@/Components";
import { MenuListItem } from "./MenuListItem";
import { OrderStateBar } from "../OrderStateBar";
import {
  Header,
  MenuListWrapper,
  ResetButtonWrapper,
  ResetButton
} from "./styles";
import { useHandleSelectMenu } from "../hooks";

const ClientSelectListPage = () => {
  const navigate = useNavigate();
  const { userId, storeId } = useParams();
  const totalSelectMenu = useRecoilValue(selectMenuListState);
  const [isModal, setIsModal] = useState(false);

  const { deleteAll } = useHandleSelectMenu();
  return (
    <>
      {isModal && (
        <Modal strach={true}>
          <PaymentModal setIsModal={setIsModal} />
        </Modal>
      )}
      <Header>
        <h1>주문 목록</h1>
      </Header>
      <MenuListWrapper>
        {totalSelectMenu.map((item) => (
          <MenuListItem
            key={`${item.productId}_${item.optionId || ""}`}
            item={item}
          />
        ))}
      </MenuListWrapper>
      {totalSelectMenu.length !== 0 && (
        <ResetButtonWrapper>
          <ResetButton onClick={() => deleteAll(userId, storeId)}>
            전체삭제
          </ResetButton>
        </ResetButtonWrapper>
      )}
      <OrderStateBar
        totalCount={calculateTotalAmount(totalSelectMenu, "totalCount")}
        totalPrice={calculateTotalAmount(totalSelectMenu, "totalPrice")}
        label="주문하기"
        goBack={() => navigate(`/client/${userId}/${storeId}/menu`)}
        handler={() => setIsModal(() => true)}
      />
    </>
  );
};

export default ClientSelectListPage;
