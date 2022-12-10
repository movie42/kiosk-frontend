import { CreateProductLoading } from "@/Components/UI/Molecules";
import {
  CreateProductFormContainer,
  CreateProductModal,
  PageHeader
} from "@/Components/UI/Organisms";
import { useModalHook } from "@/lib/hooks";
import { ProductContextProvider } from "@/lib/state";
import { CreateProductContainer, CreateProductHeader } from "./styles";

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
      <CreateProductContainer>
        <CreateProductHeader>
          <PageHeader header="상품 등록" />
        </CreateProductHeader>
        <CreateProductFormContainer setIsModal={setIsModal} confirm={confirm} />
      </CreateProductContainer>
    </ProductContextProvider>
  );
};

export default CreateProductPage;
