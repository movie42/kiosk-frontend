import { useProductOptionsFormContext } from "@/lib/state";
import { IoIosRemoveCircle } from "react-icons/io";
import { Form, IconButton } from "../../Atoms";
import { FieldItem } from "./styles";

interface OptionFieldItemProps {
  index: number;
}

const OptionFieldItem = ({ index }: OptionFieldItemProps) => {
  const {
    createProductOptionsForm: { register },
    createOptionFieldArray: { remove: optionsRemove }
  } = useProductOptionsFormContext();

  return (
    <FieldItem>
      <Form.FormItemContainer>
        <div>
          <Form.Label>옵션 {index + 1}</Form.Label>
          <IconButton
            type="button"
            onClick={() => optionsRemove(index)}
            ReactIcon={IoIosRemoveCircle}
            hidden={true}
            text="상품 옵션 제거하기"
          />
        </div>
        <Form.Input
          type="text"
          placeholder="옵션의 이름을 입력해주세요."
          {...register(`options.${index}.name`, {
            required: "옵션의 이름은 반드시 입력해야합니다."
          })}
        />
      </Form.FormItemContainer>
    </FieldItem>
  );
};

export default OptionFieldItem;
