import styled from "styled-components";
import { ButtonDefaultStyle } from "../../../Components";
import {
  Body1,
  Headline1,
  Headline2,
  SubTitle1,
  SubTitle2
} from "../../../lib/styles/mixin";

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  h1 {
    ${Headline1}
    line-height: 1;
    ${({ theme }) => theme.device.mobile} {
      font-size: 4.2rem;
    }
  }
  button {
    cursor: pointer;
    padding: 0.5rem 2rem;
    border: 0;
    font-size: 2.8rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    border-radius: 0.3rem;
    background-color: ${(props) => props.theme.color.gray300};
  }
`;
export const MenuListWrapper = styled.div`
  margin: 1rem 0;
`;
export const MenuListItemBox = styled.div`
  display: grid;
  grid-template-columns: 20% 50% 30%;
  padding: 0.5rem 0;
  border-bottom: 1px solid black;
  img {
    border: 1px solid;
    border-color: ${(props) => props.theme.color.gray300};
  }
  div {
    /* display: grid; */
    padding: 0 0.5rem;
  }
  h2 {
    ${SubTitle1}
    font-weight: bold;
    padding: 1.3rem 0 0.8rem 0;
  }
  p {
    ${Body1}
    padding: 0.3rem 0;
  }
  span {
    vertical-align: super;
    padding: 0.5rem;
  }
  .price {
    margin-top: 1rem;
    ${SubTitle2}
  }
`;
export const DeleteButton = styled(ButtonDefaultStyle)`
  background-color: ${(props) => props.theme.color.gray300};
`;
export const ResetButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const ResetButton = styled(ButtonDefaultStyle)`
  text-align: center;
  background-color: ${(props) => props.theme.color.primary500};
`;
export const AddCountButton = styled(ButtonDefaultStyle)`
  background-color: unset;
  color: ${(props) => props.theme.color.primary500};
  font-size: 2.3rem;
  vertical-align: middle;
`;
export const MinusCountButton = styled(ButtonDefaultStyle)`
  background-color: unset;
  color: ${(props) => props.theme.color.error500};
  font-size: 2.3rem;
  vertical-align: middle;
`;

// Modal
export const PaymentBox = styled.div`
  h1 {
    text-align: center;
  }
  h2 {
    ${Headline2};
  }
  h3 {
    ${SubTitle1};
  }
  h4 {
    ${SubTitle2};
    font-weight: 700;
  }
  span {
    ${Body1};
  }
  p {
    ${Body1};
    font-weight: 700;
  }
`;
export const MenuBox = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid black;
  text-align: right;
  span:nth-child(3n-2) {
    text-align: left;
  }
`;
export const BtnGroup = styled.div`
  text-align: center;
  margin-top: 1rem;
`;
export const ConfirmButton = styled(ButtonDefaultStyle)`
  background-color: ${(props) => props.theme.color.primary500};
  margin: 0 0.5rem;
`;
export const CancelButton = styled(ButtonDefaultStyle)`
  background-color: ${(props) => props.theme.color.gray300};
  margin: 0 0.5rem;
`;
