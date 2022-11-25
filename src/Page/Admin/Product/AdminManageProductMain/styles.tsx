import styled from "styled-components";
import { Body2 } from "@/lib/styles";
import { IAdminMenuProps } from "../../interface";

export const Wrapper = styled.div``;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.device.tablet} {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const Menu = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 2.5rem;
  grid-template-columns: repeat(3, 1fr);

  .button-wrapper,
  button {
    overflow: hidden;
    width: 100%;
  }
  ${({ theme }) => theme.device.tablet} {
    grid-template-columns: 1fr;
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
      transform: scale(1.2);
    }
  }
  ${({ theme }) => theme.device.tablet} {
    height: 30rem;
  }
`;

export const MenuButtonWrapper = styled.div`
  position: relative;
  .store-state-container {
    padding: 1rem;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.color.fontColorWhite};
    p {
      margin-right: 1rem;
      ${Body2}
    }
  }
`;
export const BusinessManageButtonWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  gap: 0.8rem;
  overflow: hidden;
`;

export const LinkToStaffWindowButton = styled(MenuButtonDefault)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LinkToProductManageWindowButton = styled(MenuButtonDefault)``;

export const BusinessInfoContainer = styled.div`
  span {
    ${Body2}
    &:not(:first-child) {
      margin-left: 1rem;
    }
    strong {
      font-weight: bold;
    }
  }
  ${(props) => props.theme.device.mobile} {
    display: grid;
    span {
      &:first-child {
        grid-column: 1/2;
      }
      &:nth-child(2) {
        grid-column: 2/2;
      }
      &:last-child {
        grid-column: 1 / span 2;
        margin-left: 0;
      }
    }
  }
`;

export const LinkToCustomerWindowButton = styled(MenuButtonDefault)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${(props) =>
    props.isActive
      ? props.theme.color.backgroundBlack100
      : props.theme.color.gray300};

  span {
    display: inline-block;
    font-weight: normal;
    font-size: 1.2rem;
    &:first-child {
      font-size: 3rem;
      font-weight: bold;
    }
  }
  &:hover {
    &::before {
      ${(props) =>
        props.isActive ? "transform: scale(1.2)" : "transform:scale(1)"}
    }
  }
`;
