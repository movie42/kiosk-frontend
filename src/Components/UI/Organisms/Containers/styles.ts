import styled, { DefaultTheme } from "styled-components";
import { motion, Variants } from "framer-motion";
import { Headline2, Headline3 } from "@/lib/styles/mixin";
import { InputDefault } from "@/Components/UI/Atoms";

export const OptionContainer = styled.div`
  position: relative;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr 3fr;
  padding-bottom: 1.5rem;
  background-color: ${(props) => props.theme.color.background100};
  z-index: 10;
  h2 {
    ${Headline2}
  }

  ${({ theme }) => theme.device.tablet} {
    h2 {
      ${Headline3};
      margin-top: 1rem;
      line-height: 1.5;
    }
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const SearchForm = styled.form`
  width: 100%;
`;

export const SearchBox = styled.div`
  width: 40rem;
  border-bottom: 1px solid ${(props) => props.theme.color.gray800};
  display: grid;
  grid-template-columns: 1fr auto;

  button {
    font-size: 1.8rem;
    color: ${(props) => props.theme.color.gray800};
    width: 100%;
    background-color: unset;
    &:hover {
      color: ${(props) => props.theme.color.primary700};
      font-weight: bolder;
    }
  }
`;
export const SearchingInput = styled(InputDefault)`
  padding: 0 2rem;
  font-size: 2rem;
  border: 0;
  outline: unset;
  background-color: unset;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  ${({ theme }) => theme.device.tablet} {
    margin: 1rem 0;
    line-height: 1.5;
  }
`;

export const ButtonContainer = styled(motion.div)`
  button {
    padding: 0.2rem 1.5rem;
    font-size: 2rem;
    margin-left: 0.3rem;
    background-color: unset;
    color: ${(props) => props.theme.color.fontColorBlack};
    ${({ theme }) => theme.device.tablet} {
      padding: 0.2rem 1.5rem 0 0;
      margin-left: 0;
    }
    ${({ theme }) => theme.device.mobile} {
      font-size: 1.8rem;
      padding: 0.2rem 1rem 0 0;
      margin-left: 0;
    }
  }
`;

export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(20rem, 40rem);
  gap: 2rem;
  ${({ theme }) => theme.device.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${({ theme }) => theme.device.mobile} {
    grid-template-columns: unset;
  }

  li {
    box-sizing: border-box;
    overflow-y: auto;
    &.list-container {
      align-items: flex-start;
      margin-bottom: 0.8rem;
      border: 1px solid ${(props) => props.theme.color.gray300};
      border-radius: 1rem;
      .list-header {
        display: flex;
        justify-content: space-between;
        padding-bottom: 1rem;
        span {
          ${Headline2}
          line-height: 1.2;
          &:not(:first-child) {
            margin-left: 1rem;
            font-size: 1.7rem;
          }
          font-weight: 900;
          strong {
            display: block;
            font-size: 1.7rem;
            font-weight: 300;
          }
        }
      }
    }
  }
`;

export const OrderProductInfoContainer = styled.div`
  ul {
    li {
      display: grid;
      padding: 1rem 0.8rem;
      &:not(:last-child) {
        border-bottom: 2px dotted ${(props) => props.theme.color.gray300};
      }
      span {
        &:first-child {
          grid-column: 1 / span 3;
          padding-bottom: 0.8rem;
        }
        &:nth-child(2) {
          grid-column: 1 / 2;
        }
        &:nth-child(3) {
          grid-column: 2 / 3;
        }
        &:last-child {
          grid-column: 3 / 4;
        }
        font-size: 1.7rem;
        line-height: 1.3;
        font-weight: 600;
        strong {
          display: block;
          font-size: 1.3rem;
          font-weight: 300;
        }
      }
    }
  }
`;

export const OrderInfoHeader = styled(motion.div)`
  position: sticky;
  height: 15.5rem;
  top: 0;
  box-sizing: border-box;
  z-index: 1;
  background-color: ${({ theme }) => theme.color.gray800};
  padding: 1rem;
  color: ${({ theme }) => theme.color.fontColorWhite};
  .order-button-container {
    display: flex;
    justify-content: space-between;
  }
`;

export const buttonBlinkVariants: Variants = {
  animation: {
    backgroundColor: ["#ffe100", "#d0d0d0"],
    transition: {
      backgroundColor: { yoyo: Infinity, duration: 0.8 }
    }
  }
};

export const defaultButtonStyle = styled(motion.button)<{ status: string }>`
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0 0.8rem;
  margin-bottom: 0.3rem;
  width: 5rem;
  height: 5rem;
  border-radius: 100%;
  border: 2px solid #fff;
`;

export const buttonFalse = (theme: DefaultTheme) => `
    background-color: ${theme.color.gray300};
    color:${theme.color.fontColorBlack};
    border:1px solid #000;
`;

export const ReadyOrderButton = styled(defaultButtonStyle)`
  ${({ status, theme }) =>
    status === "READY"
      ? `background-color: ${theme.color.secondary300};
         color:${theme.color.fontColorWhite};
            `
      : `${buttonFalse(theme)}`};
`;
export const DoneOrderButton = styled(defaultButtonStyle)`
  ${({ status, theme }) =>
    status === "DONE"
      ? `background-color: ${theme.color.secondary600};
         color:${theme.color.fontColorWhite};
            `
      : `${buttonFalse(theme)}`};
`;
export const CompleteOrderButton = styled(defaultButtonStyle)`
  ${({ status, theme }) =>
    status === "COMPLETE"
      ? `background-color: ${theme.color.primary500};
         color:${theme.color.fontColorWhite};
        `
      : `${buttonFalse(theme)}`};
`;
export const CancelOrderButton = styled(defaultButtonStyle)`
  ${({ status, theme }) =>
    status === "CANCELED"
      ? `background-color: ${theme.color.error700};
         color:${theme.color.fontColorWhite};
            `
      : `${buttonFalse(theme)}`};
`;
