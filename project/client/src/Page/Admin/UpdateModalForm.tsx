import React from "react";
import styled from "styled-components";
import InputDefault from "../../Components/Form/InputDefault";
import LabelDefault from "../../Components/Form/LabelDefault";
import TextareaDefault from "../../Components/Form/TextareaDefault";

const FieldContainer = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 8fr;
  margin-bottom: 0.7rem;
  label {
    margin: 0;
    padding: 0;
    font-size: 1.8rem;
  }
  input {
    margin: 0;
    padding: 0;
    width: 100%;
  }
  textarea {
    margin: 0;
    padding: 0;
    width: 100%;
  }
`;

const UpdateModalForm = ({ fieldName, register, item }: any) => {
  return (
    <fieldset name={fieldName} data-id={item.id}>
      <FieldContainer>
        <LabelDefault htmlFor="file" text="상품 썸네일" />
        <InputDefault
          id="file"
          type="file"
          accept="image/*"
          name="thumbnail"
          fieldName={fieldName}
          register={register}
        />
      </FieldContainer>
      <FieldContainer>
        <LabelDefault htmlFor="name" text="상품 이름" />
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
        <LabelDefault htmlFor="price" text="상품 가격" />
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
        <LabelDefault htmlFor="option" text="상품 옵션" />
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
        <LabelDefault htmlFor="desc" text="상품 정보" />
        <TextareaDefault
          id="desc"
          name="desc"
          fieldName={fieldName}
          register={register}
          defaultValue={item.desc}
        />
      </FieldContainer>
    </fieldset>
  );
};

export default UpdateModalForm;
