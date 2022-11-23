import React, { useEffect, useState } from "react";
import {
  DeepRequired,
  FieldArrayWithId,
  FieldErrorsImpl,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue
} from "react-hook-form";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import InputDefault from "../../../Components/Form/InputDefault";
import LabelDefault from "../../../Components/Form/LabelDefault";
import TextareaDefault from "../../../Components/Form/TextareaDefault";
import Images from "../../../Components/Images/Images";
import { useRemoveProductOptionsMutation } from "../../../lib/generated/graphql";
import graphqlReqeustClient from "../../../lib/graphqlRequestClient";
import { ProductListValues } from "../../../lib/state/productItemState";
import { updateProductState } from "../../../lib/state/productItemState";
import { userState } from "../../../lib/state/userState";
import useImageUpload from "../../../lib/utils/customHooks/useImageUpload";

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

const OptionFieldContainer = styled.div`
  .option-input-container,
  .add-option-button-container {
    display: grid;
    grid-template-columns: 20% 80%;
    padding: 1rem 0;
    button {
      cursor: pointer;
      text-align: left;
      padding: 0;
      margin: 0;
      &:hover {
        color: ${(props) => props.theme.color.primary300};
      }
    }
    &:not(:first-child) {
      border-bottom: 1px solid ${(props) => props.theme.color.gray300};
    }
    label {
      font-size: 1.8rem;
      align-self: center;
    }
    input {
      font-size: 1.8rem;
      border: 0;
      align-self: center;
      outline: none;
    }

    .option-label-button-container {
      display: flex;
      align-items: center;
      justify-content: space-around;
      button {
        cursor: pointer;
        font-size: 1.8rem;
        text-align: left;
        border: 0;
        background-color: unset;
        padding: 0;
        margin: 0;
        color: ${(props) => props.theme.color.error500};
        &:hover {
          color: ${(props) => props.theme.color.error900};
        }
        span {
          position: absolute;
          margin: -1px;
          top: 0;
          left: 0;
          visibility: hidden;
        }
      }
    }
  }

  .add-button {
    cursor: pointer;
    border: unset;
    background-color: unset;
    font-size: 2rem;
    color: ${(props) => props.theme.color.primary700};
    span {
      visibility: hidden;
    }
  }
  ${({ theme }) => theme.device.mobile} {
    .option-input-container,
    .add-option-button-container {
      label {
        font-size: 1.6rem;
      }
      input {
        font-size: 1.6rem;
      }
    }
    .option-input-container {
      grid-template-columns: 30% 70%;
    }
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
  optionsFields: FieldArrayWithId<
    {
      options: {
        optionId: number;
        name: string;
      }[];
    },
    "options",
    "id"
  >[];
  optionsRegister: UseFormRegister<{
    options: {
      optionId: number;
      name: string;
    }[];
  }>;
  optionsError: FieldErrorsImpl<
    DeepRequired<{
      options: {
        optionId: number;
        name: string;
      }[];
    }>
  >;
  optionsAppend: UseFieldArrayAppend<
    {
      options: {
        optionId: number;
        name: string;
      }[];
    },
    "options"
  >;
  optionsRemove: UseFieldArrayRemove;
  fieldName?: string;
}

const UpdateModalForm = ({
  register,
  setValue,
  optionsRegister,
  optionsError,
  optionsFields,
  optionsAppend,
  optionsRemove,
  fieldName
}: IUpdateModalFormProps) => {
  const queryClient = useQueryClient();
  const { accessToken } = useRecoilValue(userState);

  const productData = useRecoilValue(updateProductState);

  const [thumbnailImage, setThumbnailImage] = useState(productData.imageUrl);

  const { location, uploadFile } = useImageUpload();

  const { mutate: removeProductOptionMutate } = useRemoveProductOptionsMutation(
    graphqlReqeustClient(accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getProducts");
      }
    }
  );

  const handleRemoveOption = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    const parentsDiv = e.currentTarget.closest(
      ".option-input-container"
    ) as HTMLDivElement;
    const optionId = parentsDiv.dataset.optionid;
    removeProductOptionMutate({ optionIds: { OptionIds: [Number(optionId)] } });
    optionsRemove(index);
  };

  useEffect(() => {
    if (location) {
      setThumbnailImage(location);
      setValue("imageUrl", location);
    }
  }, [location]);

  return (
    <FieldSet name={fieldName} data-id={productData?.id}>
      {thumbnailImage && (
        <ImageContainer>
          <Images src={thumbnailImage} alt={productData?.name} />
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
          {...register("imageUrl")}
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
          {...register("name", {
            value: productData.name,
            onChange: uploadFile
          })}
        />
      </FieldContainer>
      <FieldContainer>
        <LabelDefault htmlFor="price">상품 가격</LabelDefault>
        <InputDefault
          type="number"
          id="price"
          {...register("price", {
            value: productData.price
          })}
        />
      </FieldContainer>
      <OptionFieldContainer>
        <div className="add-option-button-container">
          <LabelDefault>상품 옵션</LabelDefault>
          <button
            type="button"
            className="add-button"
            onClick={() =>
              optionsAppend({
                optionId: 0,
                name: "옵션을 입력해주세요."
              })
            }
          >
            <IoIosAddCircle />
            <span>옵션 추가</span>
          </button>
        </div>
        {optionsFields.map((optionField, index) => (
          <div
            key={optionField.id}
            className="option-input-container"
            data-optionid={optionField.optionId}
          >
            <div className="option-label-button-container">
              <LabelDefault htmlFor="option">
                상품 옵션 {index + 1}
              </LabelDefault>
              <button
                type="button"
                onClick={(e) => handleRemoveOption(e, index)}
              >
                <IoIosRemoveCircle />
                <span>삭제</span>
              </button>
            </div>
            <InputDefault
              id="option"
              type="text"
              placeholder="옵션의 이름을 입력해주세요"
              {...optionsRegister(`options.${index}.name`, {
                value: optionField.name
              })}
            />
          </div>
        ))}
        {optionsError.options && <p>{optionsError.options.message}</p>}
      </OptionFieldContainer>
      <FieldContainer>
        <LabelDefault htmlFor="description">상품 정보</LabelDefault>
        <TextareaDefault
          id="description"
          {...register("description", {
            value: productData?.description
          })}
        />
      </FieldContainer>
    </FieldSet>
  );
};

export default UpdateModalForm;
