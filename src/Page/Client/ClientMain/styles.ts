import styled from "styled-components";
import { Headline1, SubTitle1 } from "@/lib/styles";
import { MenuButtonDefault } from "@/Page/Admin/Product/AdminManageProductMain";

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
export const Wrapper = styled.div`
  h2 {
    ${SubTitle1}
  }
`;

export const OrderingMethod = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 2.5rem;
  grid-template-columns: repeat(2, 1fr);
  .button-wrapper {
    overflow: hidden;
    width: 100%;
  }
  ${({ theme }) => theme.device.tablet} {
    grid-template-columns: 1fr;
  }
`;

export const OrderingButton = styled(MenuButtonDefault)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
