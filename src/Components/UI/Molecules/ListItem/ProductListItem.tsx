import React from "react";
import { MdCreate } from "react-icons/md";
import { useRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom";

import { ToggleButton } from "@/Components/UI/Atoms";

import { useUpdateProductOpenCloseToggle } from "@/Page/Admin/hooks";
import {
  ProductListValues,
  selectOptionState,
  selectProductListState
} from "@/lib/state";

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
  const [{ options }, _] = useRecoilState(selectOptionState);

  const [selectProducts, setSelectProducts] = useRecoilState(
    selectProductListState
  );

  const handleGoToProductDetail = () => {
    navigate(`/admin/${userId}/store/${storeId}/product/${product.id}`);
  };

  const handleUpdateItem = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate(
      `/admin/${userId}/store/${storeId}/product/${product.id}/update-product`
    );
  };

  const handleSelectItem = (id: number) => {
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

  const handleItem = (id: number) => () => {
    if (options === "DELETE") {
      handleSelectItem(id);
      return;
    }
    handleGoToProductDetail();
  };

  return (
    <ListItem
      key={product.id}
      itemId={product.id}
      onClick={handleItem(product.id)}
      name={product.name}
      price={product.price}
      imageUrl={product.imageUrl}
      selectOption={options}
      selected={selectProducts.some((item) => item.id === product.id)}
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
  );
};

export default ProductListItem;

interface ToggleButtonProps {
  id: number;
  isAvailable?: boolean;
}

const ProductToggleButton = ({ id, isAvailable }: ToggleButtonProps) => {
  const { mutate: toggleProductValue } = useUpdateProductOpenCloseToggle();
  const handleToggle =
    (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
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
