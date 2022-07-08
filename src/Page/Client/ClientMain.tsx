import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { restaurantImage, takeoutImage } from "../../lib/images";
import { Headline1, SubTitle1 } from "../../mixin";
import { MenuButtonDefault } from "../Admin/Product/AdminManageProductMain";
import { orderType } from "../../state/orderState";
import { useSetRecoilState } from "recoil";

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
const Wrapper = styled.div`
  h2 {
    ${SubTitle1}
  }
`;

const OrderingMethod = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 2.5rem;
  grid-template-columns: repeat(2, 1fr);
  .button-wrapper {
    overflow: hidden;
    width: 100%;
  }
  ${({ theme }) => theme.device.tablet} {
    grid-template-columns: 1fr;
  }
`;

const OrderingButton = styled(MenuButtonDefault)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ClientMain = () => {
  const navigate = useNavigate();
  const { userId, storeId } = useParams();
  const setOrderType = useSetRecoilState(orderType);

  const handleOrderMethod = (ordertype: string) => {
    if (ordertype === "here") {
      setOrderType("here");
    }
    if (ordertype === "go") {
      setOrderType("go");
    }
    navigate(`/client/${userId}/${storeId}/menu`);
  };

  return (
    <>
      <Header>
        <h1>누구나 키오스크</h1>
      </Header>
      <Wrapper>
        <h2>주문 방법을 선택하세요</h2>
        <OrderingMethod>
          <div className="button-wrapper">
            <OrderingButton
              onClick={() => handleOrderMethod("here")}
              image={restaurantImage}
            >
              매장 식사
            </OrderingButton>
          </div>
          <div className="button-wrapper">
            <OrderingButton
              onClick={() => handleOrderMethod("go")}
              image={takeoutImage}
            >
              포장하기
            </OrderingButton>
          </div>
        </OrderingMethod>
      </Wrapper>
    </>
  );
};

export default ClientMain;
