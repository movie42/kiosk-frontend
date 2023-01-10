import { ComponentStory, ComponentMeta } from "@storybook/react";
import Noimage from "../Noimage";

export default {
  title: "Atom/Images/NoImage",
  component: Noimage
} as ComponentMeta<typeof Noimage>;

export const SmallNoImage: ComponentStory<typeof Noimage> = () => (
  <div style={{ width: "60px" }}>
    <Noimage />
  </div>
);

export const BigNoImage: ComponentStory<typeof Noimage> = () => (
  <div style={{ width: "120%" }}>
    <Noimage />
  </div>
);
