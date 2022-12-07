import { useFormContext } from "react-hook-form";

import { SignUpProps } from "@/Page/Landing/interface";
import {
  useHandleGoBack,
  useSubmitSignup,
  useSubmitStore
} from "@/Page/Landing/SignUp/hooks";
import { ActionButton, ButtonGroup } from "@/Page/Landing/SignUp/styles";
import { Form } from "../../Atoms";
import StoreFormContainer from "./StoreFormContainer";
import UserFormContainer from "./UserFormContainer";

const SignupFormContainer = () => {
  const {
    submitUserOnly,
    isSuccess: mutateUserSuccess,
    submitUserAndStore,
    mutateUserForStoreSuccess,
    storeInfo
  } = useSubmitSignup();
  const { checkStore, setCheckStore } = useSubmitStore({
    mutateUserSuccess,
    mutateUserForStoreSuccess,
    storeInfo
  });
  const { handleSubmit } = useFormContext<SignUpProps>();
  const { handleGoBack } = useHandleGoBack();

  return (
    <Form
      onSubmit={handleSubmit(!checkStore ? submitUserOnly : submitUserAndStore)}
    >
      <UserFormContainer />
      <StoreFormContainer
        setCheckStore={setCheckStore}
        checkStore={checkStore}
      />
      <ButtonGroup>
        <span>정보를 전부 입력하셨다면 가입하기 버튼을 눌러주세요.</span>
        <div>
          <ActionButton onClick={(e) => handleGoBack(e)}>돌아가기</ActionButton>
          <ActionButton type="submit" option="confirm">
            가입하기
          </ActionButton>
        </div>
      </ButtonGroup>
    </Form>
  );
};

export default SignupFormContainer;
