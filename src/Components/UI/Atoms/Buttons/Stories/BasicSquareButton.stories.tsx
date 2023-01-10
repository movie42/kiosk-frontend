import { BasicSquareButton } from "..";

export default {
  title: "Atom/Button/BasicSquareButton",
  component: BasicSquareButton,
  args: {
    children: "Basic Button"
  }
};

export const BasicSquareButtonTest = (props: { children: string }) => (
  <BasicSquareButton>{props.children}</BasicSquareButton>
);
