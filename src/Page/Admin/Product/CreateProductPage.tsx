import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";

import {
  InputDefault,
  LabelDefault,
  TextareaDefault,
  Modal
} from "@/Components";

import {
  useAddProductOptionsMutation,
  useAddProductsMutation
} from "@/lib/generated/graphql";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { userState } from "@/lib/state";
import {
  AddimageUrl,
  AddimageUrlLabel,
  CancelButton,
  CreateProductContainer,
  CreateButton,
  CreateProductHeader,
  ModalButtonContainer,
  ModalChildren,
  OptionsField,
  ButtonContainer
} from "./styles";

interface ProductDefaultValue {
  imageUrl?: string;
  name: string;
  price: number;
  description?: string;
}

interface ProductMutationValue extends ProductDefaultValue {
  storeId: number;
}

const CreateProductPage = () => {
  const { storeId, userId } = useParams();
  const { accessToken } = useRecoilValue(userState);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [formData, setFormData] = useState<ProductMutationValue[]>([
    {
      storeId: 0,
      imageUrl: "",
      name: "",
      price: 0,
      description: ""
    }
  ]);

  const { mutate: addProductMutate } = useAddProductsMutation<
    ProductDefaultValue[]
  >(graphqlReqeustClient(accessToken));

  const { mutate: addProductOptionMutate } = useAddProductOptionsMutation(
    graphqlReqeustClient(accessToken)
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<{ product: ProductDefaultValue[] }>({
    defaultValues: {
      product: [
        {
          imageUrl: "",
          name: "",
          price: 0,
          description: ""
        }
      ]
    }
  });

  const {
    register: optionRegister,
    control: optionControl,
    formState: { errors: optionErrors },
    setError: optionSetError,
    getValues: optionValue
  } = useForm<{ options: { name: string }[] }>({
    defaultValues: {
      options: [{ name: "기본" }]
    }
  });

  const {
    fields: optionsFields,
    append: optionsAppend,
    remove: optionsRemove
  } = useFieldArray({
    control: optionControl,
    name: "options"
  });

  const { fields } = useFieldArray({
    control,
    name: "product"
  });

  const handleModal = () => {
    setIsModal((pre) => !pre);
  };

  const onSubmit = handleSubmit((data) => {
    const options = optionValue("options");

    if (options.length === 0) {
      optionSetError("options", {
        message: "반드시 기본 옵션을 들어가야합니다."
      });
      return;
    }
    if (options.length !== 0 && optionErrors.options?.message) {
      optionSetError("options", { message: "" });
    }

    handleModal();
    setFormData(
      data.product.map((item) => ({
        imageUrl: item.imageUrl,
        storeId: Number(storeId),
        name: item.name,
        price: Number(item.price),
        description: item.description
      }))
    );
  });

  const cancelAddProductItems = () => {
    handleModal();
    setFormData([]);
  };

  const confirmAddProductItems = () => {
    addProductMutate(
      { products: formData },
      {
        onSuccess: (data) => {
          const addOptions = optionValue("options").map((value) => ({
            productId: data.addProducts[0],
            name: value.name
          }));

          addProductOptionMutate(
            { option: addOptions },
            {
              onSuccess: () => {
                queryClient.invalidateQueries("getProducts");
                navigate(
                  `/admin/${userId}/store/${storeId}/product/manage-product`
                );
              }
            }
          );
        }
      }
    );
  };

  return (
    <>
      {isModal && (
        <Modal strach={false}>
          <ModalChildren>
            <h2>상품을 등록 하시겠습니까?</h2>
            <p>상품을 등록하려면 아래 등록하기 버튼을 누르세요.</p>
            <ModalButtonContainer>
              <button
                className="modal-cancel-button"
                onClick={cancelAddProductItems}
              >
                돌아가기
              </button>
              <button
                className="modal-confirm-button"
                onClick={confirmAddProductItems}
              >
                등록하기
              </button>
            </ModalButtonContainer>
          </ModalChildren>
        </Modal>
      )}
      <CreateProductContainer>
        <CreateProductHeader>
          <h2>상품 등록</h2>
        </CreateProductHeader>
        <form onSubmit={onSubmit}>
          {fields.map((item, index) => (
            <fieldset key={item.id}>
              {/* {location && <Images src={location} />} */}
              <div className="product-input-container">
                <LabelDefault htmlFor="imageUploader">섬네일</LabelDefault>
                <AddimageUrlLabel htmlFor="imageUploader">
                  <IoIosAddCircle />
                </AddimageUrlLabel>
                <AddimageUrl
                  id="imageUploader"
                  type="file"
                  accept="image/*"
                  name="imageUrl"
                  placeholder="사진 찾기"
                />
                <AddimageUrl
                  id="imageUrl"
                  type="text"
                  {...register(`product.${index}.imageUrl`)}
                />
              </div>
              <div className="product-input-container">
                <LabelDefault htmlFor="name">상품 이름</LabelDefault>
                <InputDefault
                  id="name"
                  type="text"
                  placeholder="상품 이름을 입력해주세요."
                  {...register(`product.${index}.name`, {
                    required: "상품 이름은 꼭 입력해야해요"
                  })}
                />
              </div>
              {errors.product && <p>{errors.product[index]?.name?.message}</p>}
              <div className="product-input-container">
                <LabelDefault htmlFor="price">상품 가격</LabelDefault>
                <InputDefault
                  id="price"
                  type="number"
                  placeholder="상품 가격을 입력해주세요."
                  {...register(`product.${index}.price`, {
                    required: "상품의 가격은 꼭 입력해야해요"
                  })}
                />
              </div>
              {errors.product && <p>{errors.product[index]?.name?.message}</p>}
              <OptionsField>
                <div className="add-option-button-container">
                  <LabelDefault>상품 옵션</LabelDefault>
                  <button
                    type="button"
                    className="add-button"
                    onClick={() => optionsAppend({ name: "" })}
                  >
                    <IoIosAddCircle />
                    <span>옵션 추가</span>
                  </button>
                </div>
                {optionsFields.map((optionField, index) => (
                  <div className="option-input-container" key={optionField.id}>
                    <div className="option-label-button-container">
                      <LabelDefault htmlFor="option">
                        상품 옵션 {index + 1}
                      </LabelDefault>
                      <button
                        type="button"
                        onClick={() => optionsRemove(index)}
                      >
                        <IoIosRemoveCircle />
                        <span>삭제</span>
                      </button>
                    </div>
                    <InputDefault
                      id="option"
                      type="text"
                      placeholder="옵션의 이름을 입력해주세요"
                      {...optionRegister(`options.${index}.name`, {
                        value: optionField.name
                      })}
                    />
                  </div>
                ))}
                {optionErrors.options && <p>{optionErrors.options.message}</p>}
              </OptionsField>
              <div className="product-input-container">
                <LabelDefault htmlFor="infomation">상품 정보</LabelDefault>
                <TextareaDefault
                  id="description"
                  placeholder="상세 정보를 입력해주세요."
                  {...register(`product.${index}.description`)}
                />
              </div>
            </fieldset>
          ))}
        </form>
        <ButtonContainer>
          <h3>상품 입력이 끝나면 등록하기 버튼을 눌러주세요.</h3>
          <div>
            <CancelButton onClick={() => navigate(-1)}>등록 취소</CancelButton>
            <CreateButton onClick={onSubmit}>상품 등록</CreateButton>
          </div>
        </ButtonContainer>
      </CreateProductContainer>
    </>
  );
};

export default CreateProductPage;
