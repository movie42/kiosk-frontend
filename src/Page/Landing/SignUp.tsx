import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import InputDefault from "../../Components/Form/InputDefault";
import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";
import { Wrapper, Header, Title, Container, ButtonGroup } from "./Agreement";
import { SubTitle2, Body1 } from "../../lib/styles/mixin";
import { useNavigate } from "react-router-dom";
import graphqlReqeustClient from "../../lib/graphqlRequestClient";
import {
  MeQuery,
  useAddStoreMutation,
  useMeQuery,
  useSignupMutation
} from "../../lib/generated/graphql";
import { handleErrorMessage } from "../../lib/utils/helper/handleErrorMessage";
import { ErrorState } from "../Admin/Login/AdminLogin";
import { useRecoilState } from "recoil";
import { userState } from "../../lib/state/userState";
import { useQueryClient } from "react-query";

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
  code: string;
  storeName: string;
  address: string;
  phone: string;
}
interface IStoreProps {
  code: string;
  name: string;
  address: string;
  phone: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // signup form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ISignUpProps>({ mode: "onSubmit" });

  // display store & type & store mutate trigger
  const [checkStore, setCheckStore] = useState(true);
  const [storeInfo, setStoreInfo] = useState<IStoreProps>();
  const [saveStore, setSaveStore] = useState(false);

  // registration & error
  const [errorState, setErrorState] = useState<ErrorState>();
  const [isUser, setIsUser] = useRecoilState(userState);

  const password = useRef({});
  password.current = watch("password", "");

  // query
  const { refetch } = useMeQuery<MeQuery, Error>(
    graphqlReqeustClient(isUser.accessToken),
    undefined,
    {
      enabled: false,
      onSuccess: (data) => {
        const { id, email, name } = data.me;
        setIsUser((pre) => ({ ...pre, id, email, name }));
      }
    }
  );

  // mutation
  const { mutate } = useSignupMutation<Error>(graphqlReqeustClient(), {
    onSuccess: (data) => {
      const {
        signup: { accessToken, refreshToken }
      } = data;
      setIsUser((pre) => ({
        ...pre,
        isLogin: true,
        accessToken,
        refreshToken
      }));
      alert("??????????????? ??????????????? ?????????????????????.");
      if (checkStore) refetch();
      if (!checkStore) {
        navigate("/login");
      }
    },
    onError: (error) => {
      handleErrorMessage(error, setErrorState);
      if (errorState) {
        console.log(errorState);
      }
    }
  });
  const { mutate: mutateStore } = useAddStoreMutation<Error>(
    graphqlReqeustClient(isUser.accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("stores");
        navigate("/login");
      },
      onError: (error) => {
        handleErrorMessage(error, setErrorState);
        if (errorState) {
          console.log(errorState);
        }
      }
    }
  );

  // call mutateStore or not
  useEffect(() => {
    if (checkStore && saveStore && storeInfo) {
      mutateStore({ ...storeInfo });
    }
  }, [saveStore, checkStore, storeInfo, mutateStore]);

  const onSubmit = (data: ISignUpProps) => {
    const { email, name, password, code, storeName, phone, address } = data;
    setStoreInfo(() => {
      return { code, name: storeName, phone, address };
    });
    mutate(
      { user: { email, name, password } },
      {
        onSuccess: () => {
          if (checkStore) {
            setSaveStore((prv) => !prv);
          }
        }
      }
    );
  };

  // goBack modal
  const handleGoBack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const confirm = window.confirm(
      "?????? ????????? ???????????????. ?????? ?????????????????????????"
    );
    if (confirm) navigate("/agreement");
  };

  return (
    <Wrapper>
      <Header>
        <h1>????????? ????????????</h1>
      </Header>
      <Container>
        <Title>????????? ??????</Title>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <SubContainer>
            <SignUpInput
              id="email"
              name="email"
              placeholder="?????????"
              register={register}
              registerOptions={{
                required: "???????????? ??????????????????.",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "???????????? ????????????."
                }
              }}
            />
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
            <GroupForm>
              <SignUpInput
                id="name"
                name="name"
                placeholder="??????"
                register={register}
                required
              />
            </GroupForm>

            <SignUpInput
              id="password"
              name="password"
              type="password"
              placeholder="????????????"
              register={register}
              required
            />

            <SignUpInput
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              placeholder="???????????? ??????"
              register={register}
              registerOptions={{
                validate: (value) =>
                  value === password.current || "??????????????? ???????????? ????????????."
              }}
              required
            />
            <ErrorMessage>{errors.passwordConfirm?.message}</ErrorMessage>
          </SubContainer>

          <SubContainer>
            <GroupForm>
              <p>????????? ?????? ??????</p>
              <div>
                <input
                  type="checkbox"
                  checked={!checkStore}
                  onChange={() => setCheckStore((prev) => !prev)}
                />
                <span>????????? ???????????????</span>
              </div>
            </GroupForm>
            {checkStore && (
              <>
                <SignUpInput
                  placeholder="???????????????"
                  id="code"
                  name="code"
                  required={checkStore}
                  register={checkStore && register}
                />
                <SignUpInput
                  placeholder="?????????"
                  id="storeName"
                  name="storeName"
                  required={checkStore}
                  register={checkStore && register}
                />
                <SignUpInput
                  placeholder="????????????"
                  id="phone"
                  name="phone"
                  required={checkStore}
                  register={checkStore && register}
                />
                <SignUpInput
                  placeholder="??????"
                  id="address"
                  name="address"
                  required={checkStore}
                  register={checkStore && register}
                />
              </>
            )}
          </SubContainer>
          <ButtonGroup>
            <span>????????? ?????? ?????????????????? ???????????? ????????? ???????????????.</span>
            <div>
              <ActionButton onClick={(e) => handleGoBack(e)}>
                ????????????
              </ActionButton>
              <ActionButton type="submit" option="confirm">
                ????????????
              </ActionButton>
            </div>
          </ButtonGroup>
        </FormContainer>
      </Container>
    </Wrapper>
  );
};

export default SignUp;
