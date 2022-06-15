import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import InputDefault from "../../Components/Form/InputDefault";
import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";
import { Wrapper, Header, Title, Container } from "./Agreement";
import { SubTitle2, Body1 } from "../../mixin";
import { useNavigate } from "react-router-dom";
import LabelDefault from "../../Components/Form/LabelDefault";

const FormContainer = styled.form`
  height: inherit;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  width: 38rem;
  margin: 2rem auto;
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  p {
    ${Body1}
    line-height: 2;
  }
  span {
    font-size: 1.2rem;
  }
`;

const ErrorMessage = styled.p`
  ${Body1}
  color: ${(props) => props.theme.color.error500};
`;

const ActionButton = styled(ButtonDefaultStyle)<{ option?: string }>`
  margin-left: 5px;
  color: ${(props) => props.theme.color.fontColorWhite};
  background-color: ${(props) =>
    props.option === "confirm"
      ? props.theme.color.primary600
      : props.theme.color.gray300};
`;

interface ISignUpProps {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  storeNumber: number;
  storeName: string;
  address: string;
  phone: number;
}

const SignUp = () => {
  const navigate = useNavigate();

  // signup form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignUpProps>({ mode: "onSubmit" });

  const onSubmit = (data: ISignUpProps): void => {
    navigate("/admin/login");
  };

  // display store registration form
  const [checkStore, setCheckStore] = useState(true);
  const password = useRef({});
  password.current = watch("password", "");

  // goBack modal
  const handleGoBack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const confirm = window.confirm(
      "작성 내용이 취소됩니다. 정말 돌아가시겠습니까?"
    );
    if (confirm) navigate("/landing/agreement");
  };

  useEffect(() => {
    register("email");
    register("name");
    register("password");
  }, [register]);

  return (
    <Wrapper>
      <Header>
        <h1>누구나 키오스크</h1>
      </Header>
      <Container>
        <Title>사업체 가입</Title>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <SubContainer>
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
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
            <GroupForm>
              <SignUpInput
                id="name"
                name="name"
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
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              placeholder="비밀번호 확인"
              register={register}
              registerOptions={{
                validate: (value) =>
                  value === password.current || "비밀번호가 일치하지 않습니다.",
              }}
              required
            />
            <ErrorMessage>{errors.passwordConfirm?.message}</ErrorMessage>
          </SubContainer>

          <SubContainer>
            <GroupForm>
              <p>사업체 정보 입력</p>
              <div>
                <input
                  type="checkbox"
                  checked={!checkStore}
                  onChange={() => setCheckStore((prev) => !prev)}
                />
                <span>나중에 입력할게요</span>
              </div>
            </GroupForm>
            {checkStore && (
              <>
                <SignUpInput
                  placeholder="사업장번호"
                  id="storeNumber"
                  name="storeNumber"
                />
                <SignUpInput
                  placeholder="상호명"
                  id="storeName"
                  name="storeName"
                />

                <SignUpInput placeholder="주소" id="address" name="address" />
                <SignUpInput placeholder="전화번호" id="phone" name="phone" />
              </>
            )}
          </SubContainer>
          <GroupForm>
            <p>정보를 전부 입력하셨다면 가입하기 버튼을 눌러주세요.</p>
            <div>
              <ActionButton onClick={(e) => handleGoBack(e)}>
                돌아가기
              </ActionButton>
              <ActionButton type="submit" option="confirm">
                가입하기
              </ActionButton>
            </div>
          </GroupForm>
        </FormContainer>
      </Container>
    </Wrapper>
  );
};

export default SignUp;
