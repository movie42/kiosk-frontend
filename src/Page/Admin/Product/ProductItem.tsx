import React, { MouseEvent, ReactNode, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import ToggleButton from "../../../Components/Buttons/ToggleButton";
import Noimage from "../../../Images/Noimage";
import { ProductListValues } from "../../../mockup/productList";
import {
  Option,
  selectOptionState,
  selectProductListState,
} from "../../../state/productItemState";

const Item = styled.li<{ selectOption: Option; selected: boolean }>`
  .item-container {
    position: relative;
    cursor: pointer;
    background-color: ${(props) => props.theme.color.background100};
    height: 100%;
    min-width: 20rem;
    overflow: hidden;
    display: grid;
    grid-template-rows: minmax(12rem, 0.9fr) 0.8fr;
    border: 1px solid ${({ theme }) => theme.color.gray300};
    border-radius: 0.4rem;
    text-decoration: none;
    color: ${(props) => props.theme.color.fontColorBlack};
    .is-select {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${(props) =>
        props.selected ? "unset" : props.theme.color.background80};
      z-index: 4;
    }
    .image-container {
      overflow: hidden;
      position: relative;
      .transparent-box {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: ${({ theme }) => theme.color.backgroundBlack60};
      }
    }
    .item-info-container {
      align-self: center;
      padding: 0.8rem;
      h3 {
        font-size: 3rem;
        font-weight: bold;
        margin-bottom: 0.6rem;
      }
      h4 {
        font-size: 2rem;
        align-self: end;
      }
    }
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  font-size: 1.4rem;
  font-weight: 600;
  padding: 0.5rem;
  align-items: center;
  color: ${({ theme }) => theme.color.fontColorWhite};
  margin: 0.4rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  p {
    margin-left: 0.5rem;
  }
`;

interface IProductItemProps extends React.HTMLAttributes<HTMLLIElement> {
  productData: ProductListValues[];
}

const ProductItem = ({ productData }: IProductItemProps) => {
  const navigate = useNavigate();
  const { userId, storeId } = useParams();
  const [selectProduct, setSelectProduct] = useRecoilState(
    selectProductListState,
  );
  const selectOption = useRecoilValue(selectOptionState);

  const handleSelectItem = (
    e: React.MouseEvent<HTMLLIElement>,
    productId: number,
  ) => {
    if (selectOption?.options === "none") {
      navigate(`/admin/${userId}/store/${storeId}/product/${productId}`);
      return;
    }

    const hasProduct = selectProduct.find(
      (product) => product.id === productId,
    );

    if (hasProduct) {
      setSelectProduct((products) =>
        products.filter((product) => product.id !== productId),
      );
      return;
    }

    const [selectedProduct] = productData.filter(
      (product) => product.id === productId,
    );

    setSelectProduct((products) => [...products, selectedProduct]);
  };

  return (
    <>
      {productData.map((product) => (
        <Item
          key={product.id}
          data-id={product.id}
          onClick={(e: React.MouseEvent<HTMLLIElement>) =>
            handleSelectItem(e, product.id)
          }
          selectOption={selectOption.options}
          selected={selectProduct.some((item) => item.id === product.id)}
        >
          <div className="item-container">
            {selectOption.options !== "none" && (
              <span className="is-select"></span>
            )}
            <div className="image-container">
              <ToggleContainer>
                <ToggleButton size={5} isActive={true} />
                <p>판매 중입니다.</p>
              </ToggleContainer>
              <span className="transparent-box"></span>
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} />
              ) : (
                <Noimage />
              )}
            </div>
            <div className="item-info-container">
              <h3>{product.name}</h3>
              <h4>가격 {product.price}원</h4>
            </div>
          </div>
        </Item>
      ))}
    </>
  );
};

export default ProductItem;
