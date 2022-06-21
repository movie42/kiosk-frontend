import React from "react";
import styled from "styled-components";
import ProductItem from "./ProductItem";
import { ProductListValues } from "../../../mockup/productList";
import StateMenuBar from "./StateMenuBar";
import { useRecoilState, useRecoilValue } from "recoil";
import ButtonDefaultStyle from "../../../Components/Buttons/ButtonDefault";
import {
  productListState,
  SelectOption,
  Option,
  selectOptionState,
  selectProductListState,
} from "../../../state/productItemState";
import { useNavigate, useParams } from "react-router-dom";
import PageHeaderMessage from "../../../Components/PageHeader";
import { storeState } from "../../../state/storeState";

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
  background-color: ${(props) => props.theme.color.primary600};
`;
const DeleteProductButton = styled(ButtonDefaultStyle)`
  background-color: ${(props) => props.theme.color.error500};
`;
const UpdateProductButton = styled(ButtonDefaultStyle)`
  background-color: ${(props) => props.theme.color.primary600};
`;

const AdminManageProductItemList = () => {
  const { storeId, userId } = useParams();
  const navigate = useNavigate();
  const store = useRecoilValue(storeState);
  const [selectOption, setSelectOption] = useRecoilState(selectOptionState);
  const [productList, setProductList] = useRecoilState(productListState);
  const [selectList, setSelectList] = useRecoilState<ProductListValues[]>(
    selectProductListState,
  );

  const handleSelectOption = (option: SelectOption) => {
    setSelectOption(option);
  };

  const selectHandler = (event: React.MouseEvent<HTMLLIElement>) => {
    if (selectOption.options === "none") {
      return;
    }

    const id = event.currentTarget.dataset.id;
    const selectProduct = productList.filter((item) => item.id === Number(id));

    setSelectList((prevState) => {
      const itemIndex = prevState.findIndex((value) => value.id === Number(id));

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
          <PageHeaderMessage header="상품 관리" message={store.name} />
          {selectOption.options === "none" && (
            <div>
              <CreateProductButton
                onClick={() =>
                  navigate(
                    `/admin/${userId}/store/${storeId}/product/add-product`,
                  )
                }
              >
                상품등록
              </CreateProductButton>
              <UpdateProductButton
                onClick={() => {
                  handleSelectOption({ options: Option.UPDATE });
                }}
              >
                상품수정
              </UpdateProductButton>
              <DeleteProductButton
                onClick={() => {
                  handleSelectOption({ options: Option.DELETE });
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
      {selectOption.options !== "none" && (
        <StateMenuBar selectOption={selectOption} selectItems={selectList} />
      )}
    </>
  );
};

export default AdminManageProductItemList;