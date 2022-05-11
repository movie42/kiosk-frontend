import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import InputDefault from "../../Components/Form/InputDefault";
import Label from "../../Components/Form/LabelDefault";
import Textarea from "../../Components/Form/TextareaDefault";
import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";
import { IoIosAddCircle } from "react-icons/io";
import Modal from "../../Components/Modals/Modal";
import { usePost } from "../../utils/customHooks/usePost";

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

const AddThumbnail = styled(InputDefault)`
  display: none;
`;

const AddThumbnailLabel = styled(Label)`
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
  thumbnail: string;
  name: string;
  price: string;
  option: string;
  infomation: string;
}

const AdminManageProductAddItem = () => {
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [formData, setFormData] = useState<ProductDefaultValue[]>([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<{ product: ProductDefaultValue[] }>({
    defaultValues: {
      product: [
        {
          thumbnail: "",
          name: "",
          price: "",
          option: "",
          infomation: ""
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "product"
  });

  const handleModal = () => {
    setIsModal((pre) => !pre);
  };

  const onSubmit = handleSubmit((data) => {
    handleModal();
    setFormData(data.product);
  });

  const cancelAddProductItems = () => {
    handleModal();
    setFormData([]);
  };

  const confirmAddProductItems = () => {
    // mutation

    // if mutation success
    navigate(-1);

    // if mutation fail
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
                  thumbnail: "",
                  name: "",
                  price: "",
                  option: "",
                  infomation: ""
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
              <button onClick={() => remove(index)}>삭제</button>
              <div>
                <Label htmlFor="thumbnail">섬네일</Label>
                <AddThumbnailLabel htmlFor="thumbnail">
                  <IoIosAddCircle />
                </AddThumbnailLabel>
                <AddThumbnail
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  name="thumbnail"
                  placeholder="사진 찾기"
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
                    required: "상품 이름은 꼭 입력해야해요"
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
                    required: "상품의 가격은 꼭 입력해야해요"
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
            <CancelButton>등록 취소</CancelButton>
            <CreateButton onClick={onSubmit}>상품 등록</CreateButton>
          </div>
        </ButtonContainer>
      </Container>
    </>
  );
};

export default AdminManageProductAddItem;
