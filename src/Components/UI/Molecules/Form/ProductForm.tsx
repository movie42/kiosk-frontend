import { IoIosAddCircle } from "react-icons/io";

import {
  ProductListValues,
  useProductFormContext,
  useProductOptionsFormContext
} from "@/lib/state";
import { Form } from "../../Atoms/Form";
import { IconButton } from "../../Atoms/Buttons";
import { OptionFieldContainer } from "../../Organisms/Containers";
import { StatusBar } from "../Bar";
import { useNavigate } from "react-router-dom";

interface ProductFormProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  product?: ProductListValues;
}

const ProductForm = ({ handleSubmit, product }: ProductFormProps) => {
  const { register } = useProductFormContext();
  const {
    optionFieldArray: { append: optionsAppend }
  } = useProductOptionsFormContext();
  const navigate = useNavigate();
  const handleCancel = () => {
    return navigate(-1);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.FieldSet>
          <Form.FormItemContainer>
            <Form.Label htmlFor="name">상품 이름</Form.Label>
            <Form.Input
              id="name"
              type="text"
              placeholder="상품 이름을 입력해주세요."
              {...register("name", {
                required: "상품 이름은 꼭 입력해야해요",
                value: product?.name
              })}
            />
          </Form.FormItemContainer>
          <Form.FormItemContainer>
            <Form.Label>상품 옵션</Form.Label>
            <IconButton
              type="button"
              onClick={() => optionsAppend({ optionId: 0, name: "" })}
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
                required: "상품의 가격은 꼭 입력해야해요",
                value: product?.price
              })}
            />
          </Form.FormItemContainer>
          <Form.FormItemContainer>
            <Form.Label htmlFor="description">상품 정보</Form.Label>
            <Form.Textarea
              id="description"
              placeholder="상세 정보를 입력해주세요."
              {...register("description", {
                value: product?.description ? product.description : ""
              })}
            ></Form.Textarea>
          </Form.FormItemContainer>
        </Form.FieldSet>
      </Form>
      <StatusBar
        confirmButtonProps={{
          children: "상품등록",
          className: "confirm-button"
        }}
        cancelButtonProps={{
          type: "button",
          children: "등록취소",
          onClick: handleCancel,
          className: "cancel-button"
        }}
      />
    </>
  );
};

export default ProductForm;
