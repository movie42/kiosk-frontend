import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { MdAddCircle, MdDelete } from "react-icons/md";

import {
  SelectOption,
  Option,
  selectOptionState,
  selectProductListState
} from "@/lib/state";
import { PageHeader, Loading } from "@/Components";

import ProductItem from "./ProductItem";
import StateMenuBar from "../StateMenuBar/StateMenuBar";
import {
  ButtonContainer,
  ButtonItemWrapper,
  Container,
  CreateProductButton,
  DeleteProductButton,
  ManageOptionContainer
} from "./styles";
import { useGetStore, useGetProduct } from "@/Page/Admin/hooks";

const AdminManageProductItemList = () => {
  const { storeId, userId } = useParams();
  const navigate = useNavigate();
  const [selectOption, setSelectOption] = useRecoilState(selectOptionState);
  const setSelectProduct = useSetRecoilState(selectProductListState);
  const { isLoading, data: products } = useGetProduct();
  const { data: store } = useGetStore();
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
          <PageHeader header="상품 관리" message={store?.name} />
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
          <ProductItem productData={products} />
        </ul>
      </Container>
      {selectOption.options !== "none" && <StateMenuBar />}
    </>
  );
};

export default AdminManageProductItemList;
