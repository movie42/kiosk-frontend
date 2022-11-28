import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Wrapper,
  Header,
  Title,
  Container,
  ButtonGroup,
  GroupForm,
  SignUpInput,
  ErrorMessage,
  ActionButton,
  FormContainer,
  SubContainer
} from "./styles";
import { EMAIL_REX } from "@/lib/constant/constant";
import { SignUpProps } from "../interface";
import useAddStore from "./hooks/useAddStore";
import useSubmit from "./hooks/useSubmit";
import useHandleGoBack from "./hooks/useHandleGoBack";

const SignUpPage = () => {
  const [checkStore, setCheckStore] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<SignUpProps>({ mode: "onSubmit" });

  const password = useRef({});
  password.current = watch("password", "");

  const { mutateStore } = useAddStore();
  const { onSubmit, saveStore, storeInfo } = useSubmit({ checkStore });
  const { handleGoBack } = useHandleGoBack();

  useEffect(() => {
    if (checkStore && saveStore && storeInfo) {
      mutateStore({ ...storeInfo });
    }
  }, [saveStore, checkStore, storeInfo, mutateStore]);

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
              placeholder="이메일"
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: EMAIL_REX,
                  message: "이메일이 아닙니다."
                }
              })}
            />
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
            <GroupForm>
              <SignUpInput
                id="name"
                placeholder="이름"
                {...register("name", {
                  required: "비밀번호를 입력해주세요."
                })}
              />
            </GroupForm>

            <SignUpInput
              id="password"
              type="password"
              placeholder="비밀번호"
              {...register("password", {
                required: "비밀번호를 입력해주세요."
              })}
            />
            <SignUpInput
              id="passwordConfirm"
              type="password"
              placeholder="비밀번호 확인"
              {...register("passwordConfirm", {
                required: "앞에서 입력한 비밀번호를 입력해주세요.",
                validate: (value) =>
                  value === password.current || "비밀번호가 일치하지 않습니다."
              })}
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
                  id="code"
                  {...register("code", {
                    required: checkStore
                  })}
                />
                <SignUpInput
                  placeholder="상호명"
                  id="storeName"
                  {...register("storeName", {
                    required: checkStore
                  })}
                />
                <SignUpInput
                  placeholder="전화번호"
                  id="phone"
                  {...register("phone", {
                    required: checkStore
                  })}
                />
                <SignUpInput
                  placeholder="주소"
                  id="address"
                  {...register("address", {
                    required: checkStore
                  })}
                />
              </>
            )}
          </SubContainer>
          <ButtonGroup>
            <span>정보를 전부 입력하셨다면 가입하기 버튼을 눌러주세요.</span>
            <div>
              <ActionButton onClick={(e) => handleGoBack(e)}>
                돌아가기
              </ActionButton>
              <ActionButton type="submit" option="confirm">
                가입하기
              </ActionButton>
            </div>
          </ButtonGroup>
        </FormContainer>
      </Container>
    </Wrapper>
  );
};

export default SignUpPage;
