import React, { forwardRef } from "react";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.LegacyRef<HTMLInputElement>;
}

const InputDefault = forwardRef(
  (props: IInputProps, ref?: React.LegacyRef<HTMLInputElement>) => {
    return <input ref={ref} {...props} />;
  }
);

InputDefault.displayName = "InputDefault";

export default InputDefault;
