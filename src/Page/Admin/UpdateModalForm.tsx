import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { IoIosAddCircle } from "react-icons/io";
import styled from "styled-components";
import InputDefault from "../../Components/Form/InputDefault";
import LabelDefault from "../../Components/Form/LabelDefault";
import TextareaDefault from "../../Components/Form/TextareaDefault";
import { ProductListValues } from "../../mockup/productList";

const FieldSet = styled.fieldset`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  padding: 1rem 1rem;
  border: 1px solid ${(props) => props.theme.color.gray200};
`;

const FieldContainer = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 8fr;
  margin-bottom: 0.7rem;
  label,
  input,
  textarea {
    margin: 0;
    padding: 0;
    font-size: 1.8rem;
    border: 0;
    border-bottom: 1px solid ${(props) => props.theme.color.gray300};
    outline: unset;
  }

  input {
    width: 100%;
  }

  textarea {
    width: 100%;
  }
`;

const AddThumbnail = styled(InputDefault)`
  display: none;
`;

const AddThumbnailLabel = styled(LabelDefault)`
  cursor: pointer;
  color: ${(props) => props.theme.color.primary700};
`;

interface IUpdateModalFormProps {
  fieldName: string;
  register: UseFormRegister<FieldValues>;
  item: ProductListValues;
}

const UpdateModalForm = ({
  fieldName,
  register,
  item,
}: IUpdateModalFormProps) => {
  return (
    <FieldSet name={fieldName} data-id={item.id}>
      <FieldContainer>
        <LabelDefault htmlFor="file">섬네일</LabelDefault>
        {item.thumbnail ? (
          <AddThumbnailLabel>{item.thumbnail}</AddThumbnailLabel>
        ) : (
          <AddThumbnailLabel>
            <IoIosAddCircle />
          </AddThumbnailLabel>
        )}
        <AddThumbnail
          id="file"
          type="file"
          accept="image/*"
          name="thumbnail"
          fieldName={fieldName}
          register={register}
        />
      </FieldContainer>
      <FieldContainer>
        <LabelDefault htmlFor="name">상품 이름</LabelDefault>
        <InputDefault
          type="text"
          id="name"
          name="name"
          fieldName={fieldName}
          register={register}
          defaultValue={item.name}
        />
      </FieldContainer>
      <FieldContainer>
        <LabelDefault htmlFor="price">상품 가격</LabelDefault>
        <InputDefault
          type="number"
          id="price"
          name="price"
          fieldName={fieldName}
          register={register}
          defaultValue={item.price}
        />
      </FieldContainer>
      <FieldContainer>
        <LabelDefault htmlFor="option">상품 옵션</LabelDefault>
        <InputDefault
          type="text"
          id="option"
          name="option"
          fieldName={fieldName}
          register={register}
          defaultValue={item.option}
        />
      </FieldContainer>
      <FieldContainer>
        <LabelDefault htmlFor="desc">상품 정보</LabelDefault>
        <TextareaDefault
          id="desc"
          name="desc"
          fieldName={fieldName}
          register={register}
          defaultValue={item.desc}
        />
      </FieldContainer>
    </FieldSet>
  );
};

export default UpdateModalForm;
