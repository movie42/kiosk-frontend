import {
  useProductFormContext,
  useProductMutationContext,
  useProductOptionsFormContext
} from "@/lib/state";
import { ProductOptionValue } from "@/lib/state/ProductContextProvider";
import { useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { useParams } from "react-router-dom";
import { Form, IconButton } from "../../Atoms";
import { CreateProductStatusBar } from "../../Molecules";
import OptionFieldContainer from "./OptionFieldContainer";

interface CreateProductFormContainerProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  confirm: boolean;
}

const CreateProductFormContainer = ({
  setIsModal,
  confirm
}: CreateProductFormContainerProps) => {
  const { storeId } = useParams();

  const { getValues, register } = useProductFormContext();
  const {
    createProductOptionsForm: { setError, getValues: getOptionsValue },
    createOptionFieldArray: { append: optionsAppend }
  } = useProductOptionsFormContext();
  const {
    addProductMutate,
    isProductAddSuccess,
    newProducts,
    addProductOptionMutate
  } = useProductMutationContext();

  const hasOptions = ({ options }: ProductOptionValue) => {
    if (options.length === 0) {
      setError("options", {
        message: "반드시 기본 옵션을 들어가야합니다."
      });
      return false;
    }

    setError("options", { message: "" });
    return true;
  };

  const handleSubmitAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const options = getOptionsValue("options");
    const isOption = hasOptions({ options });
    if (!isOption) {
      return;
    }
    setIsModal(true);
  };

  useEffect(() => {
    if (confirm && storeId) {
      const products = {
        ...getValues(),
        price: Number(getValues().price),
        storeId: Number(storeId)
      };
      addProductMutate({ products });
    }
  }, [confirm, storeId]);

  useEffect(() => {
    if (isProductAddSuccess && newProducts?.addProducts) {
      const [productId] = newProducts.addProducts;
      const option = getOptionsValue("options").map((value) => ({
        productId,
        name: value.name
      }));
      addProductOptionMutate({ option });
    }
  }, [isProductAddSuccess]);

  return (
    <Form onSubmit={handleSubmitAddProduct}>
      <Form.FieldSet>
        <Form.FormItemContainer>
          <Form.Label htmlFor="name">상품 이름</Form.Label>
          <Form.Input
            id="name"
            type="text"
            placeholder="상품 이름을 입력해주세요."
            {...register("name", {
              required: "상품 이름은 꼭 입력해야해요"
            })}
          />
        </Form.FormItemContainer>
        <Form.FormItemContainer>
          <Form.Label>상품 옵션</Form.Label>
          <IconButton
            type="button"
            onClick={() => optionsAppend({ name: "" })}
            ReactIcon={IoIosAddCircle}
            hidden={true}
            text="상품 옵션 추가하기"
          />
        </Form.FormItemContainer>
        <OptionFieldContainer />
        <Form.FormItemContainer>
          <Form.Label htmlFor="price">상품 가격</Form.Label>
          <Form.Input
            id="price"
            type="number"
            placeholder="상품 가격을 입력해주세요."
            {...register("price", {
              required: "상품의 가격은 꼭 입력해야해요"
            })}
          />
        </Form.FormItemContainer>
        <Form.FormItemContainer>
          <Form.Label htmlFor="description">상품 정보</Form.Label>
          <Form.Textarea
            id="description"
            placeholder="상세 정보를 입력해주세요."
            {...register("description")}
          />
        </Form.FormItemContainer>
      </Form.FieldSet>
      <CreateProductStatusBar />
    </Form>
  );
};

export default CreateProductFormContainer;
