import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import styled from "styled-components";
import InputDefault from "../../../Components/Form/InputDefault";
import Label from "../../../Components/Form/LabelDefault";

import { Headline2, SubTitle1, SubTitle2 } from "../../../mixin";
import { useRecoilState } from "recoil";
import { userState } from "../../../state/userState";
import { useLoginMutation } from "../../../generated/graphql";
import graphqlReqeustClient from "../../../lib/graphqlRequestClient";
import { handleErrorMessage } from "../../../utils/helper/handleErrorMessage";
import { useQueryClient } from "react-query";
import AdminLoadingAndGetUser from "./AdminLoadingAndGetUser";

const Wrapper = styled.div`
  height: 80vh;
  overflow: hidden;
`;

const Title = styled.h2`
  ${Headline2};
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 50vh;
  width: 38rem;
  margin: 0 auto;
  form {
    height: inherit;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    label.error-label {
      font-size: 1.8rem;
      color: ${(props) => props.theme.color.error700};
    }
  }
`;

const LoginLabel = styled(Label)`
  ${SubTitle2}
`;

const LoginInput = styled(InputDefault)`
  ${SubTitle1}
  border:0;
  outline: unset;
`;

const ActionContainer = styled.div`
  display: flex;
  width: inherit;
  justify-content: space-between;
  align-items: center;
  a {
    font-size: 1.5rem;
  }
  button {
    cursor: pointer;
    padding: 0.7rem 2rem;
    border: 0;
    font-size: 2.8rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    border-radius: 0.3rem;
    line-height: 2.8rem;
    background-color: ${(props) => props.theme.color.primary600};
  }
`;

interface IUserProps {
  email: string;
  password: string;
  loginFail: string;
}

export interface ErrorState {
  response: {
    errors: [
      {
        message: string;
        extensions: {
          code: string;
          exception: {
            response: {
              error: string;
            };
            status: number;
            message: string;
            name: string;
          };
        };
      },
    ];
    data: null;
    status: number;
  };
}

const AdminMain = () => {
  const queryClient = useQueryClient();
  const [isUser, setIsUser] = useRecoilState(userState);
  const [errorState, setErrorState] = useState<ErrorState>();

  const { mutate } = useLoginMutation<Error>(graphqlReqeustClient(), {
    onSuccess: (data) => {
      const {
        login: { accessToken, refreshToken },
      } = data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setIsUser((pre) => ({
        ...pre,
        isLogin: true,
        accessToken,
        refreshToken,
      }));
      queryClient.invalidateQueries("me");
    },
    onError: (error) => {
      handleErrorMessage(error, setErrorState);
      /**
       * TODO:
       * 에러 메시지가 일관되지 않아 처리에 어려움이 있다.
       * 백앤드 개발자에게 에러 메시지를 보낼때 message에 실어 보낼 수 있도록 요청하기.
       */
      if (errorState) {
        console.log(errorState);
        const [message] = errorState?.response.errors;
        const error = message.extensions.exception.response.error;
        setError("loginFail", { message: error });
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IUserProps>();

  const onSubmit = handleSubmit(async (data: IUserProps) => {
    mutate({ ...data });
  });

  return !isUser.isLogin ? (
    <Wrapper>
      <Title>관리자 로그인 화면</Title>
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
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "이메일이 아닙니다.",
              },
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
              required: "비밀번호를 입력해주세요.",
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
