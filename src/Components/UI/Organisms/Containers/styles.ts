import styled from "styled-components";
import { motion } from "framer-motion";
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
