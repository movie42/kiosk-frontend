import React, { MouseEvent, useState } from "react";
import styled from "styled-components";
import ProductItem from "./ProductItem";
import { ProductListValues } from "../../mockup/productList";
import StateMenuBar from "./StateMenuBar";
import { useRecoilState } from "recoil";
import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";
import {
  productListState,
  selectProductListState,
} from "../../state/productItemState";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  ul.productList {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(20rem, auto);
  }
`;
const ManageOptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h2 {
    font-size: 2rem;
    font-weight: bold;
  }

  button {
    &:not(:first-child) {
      margin-left: 0.5rem;
    }
  }
`;
const CreateProductButton = styled(ButtonDefaultStyle)`
  background-color: ${(props) => props.theme.success};
`;
const DeleteProductButton = styled(ButtonDefaultStyle)`
  background-color: ${(props) => props.theme.warning};
`;
const UpdateProductButton = styled(ButtonDefaultStyle)`
  background-color: ${(props) => props.theme.success};
`;

export interface SelectOption {
  option: "none" | "delete" | "update";
}

const AdminManageProductItemList = () => {
  const navigate = useNavigate();
  const [selectOption, setSelectOption] = useState<SelectOption>({
    option: "none",
  });
  const [productList, setProductList] = useRecoilState(productListState);
  const [selectList, setSelectList] = useRecoilState<ProductListValues[]>(
    selectProductListState,
  );

  const handleSelectOption = (option: SelectOption) => {
    setSelectOption(option);
  };

  const selectHandler = (event: React.MouseEvent<HTMLLIElement>) => {
    if (selectOption.option === "none") {
      return;
    }
    const id = event.currentTarget.dataset.id;
    const selectProduct = productList.filter((item) => item.id === Number(id));
    id &&
      setSelectList((prevState) => {
        const itemIndex = prevState.findIndex(
          (value) => value.id === Number(id),
        );
        if (itemIndex !== -1) {
          return prevState.filter((value) => value.id !== Number(id));
        }
        return [...prevState, ...selectProduct];
      });
  };

  return (
    <>
      <Container>
        <ManageOptionContainer>
          <h2>상품 관리</h2>
          {selectOption.option === "none" && (
            <div>
              <CreateProductButton
                onClick={() => navigate("/admin/:id/add-product")}
              >
                상품등록
              </CreateProductButton>
              <UpdateProductButton
                onClick={() => {
                  handleSelectOption({ option: "update" });
                }}
              >
                상품수정
              </UpdateProductButton>
              <DeleteProductButton
                onClick={() => {
                  handleSelectOption({ option: "delete" });
                }}
              >
                상품삭제
              </DeleteProductButton>
            </div>
          )}
        </ManageOptionContainer>
        <ul className="productList">
          {productList &&
            productList.map((item) => (
              <ProductItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                select={item.select}
                selectOption={selectOption}
                handler={selectHandler}
              />
            ))}
        </ul>
      </Container>
      {selectOption.option !== "none" && (
        <StateMenuBar
          selectOption={selectOption}
          setSelectOption={setSelectOption}
          selectItems={selectList}
        />
      )}
    </>
  );
};

export default AdminManageProductItemList;
