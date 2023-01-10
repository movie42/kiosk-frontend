import React from "react";
import InputDefault from "../InputDefault";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Atom/Form/Input",
  component: InputDefault
} as ComponentMeta<typeof InputDefault>;

const Template: ComponentStory<typeof InputDefault> = (args) => (
  <InputDefault {...args} />
);

export const DefaultInput = Template.bind({});
DefaultInput.args = {
  id: "default",
  name: "default",
  type: "text",
  placeholder: "기본 텍스트 인풋"
};
