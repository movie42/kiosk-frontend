import styled, { css } from "styled-components";
import { Headline2 } from "@/lib/styles/mixin";
import { IconButton } from "../../Atoms";

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

export const TransparentsBackground = styled.span`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.color.backgroundBlack80};
`;

export const CloseIcon = styled(IconButton)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 10;
  svg {
    font-size: 3rem;
    font-weight: bold;
  }
`;

export const LinkContainer = styled.nav`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 40vw;
  min-width: 20rem;
  max-width: 35rem;
  z-index: 100;
  padding: 0.8rem;
  background-color: ${(props) => props.theme.color.background100};
  ul {
    padding-left: 2rem;
    li {
      a {
        ${Headline2}
        font-weight: 500;
        text-decoration: unset;
        color: ${(props) => props.theme.color.fontColorBlack};
        &:hover {
          color: ${(props) => props.theme.color.primary700};
        }
      }
    }
  }
  ${({ theme }) => theme.device.tablet} {
    width: 70vw;
    min-width: unset;
    max-width: unset;
  }
  ${({ theme }) => theme.device.mobile} {
    width: 100vw;
    min-width: unset;
    max-width: unset;
  }
`;

export const Item = styled.li<{ isActive: boolean }>`
  ${({ isActive, theme }) => {
    if (isActive) {
      return css`
        a {
          color: ${theme.color.primary700} !important;
        }
      `;
    }
  }}
`;
