import { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom";

import { MenuItemModal, Modal } from "@/Components/UI/Organisms";
import { Loading } from "@/Components/UI/Molecules";
import { ProductListValues, selectMenuListState } from "@/lib/state";
import { calculateTotalAmount } from "@/lib/utils";
import { useGetMenuList } from "../hooks";
import { OrderStateBar } from "../OrderStateBar";
import { Header, Container, SubTitle } from "./styles";
import ListItem from "@/Components/UI/Molecules/ListItem/ListItem";
import { List } from "@/Components/UI/Molecules/ListItem/styles";

const ClientMenuPage = () => {
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
        totalCount={calculateTotalAmount(orderItem, "totalCount")}
        totalPrice={calculateTotalAmount(orderItem, "totalPrice")}
        label="주문 목록 보기"
        handler={() => navigate(`/client/${userId}/${storeId}/select-list`)}
      />
    </>
  );
};

export default ClientMenuPage;

interface MenuListProps {
  isLoading: boolean;
  menuList: ProductListValues[] | undefined;
  selectHandler: (menuId: number) => void;
}

const MenuList = ({ isLoading, menuList, selectHandler }: MenuListProps) => {
  if (isLoading) return <Loading title="등록한 상품을 불러오고 있습니다." />;

  return (
    <List>
      {menuList &&
        menuList.map((item) => (
          <ListItem
            key={item.id}
            onClick={() => selectHandler(item.id)}
            itemId={item.id}
            price={item.price}
            name={item.name}
            imageUrl={item.imageUrl}
          />
        ))}
    </List>
  );
};
