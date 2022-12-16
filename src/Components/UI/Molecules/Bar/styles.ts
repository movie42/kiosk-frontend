import { SubTitle1, SubTitle2 } from "@/lib/styles";
import styled from "styled-components";
import { BasicSquareButton } from "../../Atoms";

export const StatusBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 1rem;
  height: 8rem;

  .status-bar-item-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    border-top: 1px solid ${(props) => props.theme.color.gray300};
  }
  .status-message-container {
    h3 {
      ${SubTitle1};
      color: ${(props) => props.theme.color.fontColorBlack};
    }
  }
  .status-button-container {
    button {
      cursor: pointer;
      padding: 0.5rem 1.8rem;
      border: 0;
      font-size: 2rem;
      color: ${(props) => props.theme.color.fontColorWhite};
      border-radius: 0.2rem;
      line-height: 2.8rem;
    }

    .cancel-button {
      background-color: ${(props) => props.theme.color.gray300};
    }
    .confirm-button {
      margin-left: 0.5rem;
      background-color: ${(props) => props.theme.color.primary700};
    }
  }
  ${({ theme }) => theme.device.tablet} {
    height: 10rem;
    .status-bar-item-container {
      flex-direction: column;
      justify-content: space-around;
    }
  }
`;

export const MenuBarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;

  background-color: ${(props) => props.theme.color.background100};
  color: ${(props) => props.theme.color.fontColorBlack};
  height: 6rem;
  z-index: 20;
  border: 1px solid ${(props) => props.theme.color.gray300};
  h2 {
    ${SubTitle2}
  }

  button {
    cursor: pointer;
    border: 0;
    font-size: 2rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    border-radius: 0.3rem;
    line-height: 2.8rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ConfirmButton = styled(BasicSquareButton)`
  background-color: ${(props) => props.theme.color.error500};
`;

export const CancelButton = styled(BasicSquareButton)`
  background-color: ${(props) => props.theme.color.gray400};
  color: ${(props) => props.theme.color.fontColorWhite};
  margin-right: 0.3rem;
`;
