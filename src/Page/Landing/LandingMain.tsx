import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Headline1, Body1 } from "../../mixin";
import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  :before {
    content: "";
    top: 0;
    right: 0;
    width: 33%;
    height: 100vh;
    position: absolute;
    background: url("https://source.unsplash.com/random/?salad") no-repeat
      center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    z-index: -1;
  }
  h1 {
    ${Headline1}
    line-height: 1.3;
  }
`;
const Container = styled.div`
  width: 50%;
  padding: 1rem 2rem;
  h1 {
    font-size: 5.5rem;
    font-weight: 900;
    letter-spacing: -0.2;
    word-break: keep-all;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
`;

const Title = styled.h2`
  font-size: 1.2rem;
  line-height: 2;
`;

const LinkButton = styled(ButtonDefaultStyle)`
  color: #000;
  font-weight: bold;
  background: none;
  padding-left: 0;
`;

const LandingMain = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Container>
        <h1>누구나 키오스크</h1>
        <Title>누구나 쉽고 빠르게 내 가게를 운영하는 방법</Title>
        <div>
          <LinkButton onClick={() => navigate("/landing/agreement")}>
            회원가입
          </LinkButton>
          <LinkButton onClick={() => navigate("/admin/login")}>
            로그인
          </LinkButton>
        </div>
      </Container>
    </Wrapper>
  );
};

export default LandingMain;
