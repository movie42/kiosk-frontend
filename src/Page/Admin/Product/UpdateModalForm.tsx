import React, { useEffect, useState } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IoIosAddCircle } from "react-icons/io";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import InputDefault from "../../../Components/Form/InputDefault";
import LabelDefault from "../../../Components/Form/LabelDefault";
import TextareaDefault from "../../../Components/Form/TextareaDefault";
import Images from "../../../Components/Images/Images";
import { ProductListValues } from "../../../mockup/productList";
import {
  isCurrentSelectItemState,
  updateProductState,
} from "../../../state/productItemState";
import useImageUpload from "../../../utils/customHooks/useImageUpload";

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

const ImageContainer = styled.div`
  margin: 0 auto;
  width: 50%;
`;

const AddThumbnail = styled(InputDefault)`
  display: none;
`;

const AddThumbnailLabel = styled(LabelDefault)`
  cursor: pointer;
  color: ${(props) => props.theme.color.primary700};
`;

interface IUpdateModalFormProps {
  register: UseFormRegister<ProductListValues>;
  setValue: UseFormSetValue<ProductListValues>;
  fieldName?: string;
}

const UpdateModalForm = ({
  fieldName,
  register,
  setValue,
}: IUpdateModalFormProps) => {
  const item = useRecoilValue(updateProductState);
  const [thumbnailImage, setThumbnailImage] = useState(item.imageUrl);

  const { location, error, uploadFile } = useImageUpload();

  useEffect(() => {
    if (location) {
      setThumbnailImage(location);
      setValue("imageUrl", location);
    }
  }, [location]);

  return (
    <FieldSet name={fieldName} data-id={item.id}>
      {thumbnailImage && (
        <ImageContainer>
          <Images src={thumbnailImage} alt={item.name} />
        </ImageContainer>
      )}
      <FieldContainer>
        <LabelDefault>섬네일</LabelDefault>
        <AddThumbnailLabel htmlFor="imageUploader">
          <IoIosAddCircle />
        </AddThumbnailLabel>
        <InputDefault
          type="text"
          id="imageUrl"
          name="imageUrl"
          fieldName={fieldName}
          register={register}
          style={{ visibility: "hidden" }}
        />
        <AddThumbnail
          id="imageUploader"
          type="file"
          accept="image/*"
          name="imageUrl"
          placeholder="사진 찾기"
          onChange={uploadFile}
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
          onChange={uploadFile}
        />
      </FieldContainer>
      <FieldContainer>
        <LabelDefault htmlFor="price">상품 가격</LabelDefault>
        <InputDefault
          type="number"
          id="price"
          name="price"
          fieldName={fieldName}
          defaultValue={item.price}
          register={register}
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
          defaultValue={item.options?.join(", ")}
        />
      </FieldContainer>
      <FieldContainer>
        <LabelDefault htmlFor="description">상품 정보</LabelDefault>
        <TextareaDefault
          id="description"
          name="description"
          fieldName={fieldName}
          register={register}
        >
          {item.description}
        </TextareaDefault>
      </FieldContainer>
    </FieldSet>
  );
};

export default UpdateModalForm;
