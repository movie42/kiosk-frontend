import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";
import { selectMenuListState } from "../../state/productItemState";
import { IOrderSelectedItem } from "./ClientMenu";
import Modal from "../../Components/Modals/Modal";
import { Headline1, SubTitle1, SubTitle2, Body1 } from "../../mixin";
import OrderStateBar from "./OrderStateBar";
import PaymentModalChildren from "./Modal/PaymentModalChildren";
import { useNavigate, useParams } from "react-router-dom";
import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";
import { translateLocalCurrency } from "../../utils/helper/translateLocalCurrency";
import Noimage from "../../Components/Images/Noimage";
import Images from "../../Components/Images/Images";

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
const MenuListWrapper = styled.div`
  margin: 1rem 0;
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
    ${SubTitle1}
    font-weight: bold;
    padding: 1.3rem 0 0.8rem 0;
  }
  p {
    ${Body1}
    padding: 0.3rem 0;
  }
  span {
    vertical-align: super;
    padding: 0.5rem;
  }
  .price {
    margin-top: 1rem;
    ${SubTitle2}
  }
`;
const DeleteButton = styled(ButtonDefaultStyle)`
  background-color: ${(props) => props.theme.color.gray300};
`;
const ResetButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const ResetButton = styled(ButtonDefaultStyle)`
  text-align: center;
  background-color: ${(props) => props.theme.color.primary500};
`;
export const AddCountButton = styled(ButtonDefaultStyle)`
  background-color: unset;
  color: ${(props) => props.theme.color.primary500};
  font-size: 2.3rem;
  vertical-align: middle;
`;
export const MinusCountButton = styled(ButtonDefaultStyle)`
  background-color: unset;
  color: ${(props) => props.theme.color.error500};
  font-size: 2.3rem;
  vertical-align: middle;
`;

const ClientSelectList = () => {
  const navigate = useNavigate();
  const { userId, storeId } = useParams();
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
          <PaymentModalChildren setIsModal={setIsModal} />
        </Modal>
      )}
      <Header>
        <h1>주문 목록</h1>
      </Header>
      <MenuListWrapper>
        {totalSelectMenu.map((item, i) => (
          <MenuListItem key={`${item.productId}_${i}`}>
            {item.imageUrl ? (
              <div style={{ padding: "0.5rem 1rem 0.5rem 0" }}>
                <Images src={item.imageUrl} alt={item.name} />
              </div>
            ) : (
              <Noimage />
            )}
            <div>
              <h2>{item.name}</h2>
              {item.option && <p>선택옵션: {item.option}</p>}
              <p>
                주문수량:
                <MinusCountButton onClick={() => handleMinusCount(item)}>
                  <AiFillMinusCircle />
                </MinusCountButton>
                {item.totalCount}
                <AddCountButton onClick={() => handleAddCount(item)}>
                  <IoIosAddCircle />
                </AddCountButton>
              </p>
            </div>
            <div>
              <p className="price">
                총 가격:&nbsp;
                {translateLocalCurrency(item.totalPrice, "ko-KR")}원
              </p>
              <DeleteButton onClick={() => handleDelete(item)}>
                삭제하기
              </DeleteButton>
            </div>
          </MenuListItem>
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
        handler={handlePayment}
      />
    </>
  );
};

export default ClientSelectList;
