import { ComponentMeta, ComponentStory } from "@storybook/react";
import { BasicSquareButton } from "../../Buttons";
import Form from "../Form";
import FormItemContainer from "../FormItemContainer";
import InputDefault from "../InputDefault";
import LabelDefault from "../LabelDefault";

export default {
  title: "Atom/Form/Form",
  component: Form
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;

export const LoginForm = Template.bind({});
LoginForm.args = {
  onSubmit: (e) => {
    e.preventDefault();
  },
  children: (
    <>
      <FormItemContainer>
        <LabelDefault htmlFor="email">이메일</LabelDefault>
        <InputDefault id="email" type="email" name="email" />
      </FormItemContainer>
      <FormItemContainer>
        <LabelDefault htmlFor="password">비밀번호</LabelDefault>
        <InputDefault id="password" type="password" name="password" />
      </FormItemContainer>
      <BasicSquareButton type="submit">로그인</BasicSquareButton>
    </>
  )
};
