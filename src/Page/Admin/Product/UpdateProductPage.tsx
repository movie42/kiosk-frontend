import { UpdateProductLoading } from "@/Components/UI/Molecules";
import { UpdateProductModal, PageHeader } from "@/Components/UI/Organisms";
import UpdateProductFormContainer from "@/Components/UI/Organisms/Containers/UpdateProductFormContainer";

import { useModalHook } from "@/lib/hooks";
import { ProductContextProvider } from "@/lib/state";

import { useGetProductDetail } from "../hooks";

import { ManageProductContainer, ManageProductHeader } from "./styles";

const UpdateProductPage = () => {
  const { isModal, setIsModal, setConfirm, confirm } = useModalHook();
  const { data: product } = useGetProductDetail();

  return (
    <ProductContextProvider>
      <UpdateProductLoading />
      <UpdateProductModal
        isModal={isModal}
        setIsModal={setIsModal}
        setConfirm={setConfirm}
      />
      <ManageProductContainer>
        <ManageProductHeader>
          <PageHeader header={`${product?.name} 수정`} />
        </ManageProductHeader>
        {product && (
          <UpdateProductFormContainer
            setIsModal={setIsModal}
            confirm={confirm}
            product={product}
          />
        )}
      </ManageProductContainer>
    </ProductContextProvider>
  );
};

export default UpdateProductPage;
