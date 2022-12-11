import { IoIosAddCircle } from "react-icons/io";

import { Form } from "../../Atoms/Form";
import { IconButton } from "../../Atoms/Buttons";
import { ManageProductStatusBar } from "../../Molecules";
import OptionFieldContainer from "./OptionFieldContainer";
import {
  useProductFormContext,
  useProductOptionsFormContext
} from "@/lib/state";

interface ProductFormProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

const ProductForm = ({ handleSubmit }: ProductFormProps) => {
  const { register } = useProductFormContext();
  const {
    optionFieldArray: { append: optionsAppend }
  } = useProductOptionsFormContext();
  return (
    <Form onSubmit={handleSubmit}>
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
      <ManageProductStatusBar />
    </Form>
  );
};

export default ProductForm;
