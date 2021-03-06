import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../../Components/Modals/Modal";
import IsOpenModalChildren from "../Modal/IsOpenModalChildren";
import useModalHook from "../../../lib/utils/customHooks/useModalHook";
import PageHeaderMessage from "../../../Components/PageHeader";
import {
  useStoreQuery,
  useToggleStoreIsAvailableMutation
} from "../../../lib/generated/graphql";
import graphqlReqeustClient from "../../../lib/graphqlRequestClient";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../lib/state/userState";
import { storeState } from "../../../lib/state/storeState";
import { useQueryClient } from "react-query";
import ToggleButton from "../../../Components/Buttons/ToggleButton";
import { Body2 } from "../../../lib/styles/mixin";
import {
  customerImage,
  manageProductImage,
  orderStateImage
} from "../../../lib/images";

const Wrapper = styled.div``;

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
  ${(props) => props.theme.device.mobile} {
    display: grid;
    span {
      &:first-child {
        grid-column: 1/2;
      }
      &:nth-child(2) {
        grid-column: 2/2;
      }
      &:last-child {
        grid-column: 1 / span 2;
        margin-left: 0;
      }
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
  const { accessToken } = useRecoilValue(userState);

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

  useStoreQuery(
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
        <PageHeaderMessage header="????????? ??????" message={store.name} />
        <BusinessInfoContainer>
          <span>
            <strong>????????? ??????</strong> {store.code}
          </span>
          <span>
            <strong>??????</strong> {store.address}
          </span>
          <span>
            <strong>????????????</strong> {store.phone}
          </span>
        </BusinessInfoContainer>
      </Header>
      <Menu>
        <MenuButtonWrapper className="button-wrapper">
          <div className="store-state-container">
            {store.isAvailable ? (
              <p>????????? ???????????? ????????? ????????????.</p>
            ) : (
              <p>????????? ????????? ????????? ????????????.</p>
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
            <span>?????? ?????? ??????</span>
            {store.isAvailable && <span>?????? ????????? ?????? ?????? ????????????.</span>}
          </LinkToCustomerWindowButton>
        </MenuButtonWrapper>
        <div className="button-wrapper">
          <LinkToStaffWindowButton
            data-link="manage-order"
            onClick={linkToCustomerWindowHandler}
            image={customerImage}
          >
            ?????? ?????? ????????????
          </LinkToStaffWindowButton>
        </div>
        <BusinessManageButtonWrapper className="button-wrapper">
          <LinkToProductManageWindowButton
            data-link="manage-product"
            onClick={linkToCustomerWindowHandler}
            image={manageProductImage}
          >
            ?????? ????????????
          </LinkToProductManageWindowButton>
        </BusinessManageButtonWrapper>
      </Menu>
    </Wrapper>
  );
};

export default AdminManageProductMain;
