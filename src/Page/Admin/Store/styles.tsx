import styled from "styled-components";
import ButtonDefaultStyle from "@/Components/Buttons/ButtonDefault";
import { Body1, Headline3, SubTitle1, SubTitle2 } from "@/lib/styles/mixin";

export const Wrapper = styled.div``;
export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${({ theme }) => theme.device.tablet} {
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }
  ${({ theme }) => theme.device.mobile} {
    margin-bottom: 1rem;
  }
`;

export const AddStoreButton = styled(ButtonDefaultStyle)`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.color.fontColorBlack};
  background-color: unset;
  a {
    text-decoration: none;
    padding-bottom: 0.4rem;
    color: ${(props) => props.theme.color.fontColorBlack};
  }
  span {
    margin-left: 0.5rem;
  }
  ${({ theme }) => theme.device.tablet} {
    padding: 0;
  }
  ${({ theme }) => theme.device.mobile} {
    align-self: flex-end;
    font-size: 2rem;
  }
`;

export const StoreList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  grid-auto-rows: minmax(15rem, 15rem);
  ${({ theme }) => theme.device.tablet} {
    grid-template-columns: auto;
  }
`;

export const Item = styled.li`
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
  .button-container {
    display: flex;
    justify-content: space-between;
  }
  .various-button-box {
    button {
      cursor: pointer;
      border: 0;
      background-color: unset;
      padding: 0;
      font-size: 2rem;
      color: ${(props) => props.theme.color.gray400};
    }
    .delete-button {
      margin-left: 1.8rem;
    }
  }
`;
export const ModalChildren = styled.div`
  display: flex;
  flex-direction: column;
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
  .button-container {
    display: flex;
    justify-items: flex-end;
    align-self: flex-end;
  }
  .cancel-button {
    background-color: ${(props) => props.theme.color.gray400};
  }
  .confirm-button {
    background-color: ${(props) => props.theme.color.error700};
  }
`;

export const Form = styled.form`
  width: 100%;
  padding: 1rem 0;
`;

export const InputContainer = styled.div<{ disabled?: boolean }>`
  display: grid;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  grid-template-columns: repeat(auto-fill, minmax(20%, auto));
  label {
    grid-column: 1 /2;
    ${SubTitle1};
  }
  input {
    grid-column: 2 / 10;
    ${SubTitle2};
    border: unset;
    outline: unset;
  }
  .error-label {
    grid-column: 2 / 10;
    ${SubTitle2};
    color: ${(props) => props.theme.color.error500};
  }
  ${({ theme }) => theme.device.tablet} {
    padding: 0.8rem 0;
    label {
      grid-column: 1 / 10;
      ${Body1};
      font-weight: 900;
    }
    input {
      grid-column: 1 / 10;
      ${SubTitle2};
      border: unset;
      outline: unset;
      padding: 0;
    }
    .error-label {
      grid-column: 1 / 10;
      ${SubTitle2};
      color: ${(props) => props.theme.color.error500};
    }
  }
`;

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
