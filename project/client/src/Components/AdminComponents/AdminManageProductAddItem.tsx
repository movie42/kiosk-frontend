import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AdminInput from "./AdminInput";
import AdminTextArea from "./AdminTextArea";

const Container = styled.div`
  button.add-product-button {
    cursor: pointer;
    padding: 0.7rem 2rem;
    border: 0;
    font-size: 2rem;
    color: ${(props) => props.theme.white};
    border-radius: 0.3rem;
    line-height: 2.8rem;
    background-color: ${(props) => props.theme.success};
  }
  button.cancel-product-button {
    cursor: pointer;
    padding: 0.7rem 2rem;
    border: 0;
    font-size: 2rem;
    color: ${(props) => props.theme.white};
    border-radius: 0.3rem;
    line-height: 2.8rem;
    background-color: ${(props) => props.theme.success};
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
        <AdminInput
          label={{ htmlFor: "productThumbnail" }}
          labelText="상품 대표 이미지"
          input={{ name: "productThumbnail", type: "file", accept: "image/*" }}
          register={register}
          error={errors.productThumbnail?.message}
        />
        <AdminInput
          label={{ htmlFor: "productName" }}
          labelText="상품 이름"
          input={{ name: "productName", type: "text" }}
          register={register}
          registerOptions={{
            required: "상품 이름은 꼭 입력해야해요",
          }}
          error={errors.productName?.message}
        />
        <AdminInput
          label={{ htmlFor: "productPrice" }}
          labelText="상품 가격"
          input={{ name: "productPrice", type: "number" }}
          register={register}
          registerOptions={{ required: "상품의 가격은 꼭 입력해야해요" }}
          error={errors.productPrice?.message}
        />
        <AdminTextArea
          label={{ htmlFor: "productInfomation" }}
          labelText="상품 가격"
          textarea={{ name: "productInfomation", id: "productInfomation" }}
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
