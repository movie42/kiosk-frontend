import styled from "styled-components";
import { Headline1 } from "@/lib/styles";

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  h1 {
    ${Headline1}
    line-height: 1;
    ${({ theme }) => theme.device.mobile} {
      font-size: 4.2rem;
    }
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
  ul.productList {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(20rem, auto);
  }
`;

export const SubTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  padding: 0.8rem 0 1.3rem 0;
`;
