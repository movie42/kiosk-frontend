import { useNavigate } from "react-router-dom";
import {
  LandingContainer,
  LandingTitle,
  LandingWrapper,
  LinkButton
} from "./styles";

const LandingMainPage = () => {
  const navigate = useNavigate();
  return (
    <LandingWrapper>
      <LandingContainer>
        <h1>누구나 키오스크</h1>
        <LandingTitle>누구나 쉽고 빠르게 내 가게를 운영하는 방법</LandingTitle>
        <div>
          <LinkButton onClick={() => navigate("/agreement")}>
            회원가입
          </LinkButton>
          <LinkButton onClick={() => navigate("/login")}>로그인</LinkButton>
        </div>
      </LandingContainer>
    </LandingWrapper>
  );
};

export default LandingMainPage;
