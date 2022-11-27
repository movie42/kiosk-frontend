import React, { ReactNode } from "react";
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
  Header,
  LinkToStaffWindowButton,
  Menu,
  MenuButtonDefault,
  MenuButtonWrapper,
  Wrapper
} from "./styles";
import { useGetStore } from "@/Page/Admin/hooks";
import { DefaultTheme, StyledComponent } from "styled-components";

const AdminManageProductMain = () => {
  const { storeId, userId } = useParams();
  const { isModal, setIsModal } = useModalHook();
  const { data: store } = useGetStore();

  const toggleHandler = () => {
    setIsModal(true);
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
        <StoreInfo
          code={store?.code}
          address={store?.address}
          phone={store?.phone}
        />
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
          <ManageProductMainPageLinkButton
            ChildComponent={LinkToStaffWindowButton}
            data-link="order"
            to={`/client/${userId}/${storeId}`}
            disabled={!store?.isAvailable}
            image={orderStateImage}
          >
            <span>고객 주문 화면</span>
            {store?.isAvailable && <span>현재 주문을 받고 있는 중입니다.</span>}
          </ManageProductMainPageLinkButton>
        </MenuButtonWrapper>
        <ManageProductMainPageLinkButton
          ChildComponent={LinkToStaffWindowButton}
          data-link="manage-order"
          to={`/admin/${userId}/store/${storeId}/product/manage-order`}
          image={customerImage}
        >
          고객 주문 관리하기
        </ManageProductMainPageLinkButton>
        <ManageProductMainPageLinkButton
          ChildComponent={LinkToStaffWindowButton}
          data-link="manage-product"
          to={`/admin/${userId}/store/${storeId}/product/manage-product`}
          image={manageProductImage}
        >
          상품 관리하기
        </ManageProductMainPageLinkButton>
      </Menu>
    </Wrapper>
  );
};

export default AdminManageProductMain;

interface StoreInfoProps {
  code?: string;
  address?: string;
  phone?: string;
}
const StoreInfo = ({ code, address, phone }: StoreInfoProps) => {
  return (
    <BusinessInfoContainer>
      <span>
        <strong>사업자 번호</strong> {code}
      </span>
      <span>
        <strong>주소</strong> {address}
      </span>
      <span>
        <strong>대표번호</strong> {phone}
      </span>
    </BusinessInfoContainer>
  );
};

interface ManageProductMainPageLinkButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ChildComponent: StyledComponent<
    "div",
    DefaultTheme,
    Record<string, unknown>,
    never
  >;
  children: ReactNode;
  to: string;
  image: string;
}
const ManageProductMainPageLinkButton = ({
  ChildComponent,
  children,
  to,
  image,
  ...props
}: ManageProductMainPageLinkButtonProps) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(to);
  };
  return (
    <MenuButtonDefault image={image} onClick={handleNavigate} {...props}>
      <ChildComponent>{children}</ChildComponent>
    </MenuButtonDefault>
  );
};
