import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { MdAddCircle, MdDelete } from "react-icons/md";

import { Option, selectOptionState } from "@/lib/state";
import { PageHeader, Loading } from "@/Components";
import { useGetStore, useGetProduct } from "@/Page/Admin/hooks";
import { StateMenuBar } from "../StateMenuBar";
import {
  ButtonContainer,
  ButtonItemWrapper,
  Container,
  CreateProductButton,
  DeleteProductButton,
  ManageOptionContainer,
  ProductList
} from "./styles";
import ProductItem from "./ProductItem";

const AdminManageProductItemList = () => {
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
    <Container>
      <ManageOptionContainer>
        <PageHeader header="상품 관리" message={store?.name} />
        <ButtonContainer options={options}>
          <ButtonItemWrapper onClick={handleGoToAddProduct}>
            <MdAddCircle />
            <CreateProductButton>상품등록</CreateProductButton>
          </ButtonItemWrapper>
          <ButtonItemWrapper onClick={handleDeleteItem(Option.DELETE)}>
            <MdDelete />
            <DeleteProductButton>상품삭제</DeleteProductButton>
          </ButtonItemWrapper>
        </ButtonContainer>
      </ManageOptionContainer>
      <ProductList>
        <ProductItem productData={products} />
      </ProductList>
      {options !== "none" && <StateMenuBar />}
    </Container>
  );
};

export default AdminManageProductItemList;
