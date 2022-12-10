import { useProductOptionsFormContext } from "@/lib/state";
import { IoIosAddCircle } from "react-icons/io";
import { ErrorLabel, Form, IconButton } from "../../Atoms";
import { OptionFieldItem } from "../../Molecules";

const OptionFieldContainer = () => {
  const {
    createProductOptionsForm: {
      formState: { errors: optionErrors }
    },
    createOptionFieldArray: { fields: optionsFields, append: optionsAppend }
  } = useProductOptionsFormContext();

  return (
    <>
      <Form.Label>상품 옵션</Form.Label>
      <IconButton
        type="button"
        onClick={() => optionsAppend({ name: "" })}
        ReactIcon={IoIosAddCircle}
        hidden={true}
        text="상품 옵션 추가하기"
      />
      {optionsFields.map(({ id }) => (
        <OptionFieldItem key={id} id={Number(id)} />
      ))}
      {optionErrors?.options && (
        <ErrorLabel>{optionErrors.options.message}</ErrorLabel>
      )}
    </>
  );
};

export default OptionFieldContainer;
