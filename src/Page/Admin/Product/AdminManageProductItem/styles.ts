import { ButtonDefault } from "@/Components";
import { Option } from "@/lib/state";
import { motion, Variants } from "framer-motion";
import styled, { css } from "styled-components";

export const Container = styled.div``;

export const ProductList = styled.ul`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(20rem, auto);
  ${({ theme }) => theme.device.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${({ theme }) => theme.device.mobile} {
    grid-template-columns: unset;
  }
`;

export const ManageOptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  ${({ theme }) => theme.device.tablet} {
    flex-wrap: wrap;
  }
  ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ButtonContainer = styled.div<{ options: Option }>`
  display: flex;
  align-items: center;
  ${({ options }) => {
    if (options !== Option.NONE) {
      return css`
        visibility: hidden;
      `;
    }
  }}
`;

export const ButtonItemWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 2.5rem;
  &:not(:first-child) {
    margin-left: 0.7rem;
  }
  button {
    color: ${({ theme }) => theme.color.fontColorBlack};
    background-color: unset;
    padding: 0;
    padding-left: 0.5rem;
  }
`;

export const CreateProductButton = styled(ButtonDefault)``;
export const DeleteProductButton = styled(ButtonDefault)``;

export const ItemWrapper = styled(motion.li)`
  position: relative;
`;

export const Item = styled(motion.div)<{
  selectOption: Option;
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
    .item-info-container {
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
    }
  }
`;
export const ProductItemButtonContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
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
  p {
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
