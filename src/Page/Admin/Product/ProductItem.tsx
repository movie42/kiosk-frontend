import { motion, Variants } from "framer-motion";
import React, { MouseEvent, ReactNode, useEffect } from "react";
import { MdCreate } from "react-icons/md";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import ButtonDefaultStyle from "../../../Components/Buttons/ButtonDefault";
import ToggleButton from "../../../Components/Buttons/ToggleButton";
import Images from "../../../Components/Images/Images";
import Noimage from "../../../Components/Images/Noimage";
import { useToggleProductIsAvailableMutation } from "../../../generated/graphql";
import graphqlReqeustClient from "../../../lib/graphqlRequestClient";
import { ProductListValues } from "../../../mockup/productList";
import {
  Option,
  selectOptionState,
  selectProductListState,
} from "../../../state/productItemState";
import { userState } from "../../../state/userState";
import { translateLocalCurrency } from "../../../utils/helper/translateLocalCurrency";

const ItemWrapper = styled(motion.div)`
  position: relative;
`;

const Item = styled(motion.li)<{ selectOption: Option; selected: boolean }>`
  .item-container {
    position: relative;
    cursor: pointer;
    background-color: ${(props) => props.theme.color.background100};
    height: 100%;
    min-width: 20rem;
    overflow: hidden;
    display: grid;
    grid-template-rows: minmax(12rem, 0.9fr) 0.7fr;
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
      z-index: 11;
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
const ButtonContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 11;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const ToggleContainer = styled.div`
  display: flex;
  font-size: 1.4rem;
  font-weight: 600;
  padding: 0.5rem;
  align-items: center;
  color: ${({ theme }) => theme.color.fontColorWhite};
  margin: 0.4rem;
  p {
    margin-left: 0.5rem;
  }
`;

const UpdateButtonWrapper = styled.div`
  padding-right: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.fontColorWhite};
  font-size: 2.2rem;
  button {
    background-color: unset;
    padding: 0;
    padding-right: 0.5rem;
  }
`;

const UpdateProductButton = styled(ButtonDefaultStyle)`
  font-size: 1.5rem;
`;

interface IProductItemProps extends React.HTMLAttributes<HTMLLIElement> {
  productData: ProductListValues[];
}

const boxVariants: Variants = {
  init: { scale: 1 },
  hover: {
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
};

const imageBoxVariants: Variants = {
  init: { scale: 1 },
  hover: {
    scale: 2,
    transition: {
      duration: 0.4,
    },
  },
};
const ProductItem = ({ productData }: IProductItemProps) => {
  const navigate = useNavigate();
  const { userId, storeId } = useParams();
  const queryClient = useQueryClient();
  const { accessToken } = useRecoilValue(userState);
  const [selectProduct, setSelectProduct] = useRecoilState(
    selectProductListState,
  );
  const selectOption = useRecoilValue(selectOptionState);

  const { mutate: toggleProductValue } = useToggleProductIsAvailableMutation(
    graphqlReqeustClient(accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getProducts");
      },
    },
  );

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

  const handleUpdateItem = () => {};

  return (
    <>
      {productData.map((product) => (
        <ItemWrapper
          variants={boxVariants}
          initial="init"
          whileHover="hover"
          key={product.id}
        >
          <ButtonContainer>
            <ToggleContainer>
              <ToggleButton
                onClick={() => toggleProductValue({ id: product.id })}
                size={5}
                isActive={product?.isAvailable}
              />
              {product.isAvailable ? <p>판매</p> : <p>준비</p>}
            </ToggleContainer>
            <UpdateButtonWrapper onClick={handleUpdateItem}>
              <MdCreate />
              <UpdateProductButton>수정</UpdateProductButton>
            </UpdateButtonWrapper>
          </ButtonContainer>
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
                <span className="transparent-box"></span>
                {product.imageUrl ? (
                  <motion.div variants={imageBoxVariants} whileHover="hover">
                    <Images src={product.imageUrl} alt={product.name} />
                  </motion.div>
                ) : (
                  <Noimage />
                )}
              </div>

              <div className="item-info-container">
                <h3>{product.name}</h3>
                <h4>가격 {translateLocalCurrency(product.price, "ko-KR")}</h4>
              </div>
            </div>
          </Item>
        </ItemWrapper>
      ))}
    </>
  );
};

export default ProductItem;
