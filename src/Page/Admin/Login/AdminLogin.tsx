import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { LabelDefault, PageHeader } from "@/Components";
import { EMAIL_REX } from "@/lib/constant/constant";
import { userState } from "@/lib/state/userState";

import AdminLoadingAndGetUser from "./AdminLoadingAndGetUser";
import {
  ActionContainer,
  FormContainer,
  LoginInput,
  LoginLabel,
  Wrapper
} from "./styles";
import { useLogin } from "../hooks";
import { useRecoilValue } from "recoil";
import { IUserProps } from "../interface";

const AdminMain = () => {
  const { mutate } = useLogin();
  const isUser = useRecoilValue(userState);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUserProps>();

  const onSubmit = handleSubmit((data: IUserProps) => {
    mutate({ ...data });
  });

  return !isUser.isLogin ? (
    <Wrapper>
      <PageHeader header="로그인" />
      <FormContainer>
        <form onSubmit={onSubmit}>
          <LoginLabel htmlFor="email">이메일</LoginLabel>
          <LoginInput
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요."
            {...register("email", {
              required: "이메일을 입력하세요",
              pattern: {
                value: EMAIL_REX,
                message: "이메일이 아닙니다."
              }
            })}
          />
          <LoginLabel htmlFor="password">비밀번호</LoginLabel>
          <LoginInput
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            {...register("password", {
              required: "비밀번호를 입력해주세요."
            })}
          />
          {errors?.loginFail?.message && (
            <LabelDefault className="error-label">
              {errors?.loginFail?.message}
            </LabelDefault>
          )}
          <ActionContainer>
            <Link to="#">아이디 또는 비밀번호를 잃어버리셨나요?</Link>
            <button>로그인</button>
          </ActionContainer>
        </form>
      </FormContainer>
    </Wrapper>
  ) : (
    <AdminLoadingAndGetUser />
  );
};

export default AdminMain;
