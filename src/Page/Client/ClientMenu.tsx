import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Modal from "../../Components/Modals/Modal";
import OrderStateBar from "./OrderStateBar";
import MenuItemModalChildren from "./Modal/MenuItemModalChildren";
import { ProductListValues } from "../../mockup/productList";
import {
  productListState,
  selectMenuListState,
} from "../../state/productItemState";
import { Headline1 } from "../../mixin";
import { useNavigate } from "react-router-dom";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5rem;
  h1 {
    ${Headline1}
  }
  button {
    cursor: pointer;
    padding: 0.5rem 2rem;
    border: 0;
    font-size: 2.8rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    border-radius: 0.3rem;
    background-color: ${(props) => props.theme.color.gray300};
  }
`;
const Wrapper = styled.div`
  h2 {
    font-size: 2rem;
  }
`;
const Container = styled.div`
  ul.productList {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(20rem, auto);
  }
  ul.productList li:active {
    border: 2px solid;
    border-color: ${(props) => props.theme.color.primary700};
  }
`;
const SubTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  padding: 0.8rem 0 1.3rem 0;
`;

const Item = styled.button`
  padding: 1rem;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.color.gray300};
  cursor: pointer;
  div {
    display: grid;
    height: 100%;

    h3 {
      font-size: 2rem;
      font-weight: bold;
    }

    h4 {
      font-size: 1.7rem;
      font-weight: bold;
      align-self: end;
    }
  }
`;

export interface IOrderSelectedItem {
  productId: number;
  name: string;
  option?: string;
  price: number;
  totalCount: number;
  totalPrice: number;
}

const ClientMenu = () => {
  // display menu
  const [menuList, setMenuList] = useRecoilState(productListState);

  // open modal
  const [isModal, setIsModal] = useState(false);

  // select menu item & add count (in Modal)
  const [count, setCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState<ProductListValues[]>([]);

  // make order list
  const [orderItem, setOrderItem] = useRecoilState(selectMenuListState);

  const selectHandler = (menuId: number) => {
    setIsModal(true);
    const selected = menuList.filter((el) => el.id === menuId);
    setSelectedItem([...selected]);
  };

  // for Order state bar handler
  const navigate = useNavigate();
  return (
    <>
      {isModal && (
        <Modal strach={true}>
          <MenuItemModalChildren
            setIsModal={setIsModal}
            selectedItem={selectedItem}
            count={count}
            setCount={setCount}
            orderItem={orderItem}
            setOrderItem={setOrderItem}
          />
        </Modal>
      )}
      <Header>
        <h1>누구나 키오스크</h1>
      </Header>
      <Container>
        <SubTitle>메뉴 목록</SubTitle>
        <ul className="productList">
          {menuList &&
            menuList.map((item) => (
              <Item key={item.id} onClick={() => selectHandler(item.id)}>
                <div>
                  <h3>{item.name}</h3>
                  <h4>가격 {item.price.toLocaleString()}원</h4>
                </div>
              </Item>
            ))}
        </ul>
      </Container>
      <OrderStateBar
        totalCount={orderItem.reduce(function (acc, obj) {
          return acc + obj.totalCount;
        }, 0)}
        totalPrice={orderItem.reduce(function (acc, obj) {
          return acc + obj.totalPrice;
        }, 0)}
        label="주문 목록 보기"
        handler={() => navigate("/client/select-list")}
      />
    </>
  );
};

export default ClientMenu;
