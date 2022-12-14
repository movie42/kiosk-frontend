import { useForm } from "react-hook-form";

import { ErrorLabel, Form } from "@/Components/UI/Atoms";
import { Loading, StoreCreateStatusBar } from "@/Components/UI/Molecules";
import { useAddStore, useLoadingComplete } from "@/Page/Admin/hooks";
import { IStoreFormProps } from "../interface";

const StoreCreatePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IStoreFormProps>();
  const { mutate, isSuccess } = useAddStore();
  const { isComplete, setIsComplete } = useLoadingComplete({ isSuccess });

  const onSubmit = handleSubmit((data) => {
    if (data.code) {
      mutate({ ...data, code: data.code });
      setIsComplete(false);
    }
  });

  return (
    <>
      {!isComplete ? (
        <Loading
          title="가게를 등록 하고있어요."
          subTitle="가게를 등록하신 것을 축하드립니다! 🎉"
        />
      ) : null}

      <Form onSubmit={onSubmit}>
        <Form.FormItemContainer>
          <Form.Label htmlFor="code">사업자번호</Form.Label>
          <Form.Input
            id="code"
            placeholder="사업자 번호를 입력해주세요."
            {...register("code", { required: "사업자 번호가 꼭 필요해요." })}
          />
        </Form.FormItemContainer>
        <ErrorLabel>{errors.code?.message}</ErrorLabel>
        <Form.FormItemContainer>
          <Form.Label htmlFor="name">가게이름</Form.Label>
          <Form.Input
            id="name"
            placeholder="가게 이름을 입력해주세요."
            {...register("name", { required: "가게 이름이 꼭 있어야합니다." })}
          />
        </Form.FormItemContainer>
        <ErrorLabel>{errors.name?.message}</ErrorLabel>
        <Form.FormItemContainer>
          <Form.Label htmlFor="address">주소</Form.Label>
          <Form.Input
            id="address"
            placeholder="주소를 입력해주세요."
            {...register("address", { required: "주소가 꼭 있어야합니다." })}
          />
        </Form.FormItemContainer>
        <ErrorLabel>{errors.address?.message}</ErrorLabel>
        <Form.FormItemContainer>
          <Form.Label htmlFor="phone">전화번호</Form.Label>
          <Form.Input
            id="phone"
            placeholder="가게 대표 번호를 입력해주세요."
            {...register("phone", { required: "대표 번호가 꼭 필요합니다." })}
          />
        </Form.FormItemContainer>
        <ErrorLabel>{errors.phone?.message}</ErrorLabel>
        <input style={{ visibility: "hidden" }} type="submit" />
      </Form>
      <ErrorLabel>{errors.addFail?.message}</ErrorLabel>
      <StoreCreateStatusBar onSubmit={onSubmit} />
    </>
  );
};

export default StoreCreatePage;
