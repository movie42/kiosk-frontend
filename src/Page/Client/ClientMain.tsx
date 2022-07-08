import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { restaurantImage, takeoutImage } from "../../lib/images";
import { Headline1, SubTitle1 } from "../../mixin";
import { MenuButtonDefault } from "../Admin/Product/AdminManageProductMain";

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
              date-type="eat-in"
              onClick={() => navigate(`/client/${userId}/${storeId}/menu`)}
              image={restaurantImage}
            >
              매장 식사
            </OrderingButton>
          </div>
          <OrderingButton
            date-type="take-out"
            onClick={() => navigate(`/client/${userId}/${storeId}/menu`)}
            image={takeoutImage}
          >
            <div className="button-wrapper">포장하기</div>
          </OrderingButton>
        </OrderingMethod>
      </Wrapper>
    </>
  );
};

export default ClientMain;
