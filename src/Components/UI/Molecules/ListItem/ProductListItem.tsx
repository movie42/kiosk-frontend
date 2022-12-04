import React from "react";
import { MdCreate } from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate, useParams } from "react-router-dom";

import { ToggleButton } from "@/Components/UI/Atoms";
import { ProductUpdateModal } from "@/Components/UI/Organisms";
import { useUpdateProductOpenCloseToggle } from "@/Page/Admin/hooks";
import {
  ProductListValues,
  selectOptionState,
  selectProductListState
} from "@/lib/state";
import { useModalHook } from "@/lib/hooks";

import {
  ListItemButtonContainer,
  ToggleContainer,
  ListItemButtonWrapper,
  ListItemButton
} from "./styles";
import ListItem from "./ListItem";

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

  const selectProduct = useRecoilValue(selectProductListState);
  const selectOption = useRecoilValue(selectOptionState);

  return (
    <>
      {isModal && <ProductUpdateModal setIsModal={setIsModal} />}
      <ListItem
        key={product.id}
        onClick={handleGoToProductDetail}
        itemId={product.id}
        name={product.name}
        price={product.price}
        imageUrl={product.imageUrl}
        itemHandler={handleSelectItem(product.id)}
        selectOption={selectOption.options}
        selected={selectProduct.some((item) => item.id === product.id)}
      >
        <ListItemButtonContainer>
          <ProductToggleButton
            id={product.id}
            isAvailable={product.isAvailable}
          />
          <ListItemButtonWrapper onClick={handleUpdateItem}>
            <MdCreate />
            <ListItemButton>수정</ListItemButton>
          </ListItemButtonWrapper>
        </ListItemButtonContainer>
      </ListItem>
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
