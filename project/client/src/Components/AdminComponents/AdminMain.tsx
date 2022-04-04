import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { clear } from "console";

const Wrapper = styled.div`
  height: 80vh;
  overflow: hidden;
`;

const Title = styled.h2`
  padding: 1.5rem 0;
  font-size: 3rem;
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
    div.container {
      margin-bottom: 1.2rem;
      div.inputContainer {
        padding: 0.6rem;
        border-bottom: 1px solid ${(props) => props.theme.netural};
        width: 100%;
      }
      &:last-child {
        border: unset;
      }
      &:first-child {
        input {
          margin-left: 2.5rem;
        }
      }
      label.inputLabel {
        font-weight: bold;
        width: 30%;
        font-size: 2rem;
      }
      input {
        width: 70%;
        margin-left: 1rem;
        outline: none;
        font-size: 2rem;
        border: 0;
      }
    }
  }
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
    color: ${(props) => props.theme.white};
    border-radius: 0.3rem;
    line-height: 2.8rem;
    background-color: ${(props) => props.theme.success};
  }
`;
const ErrorMessage = styled.div`
  margin-top: 0.6rem;
  align-self: baseline;
  label {
    font-size: 1.2rem;
    text-align: left;
    color: ${(props) => props.theme["warning-dark"]};
    font-weight: 500;
  }
`;

interface IUserProps {
  email: string;
  password: string;
  loginFail: string;
}

const user = {
  email: "admin@google.com",
  password: "123qwe!@",
};

const AdminMain = () => {
  const [isLogin, setLogin] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IUserProps>();

  const onSubmit = handleSubmit(async (data: IUserProps) => {
    if (data.email !== user.email) {
      setError("loginFail", { message: "이메일 또는 비밀번호가 다릅니다." });
      return;
    }

    if (data.password !== user.password) {
      setError("loginFail", { message: "이메일 또는 비밀번호가 다릅니다." });
      return;
    }

    setError("loginFail", { message: "" });
    setLogin(true);
    setLoading(true);
  });

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    let loading = setTimeout(() => navigate("/admin/1/menu"), 3000);

    return () => clearTimeout(loading);
  }, [isLoading]);

  return !isLogin ? (
    <Wrapper>
      <Title>관리자 로그인 화면</Title>
      <FormContainer>
        <form onSubmit={onSubmit}>
          <div className="container">
            <div className="inputContainer">
              <label className="inputLabel" htmlFor="email">
                아이디
              </label>
              <input
                id="email"
                type="text"
                placeholder="아이디를 입력해주세요"
                {...register("email", {
                  required: "아이디를 입력해주세요.",
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "이메일이 아닙니다.",
                  },
                })}
              />
            </div>
            {errors?.email && (
              <ErrorMessage>
                <label>{errors?.email?.message}</label>
              </ErrorMessage>
            )}
          </div>

          <div className="container">
            <div className="inputContainer">
              <label className="inputLabel" htmlFor="password">
                비밀번호
              </label>
              <input
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                })}
                id="password"
                type="password"
              />
            </div>
            {errors?.password && (
              <ErrorMessage>
                <label>{errors?.password?.message}</label>
              </ErrorMessage>
            )}
          </div>
          {
            <ErrorMessage>
              <label>{errors?.loginFail?.message}</label>
            </ErrorMessage>
          }
          <ActionContainer>
            <Link to="#">아이디 또는 비밀번호를 잃어버리셨나요?</Link>
            <button onClick={onSubmit}>로그인</button>
          </ActionContainer>
        </form>
      </FormContainer>
    </Wrapper>
  ) : (
    <h1>로그인 중입니다.</h1>
  );
};

export default AdminMain;
