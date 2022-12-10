import { useProductMutationContext } from "@/lib/state";
import Loading from "./Loading";

const CreateProductLoading = () => {
  const { isProductAdding, isOptionAdding } = useProductMutationContext();

  return isProductAdding && isOptionAdding ? (
    <Loading
      title="잠시만 기다려주세요!"
      subTitle={
        isProductAdding ? "상품 등록 중입니다." : "옵션을 등록하는 중입니다."
      }
    />
  ) : null;
};

export default CreateProductLoading;
