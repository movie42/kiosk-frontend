import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import InputDefault from "../../../Components/Form/InputDefault";
import LabelDefault from "../../../Components/Form/LabelDefault";
import Loading from "../../../Components/Loading";
import {
  useStoreQuery,
  useUpdateStoreMutation
} from "../../../lib/generated/graphql";
import graphqlReqeustClient from "../../../lib/graphqlRequestClient";
import { ErrorState } from "../../../lib/interface";
import { SubTitle1, SubTitle2 } from "../../../lib/styles/mixin";
import { userState } from "../../../lib/state/userState";
import { handleErrorMessage } from "../../../lib/utils/helper/handleErrorMessage";

const Form = styled.form`
  width: 100%;
`;
const InputContainer = styled.div<{ disabled?: boolean }>`
  display: grid;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  grid-template-columns: repeat(auto-fill, minmax(20%, auto));

  label {
    grid-column: 1 / 2;
    ${SubTitle1};
    color: ${({ disabled, theme }) =>
      disabled ? theme.color.gray300 : theme.color.fontColorBlack};
  }
  input {
    grid-column: 2 / 10;
    ${SubTitle2};
    color: ${({ disabled, theme }) =>
      disabled ? theme.color.gray300 : theme.color.fontColorBlack};
    border: unset;
    outline: unset;
  }
  .error-label {
    grid-column: 2 / 10;
    ${SubTitle2};
    color: ${(props) => props.theme.color.error500};
  }
`;

const StatusBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 1rem;
  height: 5rem;

  .status-bar-item-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    border-top: 1px solid ${(props) => props.theme.color.gray300};
  }
  .status-message-container {
    h2 {
      font-size: 2rem;
      font-weight: bold;
      color: ${(props) => props.theme.color.fontColorBlack};
    }
  }
  .status-button-container {
    button {
      cursor: pointer;
      padding: 0.5rem 1.8rem;
      border: 0;
      font-size: 2rem;
      color: ${(props) => props.theme.color.fontColorWhite};
      border-radius: 0.2rem;
      line-height: 2.8rem;
    }

    .cancel-button {
      background-color: ${(props) => props.theme.color.gray300};
    }
    .confirm-button {
      margin-left: 0.5rem;
      background-color: ${(props) => props.theme.color.primary700};
    }
  }
`;

interface IStoreFormProps {
  name: string;
  code?: string;
  phone: string;
  address: string;
  addFail?: string;
}

const AdminUpdateStore = () => {
  const user = useRecoilValue(userState);

  const [store, setStore] = useState<{
    name: string;
    phone: string;
    code: string;
    address: string;
  }>({
    name: "",
    phone: "",
    code: "",
    address: ""
  });

  const { storeId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<ErrorState>();
  const { accessToken } = useRecoilValue(userState);
  const queryClient = useQueryClient();

  const { data: updateStore } = useStoreQuery(
    graphqlReqeustClient(accessToken),
    {
      id: Number(storeId)
    },
    {
      onSuccess: (data) => {
        if (data.store) {
          const { name, code, address, phone } = data.store;
          setStore({ name, code, address, phone });
        }
      }
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<IStoreFormProps>();

  const { mutate, data, isSuccess } = useUpdateStoreMutation<Error>(
    graphqlReqeustClient(accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("stores");
      },
      onError: (error) => {
        handleErrorMessage(error, setErrorState);
        if (errorState) {
          const [message] = errorState?.response.errors;
          const error = message.extensions.exception.response.error;
          setError("addFail", { message: error });
          setIsLoading(false);
        }
      }
    }
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    mutate({
      id: Number(updateStore?.store?.id),
      name: data.name,
      address: data.address,
      phone: data.phone
    });
    setIsLoading(true);
  });

  useEffect(() => {
    let time: NodeJS.Timeout;
    if (isSuccess && data.updateStore) {
      time = setTimeout(() => {
        setIsLoading(false);
        navigate(`/admin/${user.id}/store/list`);
      }, 3000);
    }
    return () => time && clearTimeout(time);
  }, [isSuccess, data, navigate, user.id]);

  return (
    <>
      {isLoading && (
        <Loading
          title="?????? ????????? ???????????? ????????????."
          subTitle="????????? ??????????????????."
        />
      )}

      {store.name && (
        <>
          <Form onSubmit={onSubmit}>
            <InputContainer disabled>
              <LabelDefault htmlFor="code">???????????????</LabelDefault>
              <InputDefault
                id="code"
                name="code"
                placeholder="????????? ????????? ??????????????????."
                value={store.code}
                register={register}
                error={errors.code?.message}
              />
            </InputContainer>
            <InputContainer>
              <LabelDefault htmlFor="name">????????????</LabelDefault>
              <InputDefault
                id="name"
                name="name"
                placeholder="?????? ????????? ??????????????????."
                register={register}
                defaultValue={store.name}
                registerOptions={{
                  required: "?????? ????????? ??? ??????????????????."
                }}
                error={errors.name?.message}
              />
            </InputContainer>
            <InputContainer>
              <LabelDefault htmlFor="address">??????</LabelDefault>
              <InputDefault
                id="address"
                name="address"
                placeholder="????????? ??????????????????."
                defaultValue={store.address}
                register={register}
                registerOptions={{
                  required: "????????? ??? ??????????????????."
                }}
                error={errors.address?.message}
              />
            </InputContainer>
            <InputContainer>
              <LabelDefault htmlFor="phone">????????????</LabelDefault>
              <InputDefault
                id="phone"
                name="phone"
                placeholder="?????? ?????? ????????? ??????????????????."
                defaultValue={store.phone}
                register={register}
                registerOptions={{
                  required: "?????? ????????? ??? ???????????????."
                }}
                error={errors.phone?.message}
              />
            </InputContainer>
            <input style={{ visibility: "hidden" }} type="submit" />
          </Form>
          <LabelDefault className="error-label">
            {errors.addFail?.message}
          </LabelDefault>
          <StatusBar>
            <div className="status-bar-item-container">
              <div className="status-message-container">
                <h2>????????? ????????? ???????????? ????????? ???????????????.</h2>
              </div>
              <div className="status-button-container">
                <button onClick={() => navigate(-1)} className="cancel-button">
                  ????????????
                </button>
                <button onClick={onSubmit} className="confirm-button">
                  ????????????
                </button>
              </div>
            </div>
          </StatusBar>
        </>
      )}
    </>
  );
};

export default AdminUpdateStore;
