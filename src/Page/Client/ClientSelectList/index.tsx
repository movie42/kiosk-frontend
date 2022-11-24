import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../../../Components";
import PaymentModal from "./PaymentModal";
import { selectMenuListState } from "../../../lib/state/productItemState";
import {
  Header,
  MenuListWrapper,
  ResetButtonWrapper,
  ResetButton
} from "./styles";
import OrderStateBar from "../OrderStateBar";
import MenuListItem from "./MenuListItem";
import useHandleSelectMenu from "./hooks/useHandleSelectMenu";

const ClientSelectList = () => {
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
        totalCount={totalSelectMenu.reduce(
          (acc, obj) => acc + obj.totalCount,
          0
        )}
        totalPrice={totalSelectMenu.reduce(
          (acc, obj) => acc + obj.totalPrice,
          0
        )}
        label="주문하기"
        goBack={() => navigate(`/client/${userId}/${storeId}/menu`)}
        handler={() => setIsModal(() => true)}
      />
    </>
  );
};

export default ClientSelectList;
