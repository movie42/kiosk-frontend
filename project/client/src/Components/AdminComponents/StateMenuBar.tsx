import React, { useState } from "react";
import styled from "styled-components";
import { ProductListValues } from "../../mockup/productList";
import Modal from "./Modal";

const MenuBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 2rem;
  background-color: ${(props) => props.theme.black};
  height: 6rem;

  h2 {
    font-size: 2.2rem;
    font-weight: bold;
    color: ${(props) => props.theme.white};
  }

  button {
    cursor: pointer;
    padding: 0.7rem 2rem;
    border: 0;
    font-size: 2.4rem;
    color: ${(props) => props.theme.white};
    border-radius: 0.3rem;
    line-height: 2.8rem;
    background-color: ${(props) => props.theme.warning};
  }
`;

interface ISateMenuBarProps {
  selectItems: Array<ProductListValues>;
}

const StateMenuBar: React.FC<ISateMenuBarProps> = ({ selectItems }) => {
  const [isModal, setModal] = useState(false);

  const handleModalAppear = () => {
    setModal(!isModal);
  };

  return (
    <>
      {isModal && (
        <Modal
          modalHeadtitle="삭제하기"
          setModal={setModal}
          items={selectItems}
        />
      )}
      <MenuBarContainer>
        <h2>{selectItems.length}개의 상품을 삭제하려면 버튼을 누르세요.</h2>
        <button onClick={handleModalAppear}>삭제하기</button>
      </MenuBarContainer>
    </>
  );
};

export default StateMenuBar;
