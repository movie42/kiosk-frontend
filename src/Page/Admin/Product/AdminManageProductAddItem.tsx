import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ReactS3Client from "react-aws-s3-typescript";
import { v1 } from "uuid";

import InputDefault from "../../../Components/Form/InputDefault";
import Label from "../../../Components/Form/LabelDefault";
import Textarea from "../../../Components/Form/TextareaDefault";
import ButtonDefaultStyle from "../../../Components/Buttons/ButtonDefault";
import { IoIosAddCircle } from "react-icons/io";
import Modal from "../../../Components/Modals/Modal";
import { usePost } from "../../../utils/customHooks/usePost";
import { InputMaybe, useAddProductsMutation } from "../../../generated/graphql";
import graphqlReqeustClient from "../../../lib/graphqlRequestClient";
import { useRecoilValue } from "recoil";
import { userState } from "../../../state/userState";
import { useQueryClient } from "react-query";
import Images from "../../../Components/Images/Images";

const Container = styled.div`
  margin-bottom: 8rem;
  form {
    fieldset {
      border: 1px solid ${(props) => props.theme.color.gray300};
      padding: 0.8rem;
      margin-bottom: 1rem;
      div {
        display: grid;
        grid-template-columns: 20% 80%;
        padding: 1rem 0;
        border-bottom: 1px solid ${(props) => props.theme.color.gray300};
        label {
          font-size: 2rem;
          align-self: center;
        }
        input {
          font-size: 2rem;
          border: 0;
          align-self: center;
        }
        textarea {
          border: 0;
          font-size: 2rem;
          align-self: center;
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

const AddProductButton = styled(ButtonDefaultStyle)`
  background-color: unset;
  color: ${(props) => props.theme.color.primary500};
  font-size: 2.3rem;
  padding: 0;
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
  padding: 0.8rem;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  color: ${(props) => props.theme.color.fontColorWhite};
  font-size: 2rem;
  background-color: ${(props) => props.theme.color.backgroundBlack100};
`;

const CreateButton = styled(ButtonDefaultStyle)`
  cursor: pointer;
  border: 0;
  font-size: 2rem;
  color: ${(props) => props.theme.color.fontColorWhite};
  border-radius: 0.3rem;
  line-height: 2.8rem;
  background-color: ${(props) => props.theme.color.primary600};
`;

const CancelButton = styled(ButtonDefaultStyle)`
  cursor: pointer;
  border: 0;
  font-size: 2rem;
  color: ${(props) => props.theme.color.fontColorWhite};
  border-radius: 0.3rem;
  line-height: 2.8rem;
  margin-right: 0.3rem;
`;

const ModalButtonContainer = styled.div`
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
  option?: string;
  description?: string;
}

interface ProductMutationValue extends ProductDefaultValue {
  storeId: number;
}

const AdminManageProductAddItem = () => {
  window.Buffer = window.Buffer || require("buffer").Buffer;
  const { storeId, userId } = useParams();
  const { accessToken, refreshToken } = useRecoilValue(userState);
  const [location, setLocation] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [formData, setFormData] = useState<ProductMutationValue[]>([
    {
      storeId: 0,
      imageUrl: "",
      name: "",
      price: 0,
      option: "",
      description: "",
    },
  ]);
  const { mutate } = useAddProductsMutation<ProductDefaultValue[]>(
    graphqlReqeustClient(accessToken),
  );
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setValue,
    getValues,
  } = useForm<{ product: ProductDefaultValue[] }>({
    defaultValues: {
      product: [
        {
          imageUrl: "",
          name: "",
          price: 0,
          option: "",
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
    mutate(
      { products: formData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("getProducts");
          navigate(`/admin/${userId}/store/${storeId}/product/manage-product`);
        },
      },
    );
  };

  const uploadFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const accessKeyId = process.env.REACT_APP_AWS_ID as string;
    const secretAccessKey = process.env.REACT_APP_AWS_KEY as string;
    const bucketName = process.env.REACT_APP_AWS_BUCKET as string;
    const region = process.env.REACT_APP_AWS_REGION as string;
    const s3Config = {
      bucketName,
      region,
      dirName: "products",
      accessKeyId,
      secretAccessKey,
    };

    const s3 = new ReactS3Client(s3Config);

    if (e.target.files) {
      const [file] = e.target.files;
      const filename = `${v1().toString().replace("-", "")}`;

      try {
        const response = await s3.uploadFile(file, filename);

        if (response.status >= 400) {
          throw new Error("사진을 업로드할 수 없습니다.");
        }

        if (location.length !== 0) {
          setLocation((value) => value.splice(index, 1, response.location));
          setValue(`product.${index}.imageUrl`, response.location);
          return;
        }

        setLocation((value) => [...value, response.location]);
        setValue(`product.${index}.imageUrl`, response.location);
      } catch (error) {
        const errorMessage = error as string;
        setError(`product.${index}.imageUrl`, {
          message: errorMessage,
        });
      }
    }
  };

  return (
    <>
      {isModal && (
        <Modal strach={false}>
          <>
            <h2>상품을 등록 하시겠습니까?</h2>
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
          </>
        </Modal>
      )}
      <Container>
        <CreateProductHeader>
          <h2>상품 등록</h2>
          <div>
            <p>등록할 상품을 추가하려면 오른쪽 버튼을 누르세요.</p>
            <AddProductButton
              onClick={() =>
                append({
                  imageUrl: "",
                  name: "",
                  price: 0,
                  option: "",
                  description: "",
                })
              }
            >
              <IoIosAddCircle />
            </AddProductButton>
          </div>
        </CreateProductHeader>
        <form onSubmit={onSubmit}>
          {fields.map((item, index) => (
            <fieldset key={item.id}>
              <button
                onClick={() => {
                  setLocation((value) => value.splice(index, 1));
                  remove(index);
                }}
              >
                삭제
              </button>
              {location[index] && <Images src={location[index]} />}
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
                  onChange={(e) => uploadFile(e, index)}
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
                  placeholder="상품 옵션을 입력해주세요. 옵션은 반드시 ,로 구분해주세요."
                  name="option"
                  register={register}
                  fieldName={`product.${index}`}
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
