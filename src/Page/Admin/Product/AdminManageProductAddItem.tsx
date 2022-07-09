import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import InputDefault from "../../../Components/Form/InputDefault";
import Label from "../../../Components/Form/LabelDefault";
import Textarea from "../../../Components/Form/TextareaDefault";
import ButtonDefaultStyle from "../../../Components/Buttons/ButtonDefault";
import { IoIosAddCircle } from "react-icons/io";
import Modal from "../../../Components/Modals/Modal";
import {
  useAddProductOptionsMutation,
  useAddProductsMutation,
} from "../../../generated/graphql";
import graphqlReqeustClient from "../../../lib/graphqlRequestClient";
import { useRecoilValue } from "recoil";
import { userState } from "../../../state/userState";
import { useQueryClient } from "react-query";
import Images from "../../../Components/Images/Images";
import useImageUpload from "../../../utils/customHooks/useImageUpload";
import { Option } from "../../../state/productItemState";

const Container = styled.div`
  margin-bottom: 8rem;
  form {
    fieldset {
      padding: 0.8rem;
      margin-bottom: 1rem;
      div {
        display: grid;
        grid-template-columns: 20% 80%;
        padding: 1rem 0;
        &:not(:last-child) {
          border-bottom: 1px solid ${(props) => props.theme.color.gray300};
        }
        label {
          font-size: 2rem;
          align-self: center;
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
  const { accessToken, refreshToken } = useRecoilValue(userState);
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
      description: "",
    },
  ]);

  const [options, setOptions] = useState("");
  const { mutate: addProductMutate } = useAddProductsMutation<
    ProductDefaultValue[]
  >(graphqlReqeustClient(accessToken));

  const { mutate: addProductOptionMutate } = useAddProductOptionsMutation(
    graphqlReqeustClient(accessToken),
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setValue,
  } = useForm<{ product: ProductDefaultValue[] }>({
    defaultValues: {
      product: [
        {
          imageUrl: "",
          name: "",
          price: 0,
          description: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "product",
  });

  const handleModal = () => {
    setIsModal((pre) => !pre);
  };

  const onSubmit = handleSubmit((data) => {
    handleModal();
    setFormData(
      data.product.map((item) => ({
        imageUrl: item.imageUrl,
        storeId: Number(storeId),
        name: item.name,
        price: Number(item.price),
        description: item.description,
      })),
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
          if (!options) {
            queryClient.invalidateQueries("getProducts");
            navigate(
              `/admin/${userId}/store/${storeId}/product/manage-product`,
            );
            return;
          }

          const addOptions = options.split(",").map((value) => ({
            productId: data.addProducts[0],
            name: value,
          }));
          addProductOptionMutate(
            { option: addOptions },
            {
              onSuccess: () => {
                queryClient.invalidateQueries("getProducts");
                navigate(
                  `/admin/${userId}/store/${storeId}/product/manage-product`,
                );
              },
            },
          );
        },
      },
    );
  };

  useEffect(() => {
    if (location) {
      setValue(`product.0.imageUrl`, location);
    }
  }, [location]);

  useEffect(() => {
    if (error) {
      setError(`product.0.imageUrl`, {
        message: error,
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
              <div>
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
                  name="imageUrl"
                  register={register}
                  fieldName={`product.${index}`}
                />
              </div>

              <div>
                <Label htmlFor="name">상품 이름</Label>
                <InputDefault
                  id="name"
                  type="text"
                  placeholder="상품 이름을 입력해주세요."
                  name="name"
                  register={register}
                  fieldName={`product.${index}`}
                  registerOptions={{
                    required: "상품 이름은 꼭 입력해야해요",
                  }}
                />
              </div>
              <div>
                <Label htmlFor="price">상품 가격</Label>
                <InputDefault
                  id="price"
                  type="number"
                  placeholder="상품 가격을 입력해주세요."
                  name="price"
                  register={register}
                  fieldName={`product.${index}`}
                  registerOptions={{
                    required: "상품의 가격은 꼭 입력해야해요",
                  }}
                />
              </div>
              <div>
                <Label htmlFor="option">상품 옵션</Label>
                <InputDefault
                  id="option"
                  type="text"
                  placeholder="옵션은 반드시 ,로 구분해주세요."
                  name="option"
                  value={options}
                  onChange={(e) => setOptions(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="infomation">상품 정보</Label>
                <Textarea
                  id="infomation"
                  placeholder="상세 정보를 입력해주세요."
                  name="infomation"
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
