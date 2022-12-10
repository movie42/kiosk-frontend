import { CreateProductLoading } from "@/Components/UI/Molecules";
import {
  CreateProductFormContainer,
  CreateProductModal,
  PageHeader
} from "@/Components/UI/Organisms";
import { useModalHook } from "@/lib/hooks";
import { ProductContextProvider } from "@/lib/state";
import { ManageProductContainer, ManageProductHeader } from "./styles";

const CreateProductPage = () => {
  const { isModal, setIsModal, setConfirm, confirm } = useModalHook();

  return (
    <ProductContextProvider>
      <CreateProductLoading />
      <CreateProductModal
        isModal={isModal}
        setIsModal={setIsModal}
        setConfirm={setConfirm}
      />
      <ManageProductContainer>
        <ManageProductHeader>
          <PageHeader header="상품 등록" />
        </ManageProductHeader>
        <CreateProductFormContainer setIsModal={setIsModal} confirm={confirm} />
      </ManageProductContainer>
    </ProductContextProvider>
  );
};

export default CreateProductPage;
