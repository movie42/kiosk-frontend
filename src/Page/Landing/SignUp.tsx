import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import InputDefault from "../../Components/Form/InputDefault";
import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";
import { Wrapper, Header, Title, Container } from "./Agreement";
import { SubTitle2, Body1 } from "../../mixin";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 38rem;
  margin: 0 auto;
  form {
    height: inherit;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }
`;

const SignUpInput = styled(InputDefault)`
  ${SubTitle2}
  width: 100%;
  outline: 0;
  border-right: 0;
  border-top: 0;
  border-left: 0;
  border-bottom: 2px solid black;
  margin-bottom: 1rem;
  :focus {
    outline: 0;
  }
`;

const GroupForm = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StoreForm = styled.div`
  margin-top: 3rem;
  display: flex;
  p {
    ${Body1}
  }
`;

interface ISignUpProps {
  email: string;
  lastName: string;
  firstName: string;
  password: string;
  passwordConfirm: string;
  storeNumber: number;
  ownerLastName: string;
  ownerFirstName: string;
  ownerPassword: string;
  ownerPasswordConfirm: string;
}

const SignUp = () => {
  // signup form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpProps>();

  const onSubmit = (data: ISignUpProps): void => {
    console.log(data);
  };

  // display store registration form
  const [checkStore, setCheckStore] = useState(true);

  return (
    <Wrapper>
      <Header>
        <h1>누구나 키오스크</h1>
      </Header>
      <Container>
        <Title>사업체 가입</Title>
        <FormContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SignUpInput
              id="email"
              name="email"
              placeholder="이메일"
              register={register}
              registerOptions={{
                required: "이메일을 입력해주세요.",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "이메일이 아닙니다.",
                },
              }}
            />
            <div>{errors.email?.message}</div>
            <GroupForm>
              <SignUpInput
                id="lastName"
                name="lastName"
                placeholder="성"
                register={register}
                required
              />

              <SignUpInput
                id="firstName"
                name="firstName"
                placeholder="이름"
                register={register}
                required
              />
            </GroupForm>

            <SignUpInput
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호"
              register={register}
              required
            />

            <SignUpInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="비밀번호 확인"
              register={register}
              required
            />
            <StoreForm>
              <p>사업체 정보 입력</p>
              <GroupForm>
                <input
                  type="checkbox"
                  checked={!checkStore}
                  onChange={() => setCheckStore((prev) => !prev)}
                />
                <span>나중에 입력할게요</span>
              </GroupForm>
            </StoreForm>
            {checkStore && (
              <>
                <SignUpInput
                  placeholder="상호"
                  id="storeNumber"
                  name="storeNumber"
                />
                <GroupForm>
                  <SignUpInput
                    placeholder="성"
                    id="ownerLastName"
                    name="ownerLastName"
                  />

                  <SignUpInput
                    placeholder="이름"
                    id="ownerFirstName"
                    name="ownerFirstName"
                  />
                </GroupForm>
                <SignUpInput
                  placeholder="비밀번호"
                  id="ownerPassword"
                  name="ownerPassword"
                />

                <SignUpInput
                  placeholder="비밀번호확인"
                  id="ownerConfirmPassword"
                  name="ownerConfirmPassword"
                />
              </>
            )}
            <input type="submit" value="가입하기" />
          </form>
        </FormContainer>
      </Container>
    </Wrapper>
  );
};

export default SignUp;
