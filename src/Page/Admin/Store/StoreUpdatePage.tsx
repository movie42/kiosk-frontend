import { useForm } from "react-hook-form";

import { ErrorLabel, Form } from "@/Components/UI/Atoms";
import { Loading, StoreUpdateStatusBar } from "@/Components/UI/Molecules";
import {
  useGetStore,
  useLoadingComplete,
  useUpdateStore
} from "@/Page/Admin/hooks";
import { IStoreFormProps } from "../interface";

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
            <Form.FormItemContainer>
              <Form.Label htmlFor="code">사업자번호</Form.Label>
              <Form.Input
                id="code"
                placeholder="사업자 번호를 입력해주세요."
                {...register("code", {
                  required: "사업자 번호가 꼭 필요합니다.",
                  value: updateStore?.code
                })}
              />
            </Form.FormItemContainer>

            <ErrorLabel>{errors.code?.message}</ErrorLabel>

            <Form.FormItemContainer>
              <Form.Label htmlFor="name">가게이름</Form.Label>
              <Form.Input
                id="name"
                placeholder="가게 이름을 입력해주세요."
                {...register("name", {
                  value: updateStore?.name,
                  required: "가게 이름이 꼭 있어야합니다."
                })}
              />
            </Form.FormItemContainer>
            <ErrorLabel>{errors.name?.message}</ErrorLabel>

            <Form.FormItemContainer>
              <Form.Label htmlFor="address">주소</Form.Label>
              <Form.Input
                id="address"
                placeholder="주소를 입력해주세요."
                {...register("address", {
                  value: updateStore?.address,
                  required: "주소가 꼭 있어야합니다."
                })}
              />
            </Form.FormItemContainer>
            <ErrorLabel>{errors.address?.message}</ErrorLabel>

            <Form.FormItemContainer>
              <Form.Label htmlFor="phone">전화번호</Form.Label>
              <Form.Input
                id="phone"
                placeholder="가게 대표 번호를 입력해주세요."
                {...register("phone", {
                  value: updateStore?.phone,
                  required: "대표 번호가 꼭 필요합니다."
                })}
              />
            </Form.FormItemContainer>
            <ErrorLabel>{errors.phone?.message}</ErrorLabel>

            <input style={{ visibility: "hidden" }} type="submit" />
          </Form>
          <ErrorLabel>{errors.addFail?.message}</ErrorLabel>
          <StoreUpdateStatusBar onSubmit={onSubmit} />
        </>
      )}
    </>
  );
};

export default StoreUpdatePage;
