import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BasicSquareButtonStyle from "@/Components/UI/Atoms/Buttons/BasicSquareButton";
import { SubTitle2 } from "@/lib/styles/mixin";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  p {
    ${SubTitle2}
  }
`;
const ConfirmButton = styled(BasicSquareButtonStyle)`
  color: ${(props) => props.theme.color.fontColorWhite};
  font-size: 2rem;
  margin: 1rem 0;
`;

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <p>페이지를 찾을 수 없습니다.</p>
      <ConfirmButton onClick={() => navigate("/")}>
        메인으로 이동하기
      </ConfirmButton>
    </Wrapper>
  );
};

export default PageNotFound;
