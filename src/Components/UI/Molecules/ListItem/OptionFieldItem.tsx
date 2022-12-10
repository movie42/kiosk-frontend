import { useProductOptionsFormContext } from "@/lib/state";
import { IoIosRemoveCircle } from "react-icons/io";
import { Form, IconButton } from "../../Atoms";
import { FieldItem } from "./styles";

interface OptionFieldItemProps {
  id: number;
}

const OptionFieldItem = ({ id }: OptionFieldItemProps) => {
  const {
    createProductOptionsForm: { register },
    createOptionFieldArray: { remove: optionsRemove }
  } = useProductOptionsFormContext();

  return (
    <FieldItem>
      <IconButton
        type="button"
        onClick={() => optionsRemove(id)}
        ReactIcon={IoIosRemoveCircle}
        hidden={true}
        text="상품 옵션 제거하기"
      />
      <Form.Input
        type="text"
        placeholder="옵션의 이름을 입력해주세요."
        {...register(`options.${id}.name`, {
          required: "옵션의 이름은 반드시 입력해야합니다."
        })}
      />
    </FieldItem>
  );
};

export default OptionFieldItem;
