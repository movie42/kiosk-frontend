import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import InputDefault from "../../../Components/Form/InputDefault";
import Label from "../../../Components/Form/LabelDefault";
import Textarea from "../../../Components/Form/TextareaDefault";
import ButtonDefaultStyle from "../../../Components/Buttons/ButtonDefault";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import Modal from "../../../Components/Modals/Modal";
import {
  useAddProductOptionsMutation,
  useAddProductsMutation
} from "../../../lib/generated/graphql";
import graphqlReqeustClient from "../../../lib/graphqlRequestClient";
import { useRecoilValue } from "recoil";
import { userState } from "../../../lib/state/userState";
import { useQueryClient } from "react-query";
import Images from "../../../Components/Images/Images";
import useImageUpload from "../../../lib/utils/customHooks/useImageUpload";

const Container = styled.div`
  margin-bottom: 8rem;
  form {
    fieldset {
      padding: 0.8rem;
      margin-bottom: 1rem;
      .product-input-container {
        display: grid;
        grid-template-columns: 20% 80%;
        padding: 1rem 0;
        &:not(:last-child) {
          border-bottom: 1px solid ${(props) => props.theme.color.gray300};
        }
        label {
          font-size: 2rem;
          align-self: center;
          font-weight: 700;
          align-self: flex-start;
        }
        input {
          font-size: 2rem;
          border: 0;
          align-self: center;
          outline: none;
        }
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        textarea {
          border: 0;
          font-size: 2rem;
          align-self: center;
          resize: none;
          height: 40vh;
          outline: none;
          &::placeholder {
            font-size: 2rem;
          }
        }
      }
    }
  }
  ${({ theme }) => theme.device.mobile} {
    form {
      fieldset {
        .product-input-container {
          label {
            font-size: 1.6rem;
          }
          input {
            font-size: 1.6rem;
          }
        }
      }
    }
  }
`;

const CreateProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  h2 {
    margin: 1rem 0;
    font-size: 2.3rem;
    font-weight: 900;
  }
  div {
    display: flex;
    align-items: center;
    p {
      font-size: 1.8rem;
      color: ${(props) => props.theme.color.gray400};
    }
  }
`;

const AddimageUrl = styled(InputDefault)`
  display: none;
`;

const AddimageUrlLabel = styled(Label)`
  cursor: pointer;
  color: ${(props) => props.theme.color.primary700};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.8rem;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  color: ${(props) => props.theme.color.fontColorBlack};
  font-size: 2rem;
  border-top: 1px solid ${(props) => props.theme.color.gray300};
  button {
    cursor: pointer;
    border: 0;
    font-size: 2rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    border-radius: 0.3rem;
    line-height: 2.8rem;
  }
  ${({ theme }) => theme.device.mobile} {
    justify-content: center;
  }
`;

const CreateButton = styled(ButtonDefaultStyle)`
  background-color: ${(props) => props.theme.color.primary600};
`;

const CancelButton = styled(ButtonDefaultStyle)`
  color: ${(props) => props.theme.color.fontColorWhite};
  margin-right: 0.3rem;
`;

const ModalChildren = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionsField = styled.div`
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
      font-size: 2rem;
      align-self: center;
      font-weight: 700;
    }
    input {
      font-size: 2rem;
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
        font-size: 2rem;
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

const ModalButtonContainer = styled.div`
  display: flex;
  align-self: flex-end;
  button {
    cursor: pointer;
    font-size: 2rem;
    border: 0;
    padding: 0.8rem 1.3rem;
    border-radius: 0.5rem;
    color: ${(props) => props.theme.color.fontColorWhite};

    &.modal-cancel-button {
      background-color: ${(props) => props.theme.color.gray200};
    }

    &.modal-confirm-button {
      background-color: ${(props) => props.theme.color.primary600};
    }

    &:not(:first-child) {
      margin-left: 0.8rem;
    }
  }
`;

interface ProductDefaultValue {
  imageUrl?: string;
  name: string;
  price: number;
  description?: string;
}

interface ProductMutationValue extends ProductDefaultValue {
  storeId: number;
}

const AdminManageProductAddItem = () => {
  const { storeId, userId } = useParams();
  const { accessToken } = useRecoilValue(userState);
  const { error, location, uploadFile } = useImageUpload();

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
    formState: { errors },
    setError,
    setValue
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

  useEffect(() => {
    if (location) {
      setValue("product.0.imageUrl", location);
    }
  }, [location]);

  useEffect(() => {
    if (error) {
      setError("product.0.imageUrl", {
        message: error
      });
    }
  }, [error]);

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
      <Container>
        <CreateProductHeader>
          <h2>상품 등록</h2>
        </CreateProductHeader>
        <form onSubmit={onSubmit}>
          {fields.map((item, index) => (
            <fieldset key={item.id}>
              {location && <Images src={location} />}
              <div className="product-input-container">
                <Label htmlFor="imageUploader">섬네일</Label>
                <AddimageUrlLabel htmlFor="imageUploader">
                  <IoIosAddCircle />
                </AddimageUrlLabel>
                <AddimageUrl
                  id="imageUploader"
                  type="file"
                  accept="image/*"
                  name="imageUrl"
                  placeholder="사진 찾기"
                  onChange={uploadFile}
                />
                <AddimageUrl
                  id="imageUrl"
                  type="text"
                  {...register(`product.${index}.imageUrl`)}
                />
              </div>
              <div className="product-input-container">
                <Label htmlFor="name">상품 이름</Label>
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
                <Label htmlFor="price">상품 가격</Label>
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
                  <Label>상품 옵션</Label>
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
                      <Label htmlFor="option">상품 옵션 {index + 1}</Label>
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
                <Label htmlFor="infomation">상품 정보</Label>
                <Textarea
                  id="description"
                  placeholder="상세 정보를 입력해주세요."
                  name="description"
                  register={register}
                  fieldName={`product.${index}`}
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
      </Container>
    </>
  );
};

export default AdminManageProductAddItem;
