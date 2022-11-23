import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Modal } from "../../../Components";
import {
  productListState,
  ProductListValues,
  selectMenuListState
} from "../../../lib/state/productItemState";
import OrderStateBar from "../OrderStateBar";
import MenuItemModal from "./MenuItemModal";
import MenuList from "./MenuList";

import { Header, Container, SubTitle } from "./styles";

export interface IOrderSelectedItem {
  productId: number;
  name: string;
  optionId: number;
  option?: string;
  price: number;
  totalCount: number;
  totalPrice: number;
  imageUrl?: string | null | undefined;
}

const ClientMenu = () => {
  const navigate = useNavigate();
  const { userId, storeId } = useParams();

  const [isModal, setIsModal] = useState(false);

  // select menu item & add count (in Modal)
  const [count, setCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState<ProductListValues[]>([]);

  // make order list
  const [orderItem, setOrderItem] = useRecoilState(selectMenuListState);
  const menuList = useRecoilValue(productListState);

  const selectHandler = (menuId: number) => {
    setIsModal(true);
    const selected = menuList.filter((el) => el.id === menuId);
    setSelectedItem([...selected]);
  };

  if (isModal)
    return (
      <Modal strach={true} fullBox={true}>
        <MenuItemModal
          setIsModal={setIsModal}
          selectedItem={selectedItem}
          count={count}
          setCount={setCount}
          orderItem={orderItem}
          setOrderItem={setOrderItem}
        />
      </Modal>
    );

  return (
    <>
      <Header>
        <h1>누구나 키오스크</h1>
      </Header>
      <Container>
        <SubTitle>메뉴 목록</SubTitle>
        <MenuList storeId={storeId} selectHandler={selectHandler} />
      </Container>
      <OrderStateBar
        totalCount={orderItem.reduce((acc, obj) => acc + obj.totalCount, 0)}
        totalPrice={orderItem.reduce((acc, obj) => acc + obj.totalPrice, 0)}
        label="주문 목록 보기"
        handler={() => navigate(`/client/${userId}/${storeId}/select-list`)}
      />
    </>
  );
};

export default ClientMenu;
