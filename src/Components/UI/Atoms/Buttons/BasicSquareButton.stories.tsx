import { BasicSquareButton } from ".";

export default {
  title: "BasicSquareButton",
  component: BasicSquareButton,
  args: {
    children: "Basic Button"
  }
};

export const BasicSquareButtonTest = (props: { children: string }) => (
  <BasicSquareButton>{props.children}</BasicSquareButton>
);
