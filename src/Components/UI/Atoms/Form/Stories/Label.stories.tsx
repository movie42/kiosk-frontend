import React from "react";
import LabelDefault from "../LabelDefault";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Atom/Form/Label",
  component: LabelDefault
} as ComponentMeta<typeof LabelDefault>;

const Template: ComponentStory<typeof LabelDefault> = (args) => (
  <LabelDefault {...args} />
);
export const DefaultLabel = Template.bind({});

DefaultLabel.args = {
  htmlFor: "default",
  children: "기본"
};
