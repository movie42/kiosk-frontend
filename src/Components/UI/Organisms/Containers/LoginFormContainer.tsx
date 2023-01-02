import { EMAIL_REX } from "@/lib/constant";
import { useLogin } from "@/Page/Admin/hooks";
import { IUserProps } from "@/Page/Admin/interface";
import { useFormContext } from "react-hook-form";
import { ErrorLabel, Form } from "../../Atoms";

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
      {errors.email && <ErrorLabel>{errors.email.message}</ErrorLabel>}
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
      {errors.password && <ErrorLabel>{errors.password.message}</ErrorLabel>}
      {errors.loginFail ? (
        <ErrorLabel>{errors.loginFail.message}</ErrorLabel>
      ) : null}
      <Form.Button>로그인</Form.Button>
    </Form>
  );
};

export default LoginFormContainer;
