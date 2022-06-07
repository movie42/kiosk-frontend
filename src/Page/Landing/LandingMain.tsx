import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Headline1, Headline2 } from "../../mixin";
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: rgba(0, 0, 0, 0.2);
  :before {
    content: "";
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    /* background: url("https://source.unsplash.com/random/?salad") no-repeat
      center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover; */
    z-index: -1;
  }
  h1 {
    ${Headline1}
    line-height: 1.3;
  }
`;
const Container = styled.div`
  width: 80%;
  height: 90vh;
  overflow: scroll;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  padding: 2rem;
  box-sizing: border-box;
`;

const LandingMain = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Container>
        <h1>
          누구나
          <br />
          쉽고 빠르게
          <br />내 가게를 운영하는 방법
        </h1>
        <button onClick={() => navigate("/landing/agreement")}>회원가입</button>
        <button onClick={() => navigate("/admin/login")}>로그인</button>
      </Container>
    </Wrapper>
  );
};

export default LandingMain;
