import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Modal from "../../Components/Modals/Modal";
import OrderStateBar from "./OrderStateBar";
import MenuItemModalChildren from "./Modal/MenuItemModalChildren";
import { ProductListValues } from "../../state/productItemState";
import {
  productListState,
  selectMenuListState,
} from "../../state/productItemState";
import { Headline1 } from "../../mixin";
import { useNavigate, useParams } from "react-router-dom";
import { userState } from "../../state/userState";
import { useGetProductsQuery } from "../../generated/graphql";
import graphqlReqeustClient from "../../lib/graphqlRequestClient";
import Loading from "../../Components/Loading";
import Noimage from "../../Components/Images/Noimage";
import Images from "../../Components/Images/Images";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  h1 {
    ${Headline1}
    line-height: 1;
    ${({ theme }) => theme.device.mobile} {
      font-size: 4.2rem;
    }
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

const Container = styled.div`
  ul.productList {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(20rem, auto);
  }
`;
const SubTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  padding: 0.8rem 0 1.3rem 0;
`;

const Item = styled.li`
  .item-container {
    position: relative;
    cursor: pointer;
    background-color: ${(props) => props.theme.color.background100};
    height: 100%;
    min-width: 20rem;
    overflow: hidden;
    display: grid;
    grid-template-rows: minmax(12rem, 0.9fr) 0.8fr;
    border: 1px solid ${({ theme }) => theme.color.gray300};
    border-radius: 0.4rem;
    text-decoration: none;
    color: ${(props) => props.theme.color.fontColorBlack};
    .is-select {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 4;
    }
    .image-container {
      overflow: hidden;
      position: relative;
      .transparent-box {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: ${({ theme }) => theme.color.backgroundBlack60};
      }
    }
    .item-info-container {
      align-self: center;
      padding: 0.8rem;
      h3 {
        font-size: 3rem;
        font-weight: bold;
        margin-bottom: 0.6rem;
      }
      h4 {
        font-size: 2rem;
        align-self: end;
      }
    }
  }
`;

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
  const { accessToken } = useRecoilValue(userState);

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

  //
  const { isLoading } = useGetProductsQuery(
    graphqlReqeustClient(accessToken),
    {
      id: Number(storeId),
    },
    {
      onSuccess: (data) => {
        if (data.store?.products) {
          const productList = data.store.products
            .map<ProductListValues>((value) => ({
              id: Number(value.id),
              name: value.name,
              price: value.price,
              imageUrl: value.imageUrl,
              description: value.description,
              options: value.options.map((value) => ({
                id: Number(value.id),
                name: value.name,
              })),
              isAvailable: value.isAvailable,
            }))
            .filter((value) => value.isAvailable === true);
          setMenuList(productList);
        }
      },
    }
  );

  return isLoading ? (
    <Loading title="등록한 상품을 불러오고 있습니다." />
  ) : (
    <>
      {isModal && (
        <Modal strach={true} fullBox={true}>
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
                <div className="item-container">
                  <div className="image-container">
                    {item.imageUrl ? (
                      <Images src={item.imageUrl} alt={item.name} />
                    ) : (
                      <Noimage />
                    )}
                  </div>
                  <div className="item-info-container">
                    <h3>{item.name}</h3>
                    <h4>가격 {item.price.toLocaleString()}원</h4>
                  </div>
                </div>
              </Item>
            ))}
        </ul>
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
