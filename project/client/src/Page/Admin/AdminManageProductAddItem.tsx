import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";

import InputDefault from "../../Components/Form/InputDefault";
import Label from "../../Components/Form/LabelDefault";
import Textarea from "../../Components/Form/TextareaDefault";
import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";
import { IoIosAddCircle } from "react-icons/io";

const Container = styled.div`
  form {
    border: 1px solid ${(props) => props.theme.color.gray300};
    padding: 0.8rem;
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

const AdminManageProductAddItem = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Container>
      <CreateProductHeader>
        <h2>상품 등록</h2>
        <div>
          <p>등록할 상품을 추가하려면 오른쪽 버튼을 누르세요.</p>
          <AddProductButton>
            <IoIosAddCircle />
          </AddProductButton>
        </div>
      </CreateProductHeader>
      <form onSubmit={onSubmit}>
        <div>
          <Label htmlFor="productThumbnail">섬네일</Label>
          <AddThumbnailLabel htmlFor="productThumbnail">
            <IoIosAddCircle />
          </AddThumbnailLabel>
          <AddThumbnail
            id="productThumbnail"
            type="file"
            accept="image/*"
            name="productThumbnail"
            placeholder="사진 찾기"
            register={register}
            error={errors.productThumbnail?.message}
          />
        </div>
        <div>
          <Label htmlFor="productName">상품 이름</Label>
          <InputDefault
            id="productName"
            type="text"
            placeholder="상품 이름을 입력해주세요."
            name="productName"
            register={register}
            registerOptions={{
              required: "상품 이름은 꼭 입력해야해요",
            }}
            error={errors.productName?.message}
          />
        </div>
        <div>
          <Label htmlFor="productPrice">상품 가격</Label>
          <InputDefault
            id="productPrice"
            typeof="number"
            placeholder="상품 가격을 입력해주세요."
            name="productPrice"
            register={register}
            registerOptions={{ required: "상품의 가격은 꼭 입력해야해요" }}
            error={errors.productPrice?.message}
          />
        </div>
        <div>
          <Label htmlFor="productInfomation">상품 정보</Label>
          <Textarea
            id="productInfomation"
            placeholder="상세 정보를 입력해주세요."
            name="productInfomation"
            register={register}
            error={errors.productInfomation?.message}
          />
        </div>
      </form>
      <ButtonContainer>
        <h3>상품 입력이 끝나면 등록하기 버튼을 눌러주세요.</h3>
        <div>
          <CancelButton>등록 취소</CancelButton>
          <CreateButton>상품 등록</CreateButton>
        </div>
      </ButtonContainer>
    </Container>
  );
};

export default AdminManageProductAddItem;
