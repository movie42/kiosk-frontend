import React from "react";
import ErrorLabel from "../ErrorLabel";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Atom/Form/ErrorLabel",
  component: ErrorLabel
} as ComponentMeta<typeof ErrorLabel>;

const Template: ComponentStory<typeof ErrorLabel> = (args) => (
  <ErrorLabel {...args} />
);
export const DefaultLabel = Template.bind({});

DefaultLabel.args = {
  htmlFor: "error",
  children: "이미 가입된 사용자입니다."
};
