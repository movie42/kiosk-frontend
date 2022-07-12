import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "../../../Components/Modals/Modal";
import IsOpenModalChildren from "../Modal/IsOpenModalChildren";
import useModalHook from "../../../utils/customHooks/useModalHook";
import PageHeaderMessage from "../../../Components/PageHeader";
import {
  useStoreQuery,
  useToggleStoreIsAvailableMutation
} from "../../../generated/graphql";
import graphqlReqeustClient from "../../../lib/graphqlRequestClient";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../state/userState";
import { storeState } from "../../../state/storeState";
import { useQueryClient } from "react-query";
import ToggleButton from "../../../Components/Buttons/ToggleButton";
import { Body2, Headline2 } from "../../../mixin";
import {
  customerImage,
  manageProductImage,
  orderStateImage
} from "../../../lib/images";

const Wrapper = styled.div`
  h2 {
    ${Headline2};
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.device.tablet} {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const Menu = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 2.5rem;
  grid-template-columns: repeat(3, 1fr);

  .button-wrapper,
  button {
    overflow: hidden;
    width: 100%;
  }
  ${({ theme }) => theme.device.tablet} {
    grid-template-columns: 1fr;
  }
`;

export const MenuButtonDefault = styled.button<IAdminMenuProps>`
  box-sizing: border-box;
  border: 0;
  border-radius: 0.6rem;
  width: 100%;
  height: 70vh;
  cursor: pointer;
  font-size: 3rem;
  font-weight: bold;
  word-break: keep-all;
  color: ${(props) => props.theme.color.fontColorWhite};
  position: relative;
  background-color: black;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    transform: scale(1);
    width: 100%;
    height: 100%;
    background-image: ${(props) => `url(${props.image})`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.4;
    content: "";
    transition: all 0.5s ease-in-out;
  }

  &:hover {
    &::before {
      transform: scale(1.2);
    }
  }
  ${({ theme }) => theme.device.tablet} {
    height: 30rem;
  }
`;

export const MenuButtonWrapper = styled.div`
  position: relative;
  .store-state-container {
    padding: 1rem;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.color.fontColorWhite};
    p {
      margin-right: 1rem;
      ${Body2}
    }
  }
`;
const BusinessManageButtonWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  gap: 0.8rem;
  overflow: hidden;
`;

const LinkToStaffWindowButton = styled(MenuButtonDefault)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LinkToProductManageWindowButton = styled(MenuButtonDefault)``;

const BusinessInfoContainer = styled.div`
  span {
    ${Body2}
    &:not(:first-child) {
      margin-left: 1rem;
    }
    strong {
      font-weight: bold;
    }
  }
`;

const LinkToCustomerWindowButton = styled(MenuButtonDefault)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${(props) =>
    props.isActive
      ? props.theme.color.backgroundBlack100
      : props.theme.color.gray300};

  span {
    display: inline-block;
    font-weight: normal;
    font-size: 1.2rem;
    &:first-child {
      font-size: 3rem;
      font-weight: bold;
    }
  }
  &:hover {
    &::before {
      ${(props) =>
        props.isActive ? "transform: scale(1.2)" : "transform:scale(1)"}
    }
  }
`;

interface IAdminMenuProps {
  isActive?: boolean;
  image?: string;
}

const AdminManageProductMain = () => {
  const { storeId } = useParams();
  const { id: userId } = useRecoilValue(userState);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [store, setStore] = useRecoilState(storeState);
  const { accessToken, refreshToken } = useRecoilValue(userState);

  const [toggleState, setToggleState] = useState(store.isAvailable);
  const { id, setId, isModal, setIsModal, confirm, setConfirm } =
    useModalHook();

  const { mutate: toggleStoreAvailableMutate } =
    useToggleStoreIsAvailableMutation(graphqlReqeustClient(accessToken), {
      onSuccess: () => {
        queryClient.invalidateQueries("myStores");
        queryClient.invalidateQueries("store");
      }
    });

  const { isSuccess } = useStoreQuery(
    graphqlReqeustClient(accessToken),
    {
      id: Number(id)
    },
    {
      onSuccess: (data) => {
        if (data.store) {
          const { id, name, code, address, phone, isAvailable } = data.store;
          setStore({ id, name, address, code, phone, isAvailable });
        }
      }
    }
  );

  const toggleHandler = () => {
    setIsModal(true);
  };

  const linkToCustomerWindowHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const linkName = e.currentTarget.dataset.link;
    if (linkName === "order" && store.isAvailable) {
      navigate(`/client/${userId}/${storeId}`);
    }

    if (linkName === "manage-order") {
      navigate(`/admin/${userId}/store/${storeId}/product/manage-order`);
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
      toggleStoreAvailableMutate({ id: Number(id) });
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
      <Header>
        <PageHeaderMessage header="관리자 메뉴" message={store.name} />
        <BusinessInfoContainer>
          <span>
            <strong>사업자 번호</strong> {store.code}
          </span>
          <span>
            <strong>주소</strong> {store.address}
          </span>
          <span>
            <strong>대표번호</strong> {store.phone}
          </span>
        </BusinessInfoContainer>
      </Header>
      <Menu>
        <MenuButtonWrapper className="button-wrapper">
          <div className="store-state-container">
            {store.isAvailable ? (
              <p>가게를 닫으려면 버튼을 누르세요.</p>
            ) : (
              <p>가게를 열려면 버튼을 누르세요.</p>
            )}
            <ToggleButton
              size={5}
              isActive={store.isAvailable}
              onClick={toggleHandler}
            />
          </div>
          <LinkToCustomerWindowButton
            data-link="order"
            onClick={linkToCustomerWindowHandler}
            isActive={store.isAvailable}
            image={orderStateImage}
          >
            <span>고객 주문 화면</span>
            {store.isAvailable && <span>현재 주문을 받고 있는 중입니다.</span>}
          </LinkToCustomerWindowButton>
        </MenuButtonWrapper>
        <div className="button-wrapper">
          <LinkToStaffWindowButton
            data-link="manage-order"
            onClick={linkToCustomerWindowHandler}
            image={customerImage}
          >
            고객 주문 관리하기
          </LinkToStaffWindowButton>
        </div>
        <BusinessManageButtonWrapper className="button-wrapper">
          <LinkToProductManageWindowButton
            data-link="manage-product"
            onClick={linkToCustomerWindowHandler}
            image={manageProductImage}
          >
            상품 관리하기
          </LinkToProductManageWindowButton>
        </BusinessManageButtonWrapper>
      </Menu>
    </Wrapper>
  );
};

export default AdminManageProductMain;
