import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { Images, Noimage, Chart } from "@/Components";
import { useGetProductsQuery } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { ProductListValues, userState } from "@/lib/state";
import { translateLocalCurrency } from "@/lib/utils";
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
  const { accessToken } = useRecoilValue(userState);
  const [product, setProduct] = useState<ProductListValues>({
    id: 0,
    name: "",
    price: 0,
    options: [],
    imageUrl: "",
    description: ""
  });
  const { storeId, productId } = useParams();
  useGetProductsQuery(
    graphqlReqeustClient(accessToken),
    { id: Number(storeId) },
    {
      onSuccess: (data) => {
        if (data.store?.products) {
          const [product]: ProductListValues[] = data.store.products
            .filter((product) => product.id === productId)
            .map((item) => {
              return {
                id: Number(item.id),
                name: item.name,
                price: item.price,
                options: item.options.map((value) => ({
                  id: Number(value.id),
                  name: value.name
                })),
                imageUrl: item.imageUrl,
                description: item.description
              };
            });
          setProduct(product);
        }
      }
    }
  );

  return (
    <ProductDetailPageContainer>
      <BasicInfoContainer>
        <ImageContainer>
          {product.imageUrl ? (
            <Images src={product.imageUrl} alt={product.name} />
          ) : (
            <Noimage />
          )}
        </ImageContainer>
        <InfoContainer>
          <h2>상품 기본정보</h2>
          <div className="info-box">
            <span>이름</span>
            <span>
              <strong>{product.name}</strong>
            </span>
          </div>
          <div className="info-box">
            <span>가격</span>
            <span>
              <strong>
                {translateLocalCurrency(product.price, "ko-KR")}원
              </strong>
            </span>
          </div>
          <div className="info-box">
            <span>옵션</span>
            <ul>
              {product.options?.length !== 0
                ? product.options?.map((value) => (
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
                  ? product.description
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
