import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "../../../Components/Modals/Modal";
import IsOpenModalChildren from "../Modal/IsOpenModalChildren";
import useModalHook from "../../../utils/customHooks/useModalHook";
import PageHeaderMessage from "../../../Components/PageHeader";
import {
  useMyStoresQuery,
  useStoreQuery,
  useStoresQuery,
} from "../../../generated/graphql";
import graphqlReqeustClient from "../../../lib/graphqlRequestClient";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../state/userState";
import { storeState } from "../../../state/storeState";

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
  background-color: ${(props) => props.theme.color.primary600};
  font-size: 3rem;
  font-weight: bold;
  word-break: keep-all;
  color: ${(props) => props.theme.color.fontColorWhite};
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
  background-color: ${(props) => props.theme.color.secondary500};
`;

const BusinessManageButtonWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  gap: 0.8rem;
`;

const LinkToProductManageWindowButton = styled(MenuButtonDefault)`
  height: 100%;
  background-color: ${(props) => props.theme.color.primary800};
`;

const LinkToCrewMangageWindowButton = styled(MenuButtonDefault)`
  height: 100%;
  background-color: ${(props) => props.theme.color.secondary800};
`;

const BusinessInfoContainer = styled.div`
  span {
    font-size: 1.8rem;
    margin-right: 1.2rem;
  }
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
    props.isActive ? props.theme.color.primary600 : props.theme.color.gray300};
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
    props.isActive ? props.theme.color.primary600 : props.theme.color.error500};
  border: 0;
  border-radius: 2rem;
  padding: 0.5rem 0.3rem;
  margin: 0.5rem;
  box-shadow: inset 0.1rem 0.15rem 0.2rem
    ${(props) =>
      props.isActive
        ? props.theme.color.primary800
        : props.theme.color.error800};
  &::before {
    position: absolute;
    top: 50%;
    left: ${(props) => (props.isActive ? "unset" : "0.2rem")};
    right: ${(props) => (props.isActive ? "0.2rem" : "unset")};
    transform: translateY(-50%);
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 2rem;
    background-color: ${(props) => props.theme.color.background100};
    content: "";
  }
`;

interface IAdminMenuProps {
  isActive: boolean;
}

const AdminManageProductMain = () => {
  const { storeId } = useParams();
  const { id: userId } = useRecoilValue(userState);
  const navigate = useNavigate();
  const [store, setStore] = useRecoilState(storeState);
  const { accessToken, refreshToken } = useRecoilValue(userState);
  const [toggleState, setToggleState] = useState(false);
  const { id, setId, isModal, setIsModal, confirm, setConfirm } =
    useModalHook();
  const { isSuccess } = useStoreQuery(
    graphqlReqeustClient(accessToken),
    {
      id: Number(id),
    },
    {
      onSuccess: (data) => {
        if (data.store) {
          const { id, name, code, address, phone, isAvailable } = data.store;
          setStore({ id, name, address, code, phone, isAvailable });
        }
      },
    }
  );

  const toggleHandler = () => {
    setIsModal(true);
  };

  const linkToCustomerWindowHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const linkName = e.currentTarget.dataset.link;
    if (linkName === "order" && toggleState) {
      navigate(`/client/${userId}/${storeId}`);
    }

    if (linkName === "manage-order") {
      navigate(`/admin/${userId}/store/${storeId}/manage-order`);
    }

    if (linkName === "manage-product") {
      navigate(`/admin/${userId}/store/${storeId}/product/manage-product`);
    }
  };

  useEffect(() => {
    if (storeId) {
      setId(storeId);
    }
  }, []);

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
      <PageHeaderMessage header="관리자 메뉴" message={store.name} />
      <BusinessInfoContainer>
        <span>사업자 번호 : {store.code}</span>
        <span>주소 : {store.address}</span>
        <span>대표번호 : {store.phone}</span>
      </BusinessInfoContainer>
      <Menu>
        <MenuButtonWrapper>
          {store.isAvailable ? (
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
            isActive={store.isAvailable}
          >
            <span>고객 주문 화면</span>
            {store.isAvailable && <span>현재 주문을 받고 있는 중입니다.</span>}
          </LinkToCustomerWindowButton>
        </MenuButtonWrapper>
        <LinkToStaffWindowButton
          data-link="manage-order"
          onClick={linkToCustomerWindowHandler}
        >
          고객 주문 관리하기
        </LinkToStaffWindowButton>
        <BusinessManageButtonWrapper>
          <LinkToProductManageWindowButton
            data-link="manage-product"
            onClick={linkToCustomerWindowHandler}
          >
            상품 관리하기
          </LinkToProductManageWindowButton>
        </BusinessManageButtonWrapper>
      </Menu>
    </Wrapper>
  );
};

export default AdminManageProductMain;
