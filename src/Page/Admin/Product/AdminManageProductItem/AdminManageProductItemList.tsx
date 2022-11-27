import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {
  ProductListValues,
  productListState,
  SelectOption,
  Option,
  selectOptionState,
  selectProductListState,
  userState,
  storeState
} from "@/lib/state";
import PageHeaderMessage from "@/Components/Layouts/Header/PageHeader";

import Loading from "@/Components/Loading/Loading";
import { useGetProductsQuery } from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";

import ProductItem from "./ProductItem";
import StateMenuBar from "../StateMenuBar/StateMenuBar";

import { MdAddCircle, MdDelete } from "react-icons/md";
import {
  ButtonContainer,
  ButtonItemWrapper,
  Container,
  CreateProductButton,
  DeleteProductButton,
  ManageOptionContainer
} from "./styles";

const AdminManageProductItemList = () => {
  const { storeId, userId } = useParams();
  const { accessToken } = useRecoilValue(userState);
  const navigate = useNavigate();
  const store = useRecoilValue(storeState);
  const [productList, setProductList] = useRecoilState(productListState);
  const [selectOption, setSelectOption] = useRecoilState(selectOptionState);
  const setSelectProduct = useSetRecoilState(selectProductListState);

  const { isLoading } = useGetProductsQuery(
    graphqlReqeustClient(accessToken),
    {
      id: Number(storeId)
    },
    {
      onSuccess: (data) => {
        if (data.store?.products) {
          const productList = data.store.products.map<ProductListValues>(
            (value) => ({
              id: Number(value.id),
              isAvailable: value.isAvailable,
              name: value.name,
              price: value.price,
              imageUrl: value.imageUrl,
              description: value.description,
              options: value.options.map((item) => ({
                id: Number(item.id),
                name: item.name
              }))
            })
          );

          setProductList(productList);
        }
      }
    }
  );

  const handleDeleteItem = () => {
    handleSelectOption({ options: Option.DELETE });
  };

  const handleSelectOption = (option: SelectOption) => {
    setSelectOption(option);
  };

  useEffect(() => {
    return () => {
      setSelectOption({ options: Option.NONE });
      setSelectProduct([]);
    };
  }, []);

  return isLoading ? (
    <Loading title="등록한 상품을 불러오고 있습니다." />
  ) : (
    <>
      <Container selectOption={selectOption.options !== "none"}>
        <ManageOptionContainer>
          <PageHeaderMessage header="상품 관리" message={store.name} />
          {selectOption.options === "none" && (
            <ButtonContainer>
              <ButtonItemWrapper
                onClick={() =>
                  navigate(
                    `/admin/${userId}/store/${storeId}/product/add-product`
                  )
                }
              >
                <MdAddCircle />
                <CreateProductButton>상품등록</CreateProductButton>
              </ButtonItemWrapper>
              <ButtonItemWrapper onClick={handleDeleteItem}>
                <MdDelete />
                <DeleteProductButton>상품삭제</DeleteProductButton>
              </ButtonItemWrapper>
            </ButtonContainer>
          )}
        </ManageOptionContainer>
        <ul className="productList">
          <ProductItem productData={productList} />
        </ul>
      </Container>
      {selectOption.options !== "none" && <StateMenuBar />}
    </>
  );
};

export default AdminManageProductItemList;
