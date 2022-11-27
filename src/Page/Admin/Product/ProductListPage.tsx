import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { MdAddCircle, MdDelete } from "react-icons/md";

import { Option, selectOptionState } from "@/lib/state";
import {
  PageHeader,
  Loading,
  ProductListItem,
  MenuStatusBar
} from "@/Components";
import { useGetStore, useGetProduct } from "@/Page/Admin/hooks";

import {
  ProductListPageButtonContainer,
  ButtonItemWrapper,
  ProductListPageContainer,
  CreateProductButton,
  DeleteProductButton,
  ManageOptionContainer,
  ProductList
} from "./styles";

const ProductListPage = () => {
  const { storeId, userId } = useParams();
  const navigate = useNavigate();
  const { isLoading, data: products } = useGetProduct();
  const { data: store } = useGetStore();
  const [{ options }, setSelectOption] = useRecoilState(selectOptionState);
  const handleDeleteItem = (option: Option) => () => {
    setSelectOption({ options: option });
  };
  const handleGoToAddProduct = () =>
    navigate(`/admin/${userId}/store/${storeId}/product/add-product`);

  return isLoading ? (
    <Loading title="등록한 상품을 불러오고 있습니다." />
  ) : (
    <ProductListPageContainer>
      <ManageOptionContainer>
        <PageHeader header="상품 관리" message={store?.name} />
        <ProductListPageButtonContainer options={options}>
          <ButtonItemWrapper onClick={handleGoToAddProduct}>
            <MdAddCircle />
            <CreateProductButton>상품등록</CreateProductButton>
          </ButtonItemWrapper>
          <ButtonItemWrapper onClick={handleDeleteItem(Option.DELETE)}>
            <MdDelete />
            <DeleteProductButton>상품삭제</DeleteProductButton>
          </ButtonItemWrapper>
        </ProductListPageButtonContainer>
      </ManageOptionContainer>
      <ProductList>
        {products &&
          products.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
      </ProductList>
      {options !== "none" && <MenuStatusBar />}
    </ProductListPageContainer>
  );
};

export default ProductListPage;
