import styled from "styled-components";
import ButtonDefaultStyle from "@/Components/Buttons/ButtonDefault";

export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr, 2fr, 1fr;
  div {
    &:nth-child(2) {
      padding: 0.8rem 0 2rem;
    }
    &:last-child {
      display: flex;
      justify-content: flex-end;
      button {
        &:nth-child(2) {
          margin-left: 1rem;
        }
      }
    }
  }
`;
export const CancelButton = styled(ButtonDefaultStyle)``;
export const StopConfirmButton = styled(ButtonDefaultStyle)`
  background-color: ${(props) => props.theme.color.error500};
`;
export const StartConfirmButton = styled(ButtonDefaultStyle)`
  background-color: ${(props) => props.theme.color.primary600};
`;
