import React from "react";
import { motion } from "framer-motion";
import { MdCreate } from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  ToggleButton,
  Images,
  Noimage,
  ProductUpdateModal
} from "@/Components";

import {
  ProductListValues,
  selectOptionState,
  selectProductListState
} from "@/lib/state";
import { translateLocalCurrency } from "@/lib/utils";
import { useModalHook } from "@/lib/hooks";

import {
  boxVariants,
  imageBoxVariants,
  Item,
  ItemWrapper,
  ProductInfoContainer,
  ProductItemButtonContainer,
  ToggleContainer,
  UpdateButtonWrapper,
  UpdateProductButton
} from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProductOpenCloseToggle } from "@/Page/Admin/hooks";

interface IProductItemProps extends React.HTMLAttributes<HTMLLIElement> {
  product: ProductListValues;
}

const ProductListItem = ({ product }: IProductItemProps) => {
  const navigate = useNavigate();
  const { userId, storeId } = useParams();

  const [selectProducts, setSelectProducts] = useRecoilState(
    selectProductListState
  );
  const { isModal, setIsModal } = useModalHook();

  const handleGoToProductDetail = () => {
    navigate(`/admin/${userId}/store/${storeId}/product/${product.id}`);
  };

  const handleUpdateItem = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsModal(true);
  };

  const handleSelectItem = (id: number) => () => {
    const findSelectProduct = selectProducts.findIndex(
      (product) => product.id === id
    );

    if (findSelectProduct === -1) {
      setSelectProducts((products) => [...products, product]);
      return;
    }

    setSelectProducts((products) => [
      ...products.filter((product) => product.id !== id)
    ]);
  };

  return (
    <>
      {isModal && <ProductUpdateModal setIsModal={setIsModal} />}
      <ItemWrapper
        variants={boxVariants}
        initial="init"
        whileHover="hover"
        key={product.id}
        onClick={handleGoToProductDetail}
      >
        <ProductItemButtonContainer>
          <ProductToggleButton
            id={product.id}
            isAvailable={product.isAvailable}
          />
          <UpdateButtonWrapper onClick={handleUpdateItem}>
            <MdCreate />
            <UpdateProductButton>수정</UpdateProductButton>
          </UpdateButtonWrapper>
        </ProductItemButtonContainer>
        <ProductImageInfoContainer
          productId={product.id}
          name={product.name}
          imageUrl={product.imageUrl}
          price={product.price}
          handleSelectItem={handleSelectItem}
        />
      </ItemWrapper>
    </>
  );
};

export default ProductListItem;

interface ToggleButton {
  id: number;
  isAvailable?: boolean;
}

const ProductToggleButton = ({ id, isAvailable }: ToggleButton) => {
  const { mutate: toggleProductValue } = useUpdateProductOpenCloseToggle();
  const handleToggle =
    (id: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      toggleProductValue({ id });
    };
  return (
    <ToggleContainer>
      <ToggleButton
        onClick={handleToggle(id)}
        isActive={isAvailable}
        size={5}
      />
      {isAvailable ? <span>판매</span> : <span>준비</span>}
    </ToggleContainer>
  );
};

interface ProductImageInfoContainerProps {
  productId: number;
  imageUrl?: string | null;
  name: string;
  price: number;
  handleSelectItem: (id: number) => () => void;
}

const ProductImageInfoContainer = ({
  productId,
  imageUrl,
  name,
  price,
  handleSelectItem
}: ProductImageInfoContainerProps) => {
  const selectProduct = useRecoilValue(selectProductListState);
  const selectOption = useRecoilValue(selectOptionState);

  return (
    <Item
      data-id={productId}
      onClick={handleSelectItem(productId)}
      selectOption={selectOption.options}
      selected={selectProduct.some((item) => item.id === productId)}
    >
      <div className="item-container">
        {selectOption.options !== "NONE" && <span className="is-select"></span>}
        <div className="image-container">
          <span className="transparent-box"></span>
          {imageUrl ? (
            <motion.div variants={imageBoxVariants} whileHover="hover">
              <Images src={imageUrl} alt={name} />
            </motion.div>
          ) : (
            <Noimage />
          )}
        </div>
        <ProductInfoContainer>
          <h3>{name}</h3>
          <h4>{translateLocalCurrency(price, "ko-KR")}원</h4>
        </ProductInfoContainer>
      </div>
    </Item>
  );
};
