import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { selectMenuListState } from "../../state/productItemState";
import { IOrderSelectedItem } from "./ClientMenu";
import Modal from "../../Components/Modals/Modal";
import styled from "styled-components";
import { Headline1 } from "../../mixin";
import OrderStateBar from "./OrderStateBar";
import PaymentModalChildren from "./Modal/PaymentModalChildren";
import { useNavigate } from "react-router-dom";
import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";

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

const MenuListItem = styled.div`
  display: grid;
  grid-template-columns: 20% 50% 30%;
  padding: 0.5rem 0;
  border-bottom: 1px solid black;
  img {
    border: 1px solid;
    border-color: ${(props) => props.theme.color.gray300};
  }
  div {
    /* display: grid; */
    padding: 0 0.5rem;
  }
  h2 {
    font-size: 2rem;
    font-weight: bold;
    padding: 1.3rem 0 0.8rem 0;
  }
  p {
    font-size: 1.5rem;
    padding: 0.3rem 0;
  }
`;
const DeleteButton = styled(ButtonDefaultStyle)`
  background-color: ${(props) => props.theme.color.gray300};
`;

const ClientSelectList = () => {
  const navigate = useNavigate();
  // order menu list
  const [totalSelectMenu, setTotalSelectMenu] =
    useRecoilState(selectMenuListState);

  // hide modal
  const [isModal, setIsModal] = useState(false);

  // for Order State bar handler
  const handlePayment = () => {
    setIsModal(true);
  };

  const handleAddCount = (current: IOrderSelectedItem) => {
    let [selected] = totalSelectMenu
      .filter((menu) => menu.productId === current.productId)
      .filter((menu) => menu.option === current.option);
    let newCount = selected.totalCount + 1;
    setTotalSelectMenu((item) =>
      [
        ...item.filter((el) => el !== selected),
        {
          ...selected,
          totalCount: newCount,
          totalPrice: selected.price * newCount,
        },
      ].sort((a: any, b: any) => {
        if (a.productId === b.productId) {
          return a?.option > b?.option ? 1 : -1;
        }
        return a.productId - b.productId;
      })
    );
  };

  const handleMinusCount = (current: IOrderSelectedItem) => {
    let [selected] = totalSelectMenu
      .filter((menu) => menu.productId === current.productId)
      .filter((menu) => menu.option === current.option);
    let newCount = selected.totalCount - 1;
    if (newCount < 1) {
      return;
    }
    setTotalSelectMenu((item) =>
      [
        ...item.filter((el) => el !== selected),
        {
          ...selected,
          totalCount: newCount,
          totalPrice: selected.price * newCount,
        },
      ].sort((a: any, b: any) => {
        if (a.productId === b.productId) {
          return a?.option > b?.option ? 1 : -1;
        }
        return a.productId - b.productId;
      })
    );
  };

  // delete item from list
  const handleDelete = (current: IOrderSelectedItem) => {
    const [filtered] = totalSelectMenu.filter(
      (el) => el.productId === current.productId && el.option === current.option
    );
    const isDelete = window.confirm("정말 삭제하시겠습니까?");
    if (isDelete)
      setTotalSelectMenu((item) => [...item.filter((el) => el !== filtered)]);
  };

  return (
    <>
      {isModal && (
        <Modal strach={true}>
          <PaymentModalChildren setIsModal={setIsModal} />
        </Modal>
      )}
      <Header>
        <h1>주문 목록</h1>
      </Header>

      {totalSelectMenu.map((item, i) => (
        <MenuListItem key={`${item.productId}_${i}`}>
          <img src="" />
          <div>
            <h2>{item.name}</h2>
            {item.option && <p>선택옵션: {item.option}</p>}
            <p>
              주문수량:
              <button onClick={() => handleMinusCount(item)}>-</button>
              {item.totalCount}
              <button onClick={() => handleAddCount(item)}>+</button>
            </p>
          </div>
          <div>
            <p>총 가격: {item.totalPrice}</p>
            <DeleteButton onClick={() => handleDelete(item)}>
              삭제하기
            </DeleteButton>
          </div>
        </MenuListItem>
      ))}

      <OrderStateBar
        totalCount={totalSelectMenu.reduce(function (acc, obj) {
          return acc + obj.totalCount;
        }, 0)}
        totalPrice={totalSelectMenu.reduce(function (acc, obj) {
          return acc + obj.totalPrice;
        }, 0)}
        label="주문하기"
        goBack={() => navigate("/client/menu")}
        handler={handlePayment}
      />
    </>
  );
};

export default ClientSelectList;
