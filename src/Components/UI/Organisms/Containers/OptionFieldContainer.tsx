import { useEffect } from "react";
import { useRecoilValue } from "recoil";

import { updateProductState, useProductOptionsFormContext } from "@/lib/state";
import { ErrorLabel } from "../../Atoms";
import { OptionFieldItem } from "../../Molecules";

const OptionFieldContainer = () => {
  const updateOptions = useRecoilValue(updateProductState);

  const {
    productOptionsForm: {
      setValue,
      formState: { errors: optionErrors }
    },
    optionFieldArray: { fields: optionsFields }
  } = useProductOptionsFormContext();

  useEffect(() => {
    if (updateOptions.options) {
      setValue(
        "options",
        updateOptions.options.map(({ id, name }) => ({
          optionId: id,
          name
        }))
      );
    }
  }, [updateOptions.options, setValue]);

  return (
    <>
      <ul>
        {optionsFields.map(({ id, name, optionId }, index) => (
          <OptionFieldItem
            key={id}
            optionId={optionId}
            optionName={name}
            index={index}
          />
        ))}
      </ul>
      {optionErrors?.options && (
        <ErrorLabel>{optionErrors.options.message}</ErrorLabel>
      )}
    </>
  );
};

export default OptionFieldContainer;
