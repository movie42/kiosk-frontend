import { useForm } from "react-hook-form";

import { InputDefault, LabelDefault, Loading } from "@/Components";
import { useGetStore, useLoadingComplete, useUpdateStore } from "../hooks";
import { IStoreFormProps } from "../interface";
import { Form, InputContainer } from "../styles";
import StoreUpdateStatusBar from "./StoreUpdateStatusBar";

const AdminStoreUpdate = () => {
  const { data: updateStore, isLoading: isLoadingGetStore } = useGetStore();
  const { mutate, isSuccess } = useUpdateStore();
  const { isComplete, setIsComplete } = useLoadingComplete({ isSuccess });

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
      {!isComplete ? (
        <Loading
          title="가게 정보를 수정하고 있습니다."
          subTitle="잠시만 기다려주세요."
        />
      ) : null}

      {isLoadingGetStore ? (
        <Loading
          title="가게 정보를 불러오는 중입니다."
          subTitle="잠시만 기다려주세요."
        />
      ) : null}

      <Form onSubmit={onSubmit}>
        <InputContainer disabled>
          <LabelDefault htmlFor="code">사업자번호</LabelDefault>
          <InputDefault
            id="code"
            placeholder="사업자 번호를 입력해주세요."
            {...register("code", {
              value: updateStore?.store?.code
            })}
          />
        </InputContainer>
        <InputContainer>
          <LabelDefault htmlFor="name">가게이름</LabelDefault>
          <InputDefault
            id="name"
            placeholder="가게 이름을 입력해주세요."
            {...register("name", {
              value: updateStore?.store?.name,
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
              value: updateStore?.store?.address,
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
              value: updateStore?.store?.phone,
              required: "대표 번호가 꼭 필요합니다."
            })}
          />
        </InputContainer>
        <input style={{ visibility: "hidden" }} type="submit" />
      </Form>
      <LabelDefault className="error-label">
        {errors.addFail?.message}
      </LabelDefault>

      <StoreUpdateStatusBar onSubmit={onSubmit} />
    </>
  );
};

export default AdminStoreUpdate;