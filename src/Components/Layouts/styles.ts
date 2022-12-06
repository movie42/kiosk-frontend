import { Headline1 } from "@/lib/styles";
import styled from "styled-components";
import { IconButton } from "../UI/Atoms";

export const Main = styled.main``;

export const Wrapper = styled.div`
  padding: 1rem 2rem;
`;
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

export const ClientMain = styled.main`
  padding-bottom: 6rem;
`;

export const AdminHeader = styled.div`
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
`;

export const OpenNavButton = styled(IconButton)`
  svg {
    font-size: 2.8rem;
  }
  &:hover {
    color: ${(props) => props.theme.color.fontColorBlack};
  }
`;
