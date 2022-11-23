import ButtonDefaultStyle from "@/Components/Buttons/ButtonDefault";
import { motion } from "framer-motion";
import styled from "styled-components";

export const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 1rem 0;
  overflow: auto;
  height: 100%;
`;
export const ItemListContainer = styled.ul`
  height: 100%;
`;

export const Item = styled.li<{ selected?: boolean }>`
  margin-top: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  padding: 0.5rem;
  display: grid;
  width: 100%;
  align-items: center;
  grid-template-columns: 0.5fr 1fr 2fr;
  .check-box {
    position: relative;
    width: 2rem;
    height: 2rem;
    border: 2px solid ${(props) => props.theme.color.gray300};
    border-radius: 100%;
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1.7rem;
      height: 1.7rem;
      border-radius: 100%;
      transform: translate(-50%, -50%);
      background-color: ${(props) =>
        props.selected && props.theme.color.error600};
      content: "";
    }
  }
  .image-container {
    overflow: hidden;
    width: 10rem;
  }
  .item-info-container {
    display: flex;
    flex-direction: column;
  }
`;

export const ButtonContainer = styled(motion.div)`
  position: relative;
  display: flex;
  justify-items: flex-end;
  align-self: flex-end;
  button {
    cursor: pointer;
    font-size: 2rem;
    border: 0;
    padding: 0.8rem 1.3rem;
    border-radius: 0.5rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    &:not(:first-child) {
      margin-left: 0.8rem;
    }
  }
`;
export const FinalItem = styled.li``;

export const CancelButton = styled(ButtonDefaultStyle)`
  background-color: ${(props) => props.theme.color.gray400};
`;
export const ConfirmButton = styled(ButtonDefaultStyle)<{
  isSuccess?: boolean;
}>`
  background-color: ${(props) =>
    props.isSuccess
      ? props.theme.color.primary700
      : props.theme.color.error700};
`;
