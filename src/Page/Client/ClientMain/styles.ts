import styled, { css } from "styled-components";
import { Headline1, SubTitle1 } from "@/lib/styles";
import { IAdminMenuProps } from "@/Page/Admin/interface";

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

export const MenuButtonDefault = styled.button<IAdminMenuProps>`
  box-sizing: border-box;
  border: 0;
  border-radius: 0.6rem;
  width: 100%;
  height: 70vh;
  cursor: pointer;
  font-size: 3rem;
  font-weight: bold;
  word-break: keep-all;
  color: ${(props) => props.theme.color.fontColorWhite};
  position: relative;
  background-color: black;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    transform: scale(1);
    width: 100%;
    height: 100%;
    background-image: ${(props) => `url(${props.image})`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.4;
    content: "";
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    &::before {
      ${(props) => {
        if (!props.disabled) {
          return css`
            transform: scale(1.2);
          `;
        }
      }}
    }
  }
  ${({ theme }) => theme.device.tablet} {
    height: 30rem;
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
