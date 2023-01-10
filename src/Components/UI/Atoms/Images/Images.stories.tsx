import { ComponentStory, ComponentMeta } from "@storybook/react";
import Images from "./Images";
import noimage from "./noimage.png";

export default {
  title: "Images",
  component: Images,
  args: {
    alt: "image"
  }
} as ComponentMeta<typeof Images>;

const ImagesTemplate: ComponentStory<typeof Images> = (args) => (
  <div style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
    <Images {...args} />
  </div>
);

export const Landing = ImagesTemplate.bind({});
Landing.args = {
  src: "https://source.unsplash.com/random/?salad",
  alt: "landing image"
};

export const NoImage = ImagesTemplate.bind({});
NoImage.args = {
  src: noimage,
  alt: "no image"
};

const TestTemplate: ComponentStory<typeof Images> = (args) => (
  <div
    style={{
      position: "relative",
      overflow: "hidden",
      width: "100%",
      height: "100vh",
      aspectRatio: "1.5/1"
    }}
  >
    <img
      {...args}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "100%",
        objectFit: "cover",
        transform: "translate(-50%, -50%)"
      }}
    />
  </div>
);

export const LandingTest = TestTemplate.bind({});
LandingTest.args = {
  src: "https://source.unsplash.com/random/?salad",
  alt: "landing image"
};

export const NoImageTest = TestTemplate.bind({});
NoImageTest.args = {
  src: noimage,
  alt: "no image"
};
