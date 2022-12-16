import React, { ReactNode } from "react";

import { BasicSquareButton } from "../Buttons";
import FieldSet from "./FieldSet";
import FormItemContainer from "./FormItemContainer";
import InputDefault from "./InputDefault";
import LabelDefault from "./LabelDefault";
import TextareaDefault from "./TextareaDefault";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

const Form = ({ children, ...props }: FormProps) => {
  return <form {...props}>{children}</form>;
};

Form.FieldSet = FieldSet;
Form.FormItemContainer = FormItemContainer;
Form.Input = InputDefault;
Form.Label = LabelDefault;
Form.Textarea = TextareaDefault;
Form.Button = BasicSquareButton;

export default Form;
