import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import Label from "../../../Components/Form/LabelDefault";
import PageHeaderMessage from "../../../Components/PageHeader";

import { EMAIL_REX } from "../../../lib/constant/constant";
import { userState } from "../../../lib/state/userState";

import AdminLoadingAndGetUser from "./AdminLoadingAndGetUser";
import { IUserProps } from "./interface";
import {
  ActionContainer,
  FormContainer,
  LoginInput,
  LoginLabel,
  Wrapper
} from "./styles";
import { useLogin } from "./hooks";
import { useRecoilValue } from "recoil";

const AdminMain = () => {
  const { mutate } = useLogin();
  const isUser = useRecoilValue(userState);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUserProps>();

  const onSubmit = handleSubmit(async (data: IUserProps) => {
    mutate({ ...data });
  });

  return !isUser.isLogin ? (
    <Wrapper>
      <PageHeaderMessage header="로그인" />
      <FormContainer>
        <form onSubmit={onSubmit}>
          <LoginLabel htmlFor="email">이메일</LoginLabel>
          <LoginInput
            id="email"
            name="email"
            placeholder="이메일을 입력해주세요."
            type="email"
            register={register}
            registerOptions={{
              required: "아이디를 입력해주세요.",
              pattern: {
                value: EMAIL_REX,
                message: "이메일이 아닙니다."
              }
            }}
            error={errors.email?.message}
          />
          <LoginLabel htmlFor="password">비밀번호</LoginLabel>
          <LoginInput
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            typeof="password"
            register={register}
            registerOptions={{
              required: "비밀번호를 입력해주세요."
            }}
            error={errors.password?.message}
          />
          {errors?.loginFail?.message && (
            <Label className="error-label">{errors?.loginFail?.message}</Label>
          )}
          <ActionContainer>
            <Link to="#">아이디 또는 비밀번호를 잃어버리셨나요?</Link>
            <button onClick={onSubmit}>로그인</button>
          </ActionContainer>
        </form>
      </FormContainer>
    </Wrapper>
  ) : (
    <AdminLoadingAndGetUser />
  );
};

export default AdminMain;
