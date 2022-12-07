import { BasicSquareButton } from "@/Components/UI/Atoms";
import styled from "styled-components";

export const MenuBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 2rem;
  background-color: ${(props) => props.theme.color.backgroundBlack100};
  height: 6rem;

  h2 {
    font-size: 2.2rem;
    font-weight: bold;
    color: ${(props) => props.theme.color.fontColorWhite};
  }

  button {
    cursor: pointer;
    padding: 0.7rem 2rem;
    border: 0;
    font-size: 2.4rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    border-radius: 0.3rem;
    line-height: 2.8rem;
    background-color: ${(props) => props.theme.color.error500};
  }
  .go-back-button {
    margin-right: 1.3rem;
  }
  ${({ theme }) => theme.device.mobile} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    height: 10rem;
    div {
      display: flex;
      flex-direction: row;
      gap: 10px;
    }
  }
`;

export const GoBackButton = styled(BasicSquareButton)``;
export const OrderButton = styled(BasicSquareButton)`
  margin-left: 1rem;
`;
