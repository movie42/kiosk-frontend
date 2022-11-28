import { useParams } from "react-router-dom";
import { restaurantImage, takeoutImage } from "@/lib/images";
import { Header, OrderingMethod, OrderingButton, Wrapper } from "./styles";
import { useNavigateHereToGo } from "../hooks/useNavigateHereToGo";

const ClientMain = () => {
  const { userId, storeId } = useParams();
  const { handleOrderMethod } = useNavigateHereToGo({ userId, storeId });

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
