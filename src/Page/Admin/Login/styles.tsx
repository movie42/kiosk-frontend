import styled from "styled-components";

import InputDefault from "@/Components/Form/InputDefault";
import { SubTitle1, SubTitle2 } from "@/lib/styles/mixin";
import LabelDefault from "@/Components/Form/LabelDefault";

export const Wrapper = styled.div`
  height: 80vh;
  overflow: hidden;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 50vh;
  width: 38rem;
  margin: 0 auto;
  form {
    height: inherit;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    label.error-label {
      font-size: 1.8rem;
      color: ${(props) => props.theme.color.error700};
    }
  }
`;

export const LoginLabel = styled(LabelDefault)`
  ${SubTitle2}
`;

export const LoginInput = styled(InputDefault)`
  ${SubTitle1}
  border:0;
  outline: unset;
`;

export const ActionContainer = styled.div`
  display: flex;
  width: inherit;
  justify-content: space-between;
  align-items: center;
  a {
    font-size: 1.5rem;
  }
  button {
    cursor: pointer;
    padding: 0.7rem 2rem;
    border: 0;
    font-size: 2.8rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    border-radius: 0.3rem;
    line-height: 2.8rem;
    background-color: ${(props) => props.theme.color.primary600};
  }
`;
