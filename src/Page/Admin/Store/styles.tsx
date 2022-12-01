import styled from "styled-components";
import { BasicSquareButton } from "@/Components/UI/Atoms";
import { Body1, SubTitle1, SubTitle2 } from "@/lib/styles/mixin";

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

export const AddStoreButton = styled(BasicSquareButton)`
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
