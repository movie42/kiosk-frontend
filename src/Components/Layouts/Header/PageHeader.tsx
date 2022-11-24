import styled from "styled-components";
import { Headline3 } from "../../../lib/styles/mixin";

interface IPageMessageHeaderProps {
  header: string;
  message?: string;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  h2 {
    ${Headline3}
  }
  h3 {
    ${Headline3}
    font-weight:400;
    margin-left: 2rem;
  }
  ${({ theme }) => theme.device.mobile} {
    flex-wrap: wrap;
    h2,
    h3 {
      font-size: 2rem;
    }
    h3 {
      font-weight: 400;
      margin-left: 2rem;
    }
  }
`;

const PageHeaderMessage = ({ header, message }: IPageMessageHeaderProps) => {
  return (
    <Wrapper>
      <h2>{header}</h2>
      <h3>{message}</h3>
    </Wrapper>
  );
};

export default PageHeaderMessage;
