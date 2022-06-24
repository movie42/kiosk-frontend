import React, { useEffect, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { IoIosAddCircle } from "react-icons/io";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import InputDefault from "../../../Components/Form/InputDefault";
import LabelDefault from "../../../Components/Form/LabelDefault";
import TextareaDefault from "../../../Components/Form/TextareaDefault";
import { ProductListValues } from "../../../mockup/productList";
import { isCurrentSelectItemState } from "../../../state/productItemState";

const FieldSet = styled.fieldset<{ isSelect: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  padding: 1rem 1rem;
  border: ${(props) =>
    props.isSelect
      ? ` 4px solid ${props.theme.color.primary700}`
      : `1px solid ${props.theme.color.gray200}`};
`;

const FieldContainer = styled.div`
  display: grid;
  margin-bottom: 0.7rem;
  &:not(:last-child) {
    grid-template-columns: 2.5fr 8fr;
    border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  }
  label,
  input,
  textarea {
    margin: 0;
    padding: 0;
    font-size: 1.8rem;
    border: 0;
    outline: unset;
  }

  input {
    width: 100%;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  textarea {
    width: 100%;
    height: 9rem;
    resize: none;
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
  const [currentItemId, setCurrentItemId] = useRecoilState(
    isCurrentSelectItemState,
  );
  const [isSelect, setIsSelect] = useState(false);

  const toggleSelect = (e: React.MouseEvent<HTMLFieldSetElement>) => {
    const { id } = e.currentTarget.dataset;
    setCurrentItemId(Number(id));
  };

  useEffect(() => {
    if (currentItemId === item.id) {
      setIsSelect(true);
      return;
    }

    setIsSelect(false);
  }, [currentItemId]);
  return (
    <FieldSet
      name={fieldName}
      data-id={item.id}
      isSelect={isSelect}
      onClick={toggleSelect}
    >
      <FieldContainer>
        <LabelDefault htmlFor="file">섬네일</LabelDefault>
        {item.imageUrl ? (
          <AddThumbnailLabel>{item.imageUrl}</AddThumbnailLabel>
        ) : (
          //TODO: 이미지를 S3에 업로드 해야합니다.
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
          // defaultValue={item.option}
        />
      </FieldContainer>
      <FieldContainer>
        <LabelDefault htmlFor="desc">상품 정보</LabelDefault>
        <TextareaDefault
          id="desc"
          name="desc"
          fieldName={fieldName}
          register={register}
          // defaultValue={item.desc}
        />
      </FieldContainer>
    </FieldSet>
  );
};

export default UpdateModalForm;
