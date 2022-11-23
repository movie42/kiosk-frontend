import React, { useState } from "react";
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

import { ProductListValues, updateProductState, userState } from "@/lib/state";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { useRemoveProductOptionsMutation } from "@/lib/generated/graphql";
import {
  Images,
  LabelDefault,
  InputDefault,
  TextareaDefault
} from "@/Components";
import {
  AddThumbnail,
  AddThumbnailLabel,
  FieldContainer,
  FieldSet,
  ImageContainer,
  OptionFieldContainer
} from "./styles";

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

  const [thumbnailImage, _] = useState(productData.imageUrl);

  // const { location, uploadFile } = useImageUpload();

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

  // useEffect(() => {
  //   if (location) {
  //     setThumbnailImage(location);
  //     setValue("imageUrl", location);
  //   }
  // }, [location]);

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
          // onChange={uploadFile}
        />
      </FieldContainer>
      <FieldContainer>
        <LabelDefault htmlFor="name">상품 이름</LabelDefault>
        <InputDefault
          type="text"
          id="name"
          // {...register("name", {
          //   value: productData.name,
          //   onChange: uploadFile
          // })}
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
