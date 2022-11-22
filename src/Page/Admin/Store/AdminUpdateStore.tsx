import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import InputDefault from "../../../Components/Form/InputDefault";
import LabelDefault from "../../../Components/Form/LabelDefault";
import Loading from "../../../Components/Loading";

import { userState } from "../../../lib/state/userState";
import useGetStore from "./hooks/useGetStore";

import useUpdateStore from "./hooks/useUpdateStore";
import { IStoreFormProps } from "./interface";
import { Form, InputContainer, StatusBar } from "./styles";

const AdminUpdateStore = () => {
  const user = useRecoilValue(userState);
  const { data: updateStore, store } = useGetStore();
  const { data, mutate, isSuccess } = useUpdateStore();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IStoreFormProps>();

  const onSubmit = handleSubmit((data) => {
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
          title="가게 정보를 수정하고 있습니다."
          subTitle="잠시만 기다려주세요."
        />
      )}

      {store.name && (
        <>
          <Form onSubmit={onSubmit}>
            <InputContainer disabled>
              <LabelDefault htmlFor="code">사업자번호</LabelDefault>
              <InputDefault
                id="code"
                name="code"
                placeholder="사업자 번호를 입력해주세요."
                value={store.code}
                register={register}
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
                defaultValue={store.name}
                registerOptions={{
                  required: "가게 이름이 꼭 있어야합니다."
                }}
                error={errors.name?.message}
              />
            </InputContainer>
            <InputContainer>
              <LabelDefault htmlFor="address">주소</LabelDefault>
              <InputDefault
                id="address"
                name="address"
                placeholder="주소를 입력해주세요."
                defaultValue={store.address}
                register={register}
                registerOptions={{
                  required: "주소가 꼭 있어야합니다."
                }}
                error={errors.address?.message}
              />
            </InputContainer>
            <InputContainer>
              <LabelDefault htmlFor="phone">전화번호</LabelDefault>
              <InputDefault
                id="phone"
                name="phone"
                placeholder="가게 대표 번호를 입력해주세요."
                defaultValue={store.phone}
                register={register}
                registerOptions={{
                  required: "대표 번호가 꼭 필요합니다."
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
                <h2>입력이 끝나면 수정하기 버튼을 눌러주세요.</h2>
              </div>
              <div className="status-button-container">
                <button onClick={() => navigate(-1)} className="cancel-button">
                  돌아가기
                </button>
                <button onClick={onSubmit} className="confirm-button">
                  수정하기
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
