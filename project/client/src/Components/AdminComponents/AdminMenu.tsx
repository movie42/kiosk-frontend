import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal/Modal";
import IsOpenModalChildren from "./Modal/IsOpenModalChildren";

const Wrapper = styled.div`
  h2 {
    font-size: 2rem;
  }
`;

const Menu = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 2.5rem;
  grid-template-columns: repeat(3, 20rem);
  justify-items: center;
  justify-content: center;
`;

const MenuButtonDefault = styled.button`
  box-sizing: border-box;
  border: 0;
  border-radius: 0.6rem;
  width: 20rem;
  height: 70vh;
  cursor: pointer;
  background-color: ${(props) => props.theme.success};
  font-size: 3rem;
  font-weight: bold;
  word-break: keep-all;
  color: ${(props) => props.theme.white};
`;

const MenuButtonWrapper = styled.div`
  position: relative;
  p {
    position: absolute;
    top: -1.3rem;
    right: 0;
    font-size: 1rem;
  }
`;

const LinkToStaffWindowButton = styled(MenuButtonDefault)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme["brand-color-green"]};
`;

const BusinessManageButtonWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  gap: 0.8rem;
`;

const LinkToProductManageWindowButton = styled(MenuButtonDefault)`
  height: 100%;
  background-color: ${(props) => props.theme["brand-color-blue"]};
`;

const LinkToCrewMangageWindowButton = styled(MenuButtonDefault)`
  height: 100%;
  background-color: ${(props) => props.theme["brand-color-purple"]};
`;

const LinkToCustomerWindowButton: React.FC<
  | IAdminMenuProps
  | React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
> = styled(MenuButtonDefault)<IAdminMenuProps>`
  position: relative;
  background-color: ${(props) =>
    props.isActive ? props.theme["brand-color-blue"] : props.theme.netural};
  span {
    display: inline-block;
    font-weight: normal;
    font-size: 1.2rem;
    &:first-child {
      font-size: 3rem;
      font-weight: bold;
    }
  }
`;

const ToggleButton: React.FC<
  | IAdminMenuProps
  | React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
> = styled.div<IAdminMenuProps>`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  width: 3rem;
  height: 1rem;
  cursor: pointer;
  background-color: ${(props) =>
    props.isActive ? props.theme.success : props.theme.warning};
  border: 0;
  border-radius: 2rem;
  padding: 0.5rem 0.3rem;
  margin: 0.5rem;
  box-shadow: inset 0.1rem 0.15rem 0.2rem
    ${(props) =>
      props.isActive
        ? props.theme["success-dark"]
        : props.theme["warning-dark"]};
  &::before {
    position: absolute;
    top: 50%;
    left: ${(props) => (props.isActive ? "unset" : "0.2rem")};
    right: ${(props) => (props.isActive ? "0.2rem" : "unset")};
    transform: translateY(-50%);
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 2rem;
    background-color: ${(props) => props.theme.white};
    content: "";
  }
`;

interface IAdminMenuProps {
  isActive: boolean;
}

const AdminMenu = () => {
  const [toggleState, setToggleState] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  const toggleHandler = () => {
    setIsModal(true);
  };

  const linkToCustomerWindowHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const linkName = e.currentTarget.dataset.link;
    if (linkName === "order") {
      if (toggleState) {
        navigate("/order");
      }
    }
    if (linkName === "order-manage") {
      navigate("manage-customer-order");
    }
    if (linkName === "product-manage") {
      navigate("/admin/:id/manage-product");
    }
    if (linkName === "crew-manage") {
      navigate("manage-crew");
    }
  };

  useEffect(() => {
    if (confirm) {
      setToggleState((preValue) => !preValue);
      setConfirm(false);
    }
  }, [confirm]);

  return (
    <Wrapper>
      {isModal && (
        <Modal>
          <IsOpenModalChildren
            toggleState={toggleState}
            setModal={setIsModal}
            setConfirm={setConfirm}
          />
        </Modal>
      )}
      <h2>원하는 기능을 선택하세요.</h2>
      <Menu>
        <MenuButtonWrapper>
          {toggleState ? (
            <p>가게를 닫으려면 버튼을 누르세요.</p>
          ) : (
            <p>가게를 열려면 버튼을 누르세요.</p>
          )}
          <ToggleButton
            isActive={toggleState}
            onClick={toggleHandler}
          ></ToggleButton>
          <LinkToCustomerWindowButton
            data-link="order"
            onClick={linkToCustomerWindowHandler}
            isActive={toggleState}
          >
            <span>고객 주문 화면</span>
            {toggleState && <span>현재 주문을 받고 있는 중입니다.</span>}
          </LinkToCustomerWindowButton>
        </MenuButtonWrapper>
        <LinkToStaffWindowButton
          data-link="order-manage"
          onClick={linkToCustomerWindowHandler}
        >
          고객 주문 관리하기
        </LinkToStaffWindowButton>
        <BusinessManageButtonWrapper>
          <LinkToProductManageWindowButton
            data-link="product-manage"
            onClick={linkToCustomerWindowHandler}
          >
            상품 관리하기
          </LinkToProductManageWindowButton>
          <LinkToCrewMangageWindowButton
            data-link="crew-manage"
            onClick={linkToCustomerWindowHandler}
          >
            크루 관리하기
          </LinkToCrewMangageWindowButton>
        </BusinessManageButtonWrapper>
      </Menu>
    </Wrapper>
  );
};

export default AdminMenu;
