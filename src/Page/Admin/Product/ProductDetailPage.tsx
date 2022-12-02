import { Images, Noimage } from "@/Components/UI/Atoms";
import { Chart } from "@/Components/UI/Organisms";
import { translateLocalCurrency } from "@/lib/utils";
import { useGetProductDetail } from "../hooks";
import {
  BasicInfoContainer,
  ImageContainer,
  InfoContainer,
  SalesInfoContainer,
  SalesInfoGraphContainer,
  SalesInfoSummuryContainer,
  ProductDetailPageContainer
} from "./styles";

const ProductDetailPage = () => {
  const { data: product } = useGetProductDetail();

  return (
    <ProductDetailPageContainer>
      <BasicInfoContainer>
        <ImageContainer>
          {product?.imageUrl ? (
            <Images src={product?.imageUrl} alt={product?.name} />
          ) : (
            <Noimage />
          )}
        </ImageContainer>
        <InfoContainer>
          <h2>상품 기본정보</h2>
          <div className="info-box">
            <span>이름</span>
            <span>
              <strong>{product?.name}</strong>
            </span>
          </div>
          <div className="info-box">
            <span>가격</span>
            <span>
              <strong>
                {product?.price &&
                  translateLocalCurrency(Number(product.price), "ko-KR")}
                원
              </strong>
            </span>
          </div>
          <div className="info-box">
            <span>옵션</span>
            <ul>
              {product?.options?.length !== 0
                ? product?.options?.map((value) => (
                    <li key={value.id} data-id={value.id}>
                      {value.name}
                    </li>
                  ))
                : "상품의 옵션이 없습니다."}
            </ul>
          </div>
          <div className="info-box">
            <span>정보</span>
            <span>
              <strong>
                {product?.description
                  ? product?.description
                  : "상품의 정보가 없습니다."}
              </strong>
            </span>
          </div>
        </InfoContainer>
      </BasicInfoContainer>
      <SalesInfoContainer>
        <SalesInfoSummuryContainer>
          <div>
            <h2>총 판매 실적</h2>
            <div className="info-box">
              <span>90회</span>
              <span>{translateLocalCurrency(810000, "ko-kr")}</span>
            </div>
          </div>
          <div>
            <h2>옵션별 판매 실적</h2>
            <div className="info-box">
              <ul>
                <li>
                  <span>기본</span>
                  <span>50회</span>
                  <span>{translateLocalCurrency(450000, "ko-kr")}</span>
                </li>
                <li>
                  <span>매운 맛</span>
                  <span>27회</span>
                  <span>{translateLocalCurrency(243000, "ko-kr")}</span>
                </li>
                <li>
                  <span>아주 매운맛</span>
                  <span>13회</span>
                  <span>{translateLocalCurrency(117000, "ko-kr")}</span>
                </li>
              </ul>
            </div>
          </div>
        </SalesInfoSummuryContainer>
        <SalesInfoGraphContainer>
          <Chart />
        </SalesInfoGraphContainer>
      </SalesInfoContainer>
    </ProductDetailPageContainer>
  );
};

export default ProductDetailPage;
