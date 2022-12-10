import { useProductOptionsFormContext } from "@/lib/state";

import { ErrorLabel } from "../../Atoms";
import { OptionFieldItem } from "../../Molecules";

const OptionFieldContainer = () => {
  const {
    createProductOptionsForm: {
      formState: { errors: optionErrors }
    },
    createOptionFieldArray: { fields: optionsFields }
  } = useProductOptionsFormContext();

  return (
    <>
      <ul>
        {optionsFields.map(({ id }, index) => (
          <OptionFieldItem key={id} index={index} />
        ))}
      </ul>
      {optionErrors?.options && (
        <ErrorLabel>{optionErrors.options.message}</ErrorLabel>
      )}
    </>
  );
};

export default OptionFieldContainer;
