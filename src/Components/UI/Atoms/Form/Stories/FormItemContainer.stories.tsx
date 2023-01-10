import { ComponentMeta, ComponentStory } from "@storybook/react";

import FormItemContainer from "../FormItemContainer";
import { DefaultInput } from "./Input.stories";
import { DefaultLabel } from "./Label.stories";

export default {
  title: "Atom/Form/FormItemContainer",
  component: FormItemContainer
} as ComponentMeta<typeof FormItemContainer>;

const Template: ComponentStory<typeof FormItemContainer> = (args) => (
  <FormItemContainer {...args} />
);

export const DefaultFormItemContainer = Template.bind({});

DefaultFormItemContainer.args = {
  children: (
    <>
      <DefaultLabel {...DefaultLabel.args} />
      <DefaultInput {...DefaultInput.args} />
    </>
  )
};

export const LongTextFormItemContainer = Template.bind({});
LongTextFormItemContainer.args = {
  children: (
    <>
      <DefaultLabel {...DefaultLabel.args}>
        매우 길다란 텍스트가 입력되면 어떻게 될까?
      </DefaultLabel>
      <DefaultInput
        {...DefaultInput.args}
        placeholder="매우 길다란 placeholder 텍스트"
      />
    </>
  )
};
