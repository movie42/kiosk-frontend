import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { InputDefault, LabelDefault, Loading } from "@/Components";
import { useGetStore, useLoadingComplete, useUpdateStore } from "./hooks";
import { IStoreFormProps } from "./interface";
import { Form, InputContainer, StatusBar } from "./styles";

const AdminUpdateStore = () => {
  const { data: updateStore, store } = useGetStore();
  const { mutate, isSuccess } = useUpdateStore();
  const { isComplete, setIsComplete } = useLoadingComplete({ isSuccess });
  const navigate = useNavigate();
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
    setIsComplete(false);
  });

  return (
    <>
      {!isComplete && (
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
                placeholder="사업자 번호를 입력해주세요."
                {...register("code", {
                  value: store.code
                })}
              />
            </InputContainer>
            <InputContainer>
              <LabelDefault htmlFor="name">가게이름</LabelDefault>
              <InputDefault
                id="name"
                placeholder="가게 이름을 입력해주세요."
                {...register("name", {
                  value: store.name,
                  required: "가게 이름이 꼭 있어야합니다."
                })}
              />
            </InputContainer>
            <InputContainer>
              <LabelDefault htmlFor="address">주소</LabelDefault>
              <InputDefault
                id="address"
                placeholder="주소를 입력해주세요."
                {...register("address", {
                  value: store.address,
                  required: "주소가 꼭 있어야합니다."
                })}
              />
            </InputContainer>
            <InputContainer>
              <LabelDefault htmlFor="phone">전화번호</LabelDefault>
              <InputDefault
                id="phone"
                placeholder="가게 대표 번호를 입력해주세요."
                {...register("phone", {
                  value: store.phone,
                  required: "대표 번호가 꼭 필요합니다."
                })}
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
