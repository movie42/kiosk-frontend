import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Modal } from "@/Components";
import { ProductListValues, selectMenuListState } from "@/lib/state";
import MenuItemModal from "./MenuItemModal";
import MenuList from "./MenuList";
import { Header, Container, SubTitle } from "./styles";
import OrderStateBar from "../OrderStateBar";
import useGetMenuList from "../hooks/useGetMenuList";

const ClientMenu = () => {
  const navigate = useNavigate();
  const { userId, storeId } = useParams();

  const [isModal, setIsModal] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState<ProductListValues[]>([]);
  const [orderItem, setOrderItem] = useRecoilState(selectMenuListState);

  const { isLoading, menuList } = useGetMenuList(storeId);

  const selectHandler = (menuId: number) => {
    setIsModal(true);
    if (menuList) {
      const selected = menuList.filter((el) => el.id === menuId);
      setSelectedItem([...selected]);
    }
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
        <MenuList
          isLoading={isLoading}
          menuList={menuList}
          selectHandler={selectHandler}
        />
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
