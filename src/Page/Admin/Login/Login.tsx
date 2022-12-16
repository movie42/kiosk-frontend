import { FormProvider, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";

import { AdminLoadingAndGetUser } from "@/Components/UI/Molecules";
import { LoginFormContainer, PageHeader } from "@/Components/UI/Organisms";
import { userState } from "@/lib/state/userState";
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
