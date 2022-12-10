import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { MdAddCircle, MdDelete } from "react-icons/md";
import {
  Loading,
  MenuStatusBar,
  ProductListItem
} from "@/Components/UI/Molecules";
import { PageHeader } from "@/Components/UI/Organisms";
import { OptionValue, selectOptionState } from "@/lib/state";
import { useGetStore, useGetProduct } from "@/Page/Admin/hooks";
import {
  ProductListPageButtonContainer,
  CreateProductButton,
  DeleteProductButton,
  ManageOptionContainer,
  ManageProductContainer
} from "./styles";
import { List } from "@/Components/UI/Molecules/ListItem/styles";

const ProductListPage = () => {
  const { storeId, userId } = useParams();
  const navigate = useNavigate();
  const { isLoading, data: products } = useGetProduct();
  const { data: store } = useGetStore();
  const [{ options }, setSelectOption] = useRecoilState(selectOptionState);
  const handleDeleteItem = (option: OptionValue) => () => {
    setSelectOption({ options: option });
  };
  const handleGoToAddProduct = () =>
    navigate(`/admin/${userId}/store/${storeId}/product/add-product`);

  return isLoading ? (
    <Loading title="등록한 상품을 불러오고 있습니다." />
  ) : (
    <ManageProductContainer>
      <ManageOptionContainer>
        <PageHeader header="상품 관리" message={store?.name} />
        <ProductListPageButtonContainer options={options}>
          <CreateProductButton
            ReactIcon={MdAddCircle}
            onClick={handleGoToAddProduct}
            hidden={false}
            text="상품등록"
          />
          <DeleteProductButton
            ReactIcon={MdDelete}
            onClick={handleDeleteItem("DELETE")}
            hidden={false}
            text="상품삭제"
          />
        </ProductListPageButtonContainer>
      </ManageOptionContainer>
      <List>
        {products &&
          products.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
      </List>
      {options !== "NONE" && <MenuStatusBar />}
    </ManageProductContainer>
  );
};

export default ProductListPage;
