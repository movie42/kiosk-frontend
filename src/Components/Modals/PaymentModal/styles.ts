import { ButtonDefault } from "@/Components/Buttons";
import { Headline2, SubTitle1, SubTitle2, Body1 } from "@/lib/styles";
import styled from "styled-components";

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
export const ConfirmButton = styled(ButtonDefault)`
  background-color: ${(props) => props.theme.color.primary500};
  margin: 0 0.5rem;
`;
export const CancelButton = styled(ButtonDefault)`
  background-color: ${(props) => props.theme.color.gray300};
  margin: 0 0.5rem;
`;
