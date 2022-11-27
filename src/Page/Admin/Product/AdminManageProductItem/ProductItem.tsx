import React from "react";
import { motion } from "framer-motion";
import { MdCreate } from "react-icons/md";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {
  Modal,
  ProductUpdateModal,
  ToggleButton,
  Images,
  Noimage
} from "@/Components";
import { useToggleProductIsAvailableMutation } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import {
  ProductListValues,
  selectOptionState,
  selectProductListState,
  updateProductState,
  userState
} from "@/lib/state";
import { useModalHook } from "@/lib/hooks";
import { translateLocalCurrency } from "@/lib/utils";
import {
  boxVariants,
  imageBoxVariants,
  Item,
  ItemWrapper,
  ProductItemButtonContainer,
  ToggleContainer,
  UpdateButtonWrapper,
  UpdateProductButton
} from "./styles";

interface IProductItemProps extends React.HTMLAttributes<HTMLLIElement> {
  productData?: ProductListValues[];
}

const ProductItem = ({ productData }: IProductItemProps) => {
  const navigate = useNavigate();
  const { userId, storeId } = useParams();
  const queryClient = useQueryClient();
  const { accessToken } = useRecoilValue(userState);
  const [selectProduct, setSelectProduct] = useRecoilState(
    selectProductListState
  );
  const setSelectUpdateProduct = useSetRecoilState(updateProductState);

  const { isModal, setIsModal } = useModalHook();
  const selectOption = useRecoilValue(selectOptionState);

  const { mutate: toggleProductValue } = useToggleProductIsAvailableMutation(
    graphqlReqeustClient(accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getProducts");
      }
    }
  );

  const handleSelectItem = (
    e: React.MouseEvent<HTMLDivElement>,
    productId: number
  ) => {
    if (selectOption?.options === "none") {
      navigate(`/admin/${userId}/store/${storeId}/product/${productId}`);
      return;
    }

    const hasProduct = selectProduct.find(
      (product) => product.id === productId
    );

    if (hasProduct) {
      setSelectProduct((products) =>
        products.filter((product) => product.id !== productId)
      );
      return;
    }
    if (productData) {
      const [selectedProduct] = productData.filter(
        (product) => product.id === productId
      );
      setSelectProduct((products) => [...products, selectedProduct]);
    }
  };

  const handleUpdateItem = (id: number) => {
    if (productData) {
      const [updateItem] = productData.filter((value) => value.id === id);
      setSelectUpdateProduct(updateItem);
      setIsModal(true);
    }
  };

  return (
    <>
      {isModal && (
        <Modal strach={true}>
          <ProductUpdateModal setIsModal={setIsModal} />
        </Modal>
      )}
      {productData?.map((product) => (
        <ItemWrapper
          variants={boxVariants}
          initial="init"
          whileHover="hover"
          key={product.id}
        >
          <ProductItemButtonContainer>
            <ToggleContainer>
              <ToggleButton
                onClick={() => toggleProductValue({ id: product.id })}
                size={5}
                isActive={product?.isAvailable}
              />
              {product.isAvailable ? <p>판매</p> : <p>준비</p>}
            </ToggleContainer>
            <UpdateButtonWrapper onClick={() => handleUpdateItem(product.id)}>
              <MdCreate />
              <UpdateProductButton>수정</UpdateProductButton>
            </UpdateButtonWrapper>
          </ProductItemButtonContainer>
          <Item
            key={product.id}
            data-id={product.id}
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
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
                <h4>{translateLocalCurrency(product.price, "ko-KR")}원</h4>
              </div>
            </div>
          </Item>
        </ItemWrapper>
      ))}
    </>
  );
};

export default ProductItem;
