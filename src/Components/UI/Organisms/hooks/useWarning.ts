import { useState } from "react";
import { ProductListValues } from "@/lib/state";
import { WarningMessageKey } from "../interface";

interface DisplayWarningProps {
  selected: ProductListValues;
  count: number;
  optionName: string;
}

const useWarning = () => {
  const [warning, setWarning] = useState<WarningMessageKey>("DEFAULT");

  const displayWarning = ({
    selected,
    count,
    optionName
  }: DisplayWarningProps) => {
    const { options }: any = selected;

    if (count === 0) {
      setWarning(() => "COUNT");
    }

    if (options?.length > 0 && !optionName) {
      setWarning(() => "OPTION");
    }

    if (
      (count !== 0 && !options) ||
      (count !== 0 && options?.length > 0 && optionName)
    ) {
      setWarning(() => "NONE");
    }
  };

  return { warning, displayWarning };
};

export default useWarning;
