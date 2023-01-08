import { ComponentStory, ComponentMeta } from "@storybook/react";
import ToggleButton from "./ToggleButton";

export default {
  title: "ToggleButton",
  component: ToggleButton,
  args: {
    isActive: true,
    size: 4
  }
} as ComponentMeta<typeof ToggleButton>;

const ToggleButtonTemplate: ComponentStory<typeof ToggleButton> = (args) => (
  <ToggleButton {...args} />
);

export const BasicToggle = ToggleButtonTemplate.bind({});
BasicToggle.args = {
  size: 6,
  isActive: false
};

export const ToggleAction = ToggleButtonTemplate.bind({});
ToggleAction.args = {
  onClick: () => alert("done") // ?????
};
