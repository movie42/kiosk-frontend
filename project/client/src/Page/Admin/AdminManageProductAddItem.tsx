import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";

import InputDefault from "../../Components/Form/InputDefault";
import Label from "../../Components/Form/LabelDefault";
import Textarea from "../../Components/Form/TextareaDefault";

const Container = styled.div`
  button.add-product-button {
    cursor: pointer;
    padding: 0.7rem 2rem;
    border: 0;
    font-size: 2rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    border-radius: 0.3rem;
    line-height: 2.8rem;
    background-color: ${(props) => props.theme.color.primary600};
  }
  button.cancel-product-button {
    cursor: pointer;
    padding: 0.7rem 2rem;
    border: 0;
    font-size: 2rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    border-radius: 0.3rem;
    line-height: 2.8rem;
    background-color: ${(props) => props.theme.color.primary600};
  }
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
      <form onSubmit={onSubmit}>
        <Label htmlFor="productThumbnail" text="섬네일" />
        <InputDefault
          id="productThumbnail"
          type="file"
          accept="image/*"
          name="productThumbnail"
          register={register}
          error={errors.productThumbnail?.message}
        />
        <Label htmlFor="productName" text="상품 이름" />
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
        <Label htmlFor="productPrice" text="상품 가격" />
        <InputDefault
          id="productPrice"
          typeof="number"
          placeholder="상품 가격을 입력해주세요."
          name="productPrice"
          register={register}
          registerOptions={{ required: "상품의 가격은 꼭 입력해야해요" }}
          error={errors.productPrice?.message}
        />
        <Label htmlFor="productInfomation" text="상품 정보" />
        <Textarea
          id="productInfomation"
          placeholder="상세 정보를 입력해주세요."
          name="productInfomation"
          register={register}
          error={errors.productInfomation?.message}
        />
        <Link to="/admin/:id/manage-product">등록 취소</Link>
        <button>상품 등록</button>
      </form>
    </Container>
  );
};

export default AdminManageProductAddItem;
