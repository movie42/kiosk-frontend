import { useForm } from "react-hook-form";

import { InputDefault, LabelDefault } from "@/Components/UI/Atoms";
import { Loading, StoreUpdateStatusBar } from "@/Components/UI/Molecules";
import {
  useGetStore,
  useLoadingComplete,
  useUpdateStore
} from "@/Page/Admin/hooks";
import { IStoreFormProps } from "../interface";
import { Form, InputContainer } from "./styles";

const StoreUpdatePage = () => {
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
      id: Number(updateStore?.id),
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
          title="가게를 수정하고 있습니다."
          subTitle="잠시만 기다려주세요."
        />
      ) : null}

      {isLoadingGetStore ? (
        <Loading
          title="수정 할 가게를 불러오는 중입니다."
          subTitle="잠시만 기다려주세요."
        />
      ) : (
        <>
          <Form onSubmit={onSubmit}>
            <InputContainer disabled>
              <LabelDefault htmlFor="code">사업자번호</LabelDefault>
              <InputDefault
                id="code"
                placeholder="사업자 번호를 입력해주세요."
                {...register("code", {
                  value: updateStore?.code
                })}
              />
            </InputContainer>
            <InputContainer>
              <LabelDefault htmlFor="name">가게이름</LabelDefault>
              <InputDefault
                id="name"
                placeholder="가게 이름을 입력해주세요."
                {...register("name", {
                  value: updateStore?.name,
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
                  value: updateStore?.address,
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
                  value: updateStore?.phone,
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
      )}
    </>
  );
};

export default StoreUpdatePage;
