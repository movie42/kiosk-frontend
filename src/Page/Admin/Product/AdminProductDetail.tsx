import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Chart from "../../../Components/Chart";
import { useGetProductsQuery } from "../../../generated/graphql";
import Noimage from "../../../Images/Noimage";
import graphqlReqeustClient from "../../../lib/graphqlRequestClient";
import { Headline2, SubTitle1, SubTitle2 } from "../../../mixin";
import { ProductListValues } from "../../../mockup/productList";
import { Option } from "../../../state/productItemState";
import { userState } from "../../../state/userState";
import { translateLocalCurrency } from "../../../utils/helper/translateLocalCurrency";

interface IAdminProductDetailProps {}

const Wrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  width: 100%;
  height: calc(100vh - 7rem);
  grid-template-columns: 1fr 1fr;
`;

const ContainerDefaultStyle = styled.div`
  box-sizing: border-box;
  padding: 1rem;
  h2 {
    font-size: 1.8rem;
    font-weight: 900;
    color: ${({ theme }) => theme.color.primary700};
    margin-bottom: 0.7rem;
  }
  .info-box {
    display: flex;
    align-items: center;
    span,
    ul {
      ${SubTitle2};
      margin-left: 1rem;
      span,
      li {
        span {
          &:not(:first-child) {
            margin-left: 1rem;
          }
        }
        margin: 0;
      }
    }
    h3 {
      ${Headline2};
      line-height: 1.5;
    }
  }
  .button-box {
    display: flex;
  }
`;

const BasicInfoContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const ImageContainer = styled.div`
  box-sizing: border-box;
  padding: 1rem;
  div {
    overflow: hidden;
    border-radius: 2rem;
  }
`;
const InfoContainer = styled(ContainerDefaultStyle)``;
const SalesInfoContainer = styled(BasicInfoContainer)``;
const SalesInfoSummuryContainer = styled(ContainerDefaultStyle)`
  div:first-child {
    margin-bottom: 2rem;
  }
`;
const SalesInfoGraphContainer = styled(ContainerDefaultStyle)``;

const AdminProductDetail = () => {
  const { accessToken } = useRecoilValue(userState);
  const [product, setProduct] = useState<ProductListValues>({
    id: 0,
    name: "",
    price: 0,
    options: [],
    imageUrl: "",
    description: "",
  });
  const { storeId, productId } = useParams();
  const productQuery = useGetProductsQuery(
    graphqlReqeustClient(accessToken),
    { id: Number(storeId) },
    {
      onSuccess: (data) => {
        if (data.store?.products) {
          const [product]: ProductListValues[] = data.store?.products
            .filter((product) => product.id === productId)
            .map((item) => {
              return {
                id: Number(item.id),
                name: item.name,
                price: item.price,
                options: item.options.map((value) => ({
                  id: Number(value.id),
                  name: value.name,
                })),
                imageUrl: item.imageUrl,
                description: item.description,
              };
            });
          setProduct(product);
        }
      },
    },
  );

  return (
    <Wrapper>
      <BasicInfoContainer>
        <ImageContainer>
          {product.imageUrl ? (
            <div>
              <img src={product.imageUrl} alt={product.name} />
            </div>
          ) : (
            <Noimage />
          )}
        </ImageContainer>
        <InfoContainer>
          <h2>상품 기본정보</h2>
          <div className="info-box">
            <h3>이름</h3>
            <span>{product.name}</span>
          </div>
          <div className="info-box">
            <h3>등록 날짜</h3>
            {/*TODO: 상품이 등록된 날짜가 제공되어야합니다.*/}
            <span>2022년 1월 27일</span>
          </div>
          <div className="info-box">
            <h3>가격</h3>
            <span>{translateLocalCurrency(product.price, "ko-KR")}</span>
          </div>
          <div className="info-box">
            <h3>옵션</h3>
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
            <h3>정보</h3>
            <span>
              {product?.description
                ? product.description
                : "상품의 정보가 없습니다."}
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
    </Wrapper>
  );
};

export default AdminProductDetail;