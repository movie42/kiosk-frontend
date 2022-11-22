import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import InputDefault from "../../../Components/Form/InputDefault";
import LabelDefault from "../../../Components/Form/LabelDefault";
import Loading from "../../../Components/Loading";
import { useAddStoreMutation } from "../../../lib/generated/graphql";
import graphqlReqeustClient from "../../../lib/graphqlRequestClient";
import { ErrorState } from "../../../lib/interface";

import { userState } from "../../../lib/state/userState";
import { handleErrorMessage } from "../../../lib/utils/helper/handleErrorMessage";
import { IStoreFormProps } from "./interface";
import { Form, InputContainer, StatusBar } from "./styles";

const AdminStore = () => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<ErrorState>();
  const { accessToken } = useRecoilValue(userState);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<IStoreFormProps>();

  const { mutate, data, isSuccess } = useAddStoreMutation<Error>(
    graphqlReqeustClient(accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("stores");
      },
      onError: (error) => {
        handleErrorMessage(error, setErrorState);
        if (errorState) {
          const [message] = errorState.response.errors;
          const error = message.extensions.exception.response.error;
          setError("addFail", { message: error });
        }
      }
    }
  );

  const onSubmit = handleSubmit((data) => {
    if (data.code && data.addFail) {
      mutate({ ...data, code: data.code });
      setIsLoading(true);
    }
  });

  useEffect(() => {
    let time: NodeJS.Timeout;
    if (isSuccess && data.addStore) {
      time = setTimeout(() => {
        setIsLoading(false);
        navigate(`/admin/${user.id}/store/list`);
      }, 3000);
    }
    return () => time && clearTimeout(time);
  }, [isSuccess, data, user.id]);

  return (
    <>
      {isLoading && (
        <Loading
          title="가게를 등록 하고있어요."
          subTitle="가게를 등록하신 것을 축하드립니다! 🎉"
        />
      )}
      <Form onSubmit={onSubmit}>
        <InputContainer>
          <LabelDefault htmlFor="code">사업자번호</LabelDefault>
          <InputDefault
            id="code"
            name="code"
            placeholder="사업자 번호를 입력해주세요."
            register={register}
            registerOptions={{ required: "사업자 번호가 꼭 필요해요." }}
            error={errors.code?.message}
          />
        </InputContainer>
        <InputContainer>
          <LabelDefault htmlFor="name">가게이름</LabelDefault>
          <InputDefault
            id="name"
            name="name"
            placeholder="가게 이름을 입력해주세요."
            register={register}
            registerOptions={{ required: "가게 이름이 꼭 있어야합니다." }}
            error={errors.name?.message}
          />
        </InputContainer>
        <InputContainer>
          <LabelDefault htmlFor="address">주소</LabelDefault>
          <InputDefault
            id="address"
            name="address"
            placeholder="주소를 입력해주세요."
            register={register}
            registerOptions={{ required: "주소가 꼭 있어야합니다." }}
            error={errors.address?.message}
          />
        </InputContainer>
        <InputContainer>
          <LabelDefault htmlFor="phone">전화번호</LabelDefault>
          <InputDefault
            id="phone"
            name="phone"
            placeholder="가게 대표 번호를 입력해주세요."
            register={register}
            registerOptions={{ required: "대표 번호가 꼭 필요합니다." }}
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
            <h3>입력이 끝나면 등록하기 버튼을 눌러주세요.</h3>
          </div>
          <div className="status-button-container">
            <button onClick={() => navigate(-1)} className="cancel-button">
              돌아가기
            </button>
            <button onClick={onSubmit} className="confirm-button">
              등록하기
            </button>
          </div>
        </div>
      </StatusBar>
    </>
  );
};

export default AdminStore;
