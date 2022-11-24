import { useState } from "react";
import { useRecoilState } from "recoil";
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

const ClientSelectList = () => {
  const navigate = useNavigate();
  const { userId, storeId } = useParams();
  const [totalSelectMenu, setTotalSelectMenu] =
    useRecoilState(selectMenuListState);
  const [isModal, setIsModal] = useState(false);

  const deleteAll = () => {
    const confirm = window.confirm("전체 주문을 취소하시겠습니까?");
    if (confirm) {
      setTotalSelectMenu([]);
      alert("전체 주문이 취소되었습니다");
      navigate(`/client/${userId}/${storeId}/menu`);
    }
  };

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
          <ResetButton onClick={deleteAll}>전체삭제</ResetButton>
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
