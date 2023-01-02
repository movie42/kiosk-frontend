import { useUpdateProductMutationContext } from "@/lib/state";
import Loading from "./Loading";

const UpdateProductLoading = () => {
  const { isAddingNewOptions, isUpdatingProduct, isUpdatingProductOptions } =
    useUpdateProductMutationContext();

  return isAddingNewOptions && isUpdatingProduct && isUpdatingProductOptions ? (
    <Loading
      title="잠시만 기다려주세요!"
      subTitle={
        isUpdatingProduct || isUpdatingProductOptions
          ? "상품을 업데이트하고 있습니다."
          : "옵션을 등록하는 중입니다."
      }
    />
  ) : null;
};

export default UpdateProductLoading;
