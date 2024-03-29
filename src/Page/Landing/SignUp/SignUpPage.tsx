import { FormProvider, useForm } from "react-hook-form";

import { PageHeader, SignupFormContainer } from "@/Components/UI/Organisms";
import { Wrapper, Container } from "./styles";
import { SignUpProps } from "../interface";

const SignUpPage = () => {
  const method = useForm<SignUpProps>();
  return (
    <Wrapper>
      <PageHeader header="누구나 키오스크" message="회원 가입" />
      <Container>
        <FormProvider {...method}>
          <SignupFormContainer />
        </FormProvider>
      </Container>
    </Wrapper>
  );
};

export default SignUpPage;
