import { ButtonDefault } from "@/Components/UI/Atoms/Buttons";
import { OptionValue } from "@/lib/state";
import { Headline3 } from "@/lib/styles";
import { motion, Variants } from "framer-motion";
import styled from "styled-components";

export const ItemWrapper = styled(motion.li)`
  position: relative;
`;

export const Item = styled(motion.div)<{
  selectOption: OptionValue;
  selected: boolean;
}>`
  .item-container {
    position: relative;
    cursor: pointer;
    background-color: ${(props) => props.theme.color.background100};
    height: 100%;
    min-width: 20rem;
    overflow: hidden;
    display: grid;
    grid-template-rows: minmax(12rem, 0.9fr) 0.7fr;
    border: 1px solid ${({ theme }) => theme.color.gray300};
    border-radius: 0.4rem;
    text-decoration: none;
    color: ${(props) => props.theme.color.fontColorBlack};
    .is-select {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${(props) =>
        props.selected ? "unset" : props.theme.color.background80};
      z-index: 11;
    }
    .image-container {
      overflow: hidden;
      position: relative;
      .transparent-box {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: ${({ theme }) => theme.color.backgroundBlack60};
      }
    }
  }
`;

export const ProductInfoContainer = styled.div`
  align-self: center;
  padding: 0.8rem;
  ${({ theme }) => theme.device.tablet} {
    padding: 2rem;
  }
  h3 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 0.6rem;
  }
  h4 {
    font-size: 2rem;
    align-self: end;
  }
`;

export const ProductItemButtonContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 11;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const ToggleContainer = styled.div`
  display: flex;
  font-size: 1.4rem;
  font-weight: 600;
  padding: 0.5rem;
  align-items: center;
  color: ${({ theme }) => theme.color.fontColorWhite};
  margin: 0.4rem;
  span {
    margin-left: 0.5rem;
    ${({ theme }) => theme.device.tablet} {
      font-size: 2.8rem;
    }
  }
`;

export const UpdateButtonWrapper = styled.div`
  padding-right: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.fontColorWhite};
  font-size: 2.2rem;
  ${({ theme }) => theme.device.tablet} {
    font-size: 2.8rem;
  }

  button {
    background-color: unset;
    padding: 0;
    padding-right: 0.5rem;
    ${({ theme }) => theme.device.tablet} {
      font-size: 2.8rem;
    }
  }
`;

export const UpdateProductButton = styled(ButtonDefault)`
  font-size: 1.5rem;
`;

export const boxVariants: Variants = {
  init: { scale: 1 },
  hover: {
    scale: 1,
    transition: {
      duration: 0.4
    }
  }
};

export const imageBoxVariants: Variants = {
  init: { scale: 1 },
  hover: {
    scale: 2,
    transition: {
      duration: 0.4
    }
  }
};

export const StoreListItemContainer = styled.li`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: inherit;
  position: relative;
  border: 1px solid ${(props) => props.theme.color.gray300};
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  a {
    text-decoration: none;
    color: ${(props) => props.theme.color.fontColorBlack};
  }
  h3 {
    ${Headline3};
    padding: 0;
    margin: 0;
    ${({ theme }) => theme.device.mobile} {
      font-size: 2.4rem;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  .various-button-box {
    button {
      cursor: pointer;
      border: 0;
      background-color: unset;
      padding: 0;
      font-size: 2rem;
      color: ${(props) => props.theme.color.gray400};
    }
  }
`;
export const UpdateButton = styled(ButtonDefault)``;
export const DeleteButton = styled(ButtonDefault)`
  margin-left: 1.8rem;
`;
