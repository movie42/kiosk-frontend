import { useNavigate } from "react-router-dom";
import { termsOfService, privacyPolicy } from "../Agreement/AgreementContent";
import { useState } from "react";
import {
  AgreementButton,
  ButtonGroup,
  ConfirmButton,
  Container,
  Header,
  TermsContainer,
  TermsText,
  Title,
  Wrapper
} from "./styles";

const AgreementPage = () => {
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

export default AgreementPage;
