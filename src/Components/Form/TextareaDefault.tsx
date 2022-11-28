import React, { forwardRef } from "react";

interface ITextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: React.LegacyRef<HTMLTextAreaElement>;
}

const TextareaDefault = forwardRef(
  (props: ITextAreaProps, ref?: React.LegacyRef<HTMLTextAreaElement>) => {
    return (
      <textarea ref={ref} {...props}>
        {props.children}
      </textarea>
    );
  }
);

TextareaDefault.displayName = "TextareaDefault";

export default TextareaDefault;
