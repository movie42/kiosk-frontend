import { RecoilRoot } from "recoil";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ManageOrderStatusButton from "./ManageOrderStatusButton";

export default {
  title: "ManageOrderStatusButton",
  component: ManageOrderStatusButton,
  args: {
    children: "Test",
    statusCheck: "CANCELED"
  }
} as ComponentMeta<typeof ManageOrderStatusButton>;

const ManageOrderStatusButtonTemplate: ComponentStory<
  typeof ManageOrderStatusButton
> = (args) => (
  <RecoilRoot>
    <ManageOrderStatusButton {...args} />
  </RecoilRoot>
);

export const StatusTest = ManageOrderStatusButtonTemplate.bind({});
StatusTest.args = {
  statusCheck: "READY"
};
