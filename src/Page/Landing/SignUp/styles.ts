import styled from "styled-components";
import { Body1, Headline1, Headline2, SubTitle2 } from "@/lib/styles";
import { ButtonDefault, InputDefault } from "@/Components/UI/Atoms";

export const Wrapper = styled.div`
  padding: 1rem 2rem;
`;

export const Title = styled.h2`
  ${Headline2};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5rem;
  h1 {
    ${Headline1}
  }
  button {
    cursor: pointer;
    padding: 0.5rem 2rem;
    border: 0;
    font-size: 2.8rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    border-radius: 0.3rem;
    background-color: ${(props) => props.theme.color.gray300};
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TermsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    ${Body1}
  }
`;

export const TermsText = styled.pre`
  font-size: 1.2rem;
  white-space: pre-wrap;
  height: 30vh;
  overflow-y: scroll;
  margin-bottom: 1rem;
  line-height: 1.3;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    ${Body1}
  }
  ${({ theme }) => theme.device.mobile} {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 10px;
    height: 10rem;
    padding-bottom: 1rem;
    div {
      display: flex;
      flex-direction: row;
      gap: 10px;
    }
  }
`;

export const ConfirmButton = styled(ButtonDefault)<{ isAgree?: boolean }>`
  margin-left: 5px;
  color: ${(props) => props.theme.color.fontColorWhite};
  background-color: ${(props) =>
    props.isAgree === true
      ? props.theme.color.primary600
      : props.theme.color.gray300};
`;

export const AgreementButton = styled(ButtonDefault)<{ isAgree?: boolean }>`
  font-size: 1.4rem;
  padding: 0.8rem;
  color: ${(props) => props.theme.color.fontColorWhite};
  background-color: ${(props) =>
    props.isAgree === true
      ? props.theme.color.primary600
      : props.theme.color.gray300};
`;

export const FormContainer = styled.form`
  height: inherit;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  width: 38rem;
  margin: 2rem auto;
`;

export const SignUpInput = styled(InputDefault)`
  ${SubTitle2}
  width: 100%;
  outline: 0;
  border-right: 0;
  border-top: 0;
  border-left: 0;
  border-bottom: 2px solid black;
  margin-bottom: 1rem;
  :focus {
    outline: 0;
  }
`;

export const GroupForm = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  p {
    ${Body1}
    line-height: 2;
  }
  span {
    font-size: 1.2rem;
  }
`;

export const ErrorMessage = styled.p`
  ${Body1}
  color: ${(props) => props.theme.color.error500};
`;

export const ActionButton = styled(ButtonDefault)<{ option?: string }>`
  margin-left: 5px;
  color: ${(props) => props.theme.color.fontColorWhite};
  background-color: ${(props) =>
    props.option === "confirm"
      ? props.theme.color.primary600
      : props.theme.color.gray300};
`;
