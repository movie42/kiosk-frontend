import { SubTitle1 } from "@/lib/styles";
import styled from "styled-components";

export const StatusContainer = styled.div`
  z-index: 20;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 1rem;
  height: 8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${(props) => props.theme.color.gray300};
  background-color: ${(props) => props.theme.color.background100};
  h3 {
    ${SubTitle1};
    color: ${(props) => props.theme.color.fontColorBlack};
  }

  .button-container {
    align-self: unset;
    flex-direction: row-reverse;
    .cancel-button {
      background-color: ${(props) => props.theme.color.gray300};
      &:hover {
        background-color: ${(props) => props.theme.color.error700};
      }
    }
    .confirm-button {
      margin-left: 0.5rem;
      background-color: ${(props) => props.theme.color.primary700};
    }
  }

  ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 10rem;
    h3 {
      font-size: 2rem;
    }
  }
`;
