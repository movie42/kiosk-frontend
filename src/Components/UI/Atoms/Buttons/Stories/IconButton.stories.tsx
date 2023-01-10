import { ComponentStory, ComponentMeta } from "@storybook/react";
import styled from "styled-components";
import { MdAddCircle } from "react-icons/md";
import IconButton from "../IconButton";

export default {
  title: "Atom/Button/IconButton",
  component: IconButton,
  args: {
    ReactIcon: MdAddCircle,
    text: "IconButton",
    hidden: false
  }
} as ComponentMeta<typeof IconButton>;

export const IconButtonTest: ComponentStory<typeof IconButton> = () => (
  <IconButton ReactIcon={MdAddCircle} text="IconButton" hidden={false} />
);

const IconButtonTemplate: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} />
);

export const HiddenTest = IconButtonTemplate.bind({});
HiddenTest.args = {
  hidden: true
};

export const EventTest = IconButtonTemplate.bind({});
EventTest.args = {
  ...HiddenTest,
  onClick: () => alert("done")
};

export const ColorTest = styled(HiddenTest)`
  color: ${({ theme: { color } }) => color.error500};
  &:hover {
    color: ${({ theme: { color } }) => color.error800};
  }
`;
