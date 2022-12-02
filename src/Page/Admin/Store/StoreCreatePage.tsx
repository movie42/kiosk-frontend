import { useForm } from "react-hook-form";

import { LabelDefault, InputDefault } from "@/Components/UI/Atoms";
import { Loading, StoreCreateStatusBar } from "@/Components/UI/Molecules";
import { useAddStore, useLoadingComplete } from "@/Page/Admin/hooks";
import { IStoreFormProps } from "../interface";
import { Form, InputContainer } from "./styles";

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
        <InputContainer>
          <LabelDefault htmlFor="code">사업자번호</LabelDefault>
          <InputDefault
            id="code"
            placeholder="사업자 번호를 입력해주세요."
            {...register("code", { required: "사업자 번호가 꼭 필요해요." })}
          />
        </InputContainer>
        <InputContainer>
          <LabelDefault htmlFor="name">가게이름</LabelDefault>
          <InputDefault
            id="name"
            placeholder="가게 이름을 입력해주세요."
            {...register("name", { required: "가게 이름이 꼭 있어야합니다." })}
          />
        </InputContainer>
        <InputContainer>
          <LabelDefault htmlFor="address">주소</LabelDefault>
          <InputDefault
            id="address"
            placeholder="주소를 입력해주세요."
            {...register("address", { required: "주소가 꼭 있어야합니다." })}
          />
        </InputContainer>
        <InputContainer>
          <LabelDefault htmlFor="phone">전화번호</LabelDefault>
          <InputDefault
            id="phone"
            placeholder="가게 대표 번호를 입력해주세요."
            {...register("phone", { required: "대표 번호가 꼭 필요합니다." })}
          />
        </InputContainer>
        <input style={{ visibility: "hidden" }} type="submit" />
      </Form>
      <LabelDefault className="error-label">
        {errors.addFail?.message}
      </LabelDefault>
      <StoreCreateStatusBar onSubmit={onSubmit} />
    </>
  );
};

export default StoreCreatePage;
