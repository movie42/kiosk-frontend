import { EMAIL_REX } from "@/lib/constant";
import { SignUpProps } from "@/Page/Landing/interface";
import { useFormContext } from "react-hook-form";
import { ErrorLabel, Form } from "../../Atoms";

const UserFormContainer = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<SignUpProps>();

  return (
    <Form.FieldSet>
      <h2>사용자 정보</h2>
      <Form.FormItemContainer>
        <Form.Label htmlFor="email">이메일</Form.Label>
        <Form.Input
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
      </Form.FormItemContainer>
      <ErrorLabel>{errors.email?.message}</ErrorLabel>
      <Form.FormItemContainer>
        <Form.Label htmlFor="name">이름</Form.Label>
        <Form.Input
          id="name"
          placeholder="이름"
          {...register("name", {
            required: "이름을 입력해주세요."
          })}
        />
      </Form.FormItemContainer>
      <ErrorLabel>{errors.name?.message}</ErrorLabel>
      <Form.FormItemContainer>
        <Form.Label htmlFor="password">비밀번호</Form.Label>
        <Form.Input
          id="password"
          type="password"
          placeholder="비밀번호"
          {...register("password", {
            required: "비밀번호를 입력해주세요."
          })}
        />
      </Form.FormItemContainer>
      <ErrorLabel>{errors.password?.message}</ErrorLabel>

      <Form.FormItemContainer>
        <Form.Label htmlFor="passwordConfirm">비밀번호 확인</Form.Label>
        <Form.Input
          id="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인"
          {...register("passwordConfirm", {
            required: "앞에서 입력한 비밀번호를 입력해주세요.",
            validate: (value) => value
            // value === password.current || "비밀번호가 일치하지 않습니다."
          })}
        />
      </Form.FormItemContainer>
      <ErrorLabel>{errors.passwordConfirm?.message}</ErrorLabel>
    </Form.FieldSet>
  );
};

export default UserFormContainer;
