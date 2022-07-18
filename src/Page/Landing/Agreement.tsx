import styled from "styled-components";
import { Headline1, Headline2, Body1 } from "../../lib/styles/mixin";
import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";
import { useNavigate } from "react-router-dom";
import { termsOfService, privacyPolicy } from "./Agreement/AgreementContent";
import { useState } from "react";

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

const TermsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    ${Body1}
  }
`;

const TermsText = styled.pre`
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

const ConfirmButton = styled(ButtonDefaultStyle)<{ isAgree?: boolean }>`
  margin-left: 5px;
  color: ${(props) => props.theme.color.fontColorWhite};
  background-color: ${(props) =>
    props.isAgree === true
      ? props.theme.color.primary600
      : props.theme.color.gray300};
`;

const AgreementButton = styled(ButtonDefaultStyle)<{ isAgree?: boolean }>`
  font-size: 1.4rem;
  padding: 0.8rem;
  color: ${(props) => props.theme.color.fontColorWhite};
  background-color: ${(props) =>
    props.isAgree === true
      ? props.theme.color.primary600
      : props.theme.color.gray300};
`;

const Agreement = () => {
  const navigate = useNavigate();

  const [terms, setTerms] = useState<boolean>(false);
  const [privacy, setPrivacy] = useState<boolean>(false);

  return (
    <Wrapper>
      <Header>
        <h1>누구나 키오스크</h1>
      </Header>
      <Container>
        <TermsContainer>
          <Title>이용약관 동의</Title>
          <AgreementButton onClick={() => setTerms(true)} isAgree={terms}>
            동의하기
          </AgreementButton>
        </TermsContainer>
        <TermsText>{termsOfService}</TermsText>
        <hr />
        <TermsContainer>
          <Title>개인정보 수집 및 이용 동의</Title>
          <AgreementButton onClick={() => setPrivacy(true)} isAgree={privacy}>
            동의하기
          </AgreementButton>
        </TermsContainer>
        <TermsText>{privacyPolicy}</TermsText>
        <hr />

        <ButtonGroup>
          <span>약관을 모두 동의하셨다면 회원가입 버튼을 누르세요.</span>
          <div>
            <ConfirmButton onClick={() => navigate("/")} isAgree={false}>
              돌아가기
            </ConfirmButton>
            <ConfirmButton
              onClick={() => navigate("/signup")}
              disabled={!terms || !privacy}
              isAgree={terms && privacy}
            >
              회원가입
            </ConfirmButton>
          </div>
        </ButtonGroup>
      </Container>
    </Wrapper>
  );
};

export default Agreement;
