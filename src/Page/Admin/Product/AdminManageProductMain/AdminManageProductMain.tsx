import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useModalHook } from "@/lib/hooks";
import {
  customerImage,
  manageProductImage,
  orderStateImage
} from "@/lib/images";

import { StoreOpenCloseModal, ToggleButton, PageHeader } from "@/Components";
import {
  BusinessInfoContainer,
  BusinessManageButtonWrapper,
  Header,
  LinkToCustomerWindowButton,
  LinkToProductManageWindowButton,
  LinkToStaffWindowButton,
  Menu,
  MenuButtonWrapper,
  Wrapper
} from "./styles";
import { useGetStore } from "@/Page/Admin/hooks";

const AdminManageProductMain = () => {
  const { storeId, userId } = useParams();
  const { isModal, setIsModal } = useModalHook();
  const navigate = useNavigate();
  const { data: store } = useGetStore();

  const toggleHandler = () => {
    setIsModal(true);
  };

  const linkToCustomerWindowHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const linkName = e.currentTarget.dataset.link;
    if (linkName === "order" && store?.isAvailable) {
      navigate(`/client/${userId}/${storeId}`);
    }

    if (linkName === "manage-order") {
      navigate(`/admin/${userId}/store/${storeId}/product/manage-order`);
    }

    if (linkName === "manage-product") {
      navigate(`/admin/${userId}/store/${storeId}/product/manage-product`);
    }
  };

  return (
    <Wrapper>
      <StoreOpenCloseModal
        itemId={userId}
        isToggleModal={isModal}
        setIsToggleModal={setIsModal}
        isStoreOpen={store?.isAvailable}
      />
      <Header>
        <PageHeader header="관리자 메뉴" message={store?.name} />
        <BusinessInfoContainer>
          <span>
            <strong>사업자 번호</strong> {store?.code}
          </span>
          <span>
            <strong>주소</strong> {store?.address}
          </span>
          <span>
            <strong>대표번호</strong> {store?.phone}
          </span>
        </BusinessInfoContainer>
      </Header>
      <Menu>
        <MenuButtonWrapper className="button-wrapper">
          <div className="store-state-container">
            {store?.isAvailable ? (
              <p>가게를 닫으려면 버튼을 누르세요.</p>
            ) : (
              <p>가게를 열려면 버튼을 누르세요.</p>
            )}
            <ToggleButton
              size={5}
              isActive={store?.isAvailable}
              onClick={toggleHandler}
            />
          </div>
          <LinkToCustomerWindowButton
            data-link="order"
            onClick={linkToCustomerWindowHandler}
            isActive={store?.isAvailable}
            image={orderStateImage}
          >
            <span>고객 주문 화면</span>
            {store?.isAvailable && <span>현재 주문을 받고 있는 중입니다.</span>}
          </LinkToCustomerWindowButton>
        </MenuButtonWrapper>
        <div className="button-wrapper">
          <LinkToStaffWindowButton
            data-link="manage-order"
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
