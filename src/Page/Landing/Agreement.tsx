import styled from "styled-components";
import { Headline1, Headline2, SubTitle1 } from "../../mixin";
import ButtonDefaultStyle from "../../Components/Buttons/ButtonDefault";
import { useNavigate } from "react-router-dom";

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
  h3 {
    ${SubTitle1}
    text-align: center;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ConfirmButton = styled(ButtonDefaultStyle)`
  margin: 0 auto;
  color: ${(props) => props.theme.color.fontColorWhite};
  background-color: ${(props) => props.theme.color.primary600};
`;

const Agreement = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Header>
        <h1>누구나 키오스크</h1>
      </Header>
      <Container>
        <Title>사업체 가입</Title>
        <h3>약관 페이지 동의하기</h3>
        <ConfirmButton onClick={() => navigate("/landing/signup")}>
          동의하기
        </ConfirmButton>
      </Container>
    </Wrapper>
  );
};

export default Agreement;
