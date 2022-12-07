import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useRecoilValue } from "recoil";

import { Form } from "@/Components/UI/Atoms";
import { AdminLoadingAndGetUser } from "@/Components/UI/Molecules";
import { PageHeader } from "@/Components/UI/Organisms";
import { EMAIL_REX } from "@/lib/constant/constant";
import { userState } from "@/lib/state/userState";
import { useLogin } from "../hooks";
import { FormContainer, Wrapper } from "./styles";
import { IUserProps } from "../interface";

const Login = () => {
  const method = useForm<IUserProps>();
  const isUser = useRecoilValue(userState);

  return !isUser.isLogin ? (
    <Wrapper>
      <PageHeader header="로그인" />
      <FormContainer>
        <FormProvider {...method}>
          <LoginFormContainer />
        </FormProvider>
      </FormContainer>
    </Wrapper>
  ) : (
    <AdminLoadingAndGetUser />
  );
};

export default Login;

const LoginFormContainer = () => {
  const { mutate } = useLogin();

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useFormContext<IUserProps>();

  const handleLoginForm = handleSubmit((data: IUserProps) => {
    mutate(data);
  });

  return (
    <Form onSubmit={handleLoginForm}>
      <Form.FormItemContainer>
        <Form.Label htmlFor="email">이메일</Form.Label>
        <Form.Input
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
      </Form.FormItemContainer>
      {errors.email && <Form.Label>{errors.email.message}</Form.Label>}
      <Form.FormItemContainer>
        <Form.Label htmlFor="password">비밀번호</Form.Label>
        <Form.Input
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          {...register("password", {
            required: "비밀번호를 입력해주세요."
          })}
        />
      </Form.FormItemContainer>
      {errors.password && <Form.Label>{errors.password.message}</Form.Label>}
      {errors.loginFail ? (
        <Form.Label>{errors.loginFail.message}</Form.Label>
      ) : null}
      <Form.Button>로그인</Form.Button>
    </Form>
  );
};
