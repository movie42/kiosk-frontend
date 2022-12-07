import { SignUpProps } from "@/Page/Landing/interface";
import { ErrorMessage, GroupForm } from "@/Page/Landing/SignUp/styles";
import { useFormContext } from "react-hook-form";
import { Form } from "../../Atoms";

interface StoreFormContainerProps {
  checkStore: boolean;
  setCheckStore: React.Dispatch<React.SetStateAction<boolean>>;
}

const StoreFormContainer = ({
  checkStore,
  setCheckStore
}: StoreFormContainerProps) => {
  const {
    register,
    formState: { errors }
  } = useFormContext<SignUpProps>();
  return (
    <Form.FieldSet>
      <GroupForm>
        <h2>사업체 정보 입력</h2>
        <div>
          <Form.Input
            type="checkbox"
            checked={!checkStore}
            onChange={() => setCheckStore((prev) => !prev)}
          />
          <span>나중에 입력할게요</span>
        </div>
      </GroupForm>
      <Form.FormItemContainer>
        <Form.Label htmlFor="code">사업장번호</Form.Label>
        <Form.Input
          placeholder="사업장번호"
          id="code"
          disabled={!checkStore}
          {...register("code", {
            required: {
              value: checkStore,
              message: "사업장번호를 입력해주세요."
            }
          })}
        />
      </Form.FormItemContainer>
      <ErrorMessage>{errors.code?.message}</ErrorMessage>
      <Form.FormItemContainer>
        <Form.Label htmlFor="storeName">상호명</Form.Label>
        <Form.Input
          placeholder="상호명"
          id="storeName"
          disabled={!checkStore}
          {...register("storeName", {
            required: {
              value: checkStore,
              message: "상호명을 입력해주세요."
            }
          })}
        />
      </Form.FormItemContainer>
      <ErrorMessage>{errors.storeName?.message}</ErrorMessage>
      <Form.FormItemContainer>
        <Form.Label htmlFor="phone">전화번호</Form.Label>
        <Form.Input
          placeholder="전화번호"
          id="phone"
          disabled={!checkStore}
          {...register("phone", {
            required: {
              value: checkStore,
              message: "전화번호를 입력해주세요."
            }
          })}
        />
      </Form.FormItemContainer>
      <ErrorMessage>{errors.phone?.message}</ErrorMessage>

      <Form.FormItemContainer>
        <Form.Label htmlFor="address">주소</Form.Label>
        <Form.Input
          placeholder="주소"
          id="address"
          disabled={!checkStore}
          {...register("address", {
            required: {
              value: checkStore,
              message: "주소를 입력해주세요."
            }
          })}
        />
      </Form.FormItemContainer>
      <ErrorMessage>{errors.address?.message}</ErrorMessage>
    </Form.FieldSet>
  );
};

export default StoreFormContainer;
