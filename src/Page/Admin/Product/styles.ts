import { IconButton } from "@/Components/UI/Atoms";
import styled, { css } from "styled-components";
import { Body2, Headline2, SubTitle2 } from "@/lib/styles";
import { IAdminMenuProps } from "../interface";
import { OptionValue } from "@/lib/state";

export const ManageProductContainer = styled.div``;

export const ManageProductHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    margin: 1rem 0;
    font-size: 2.3rem;
    font-weight: 900;
  }
  div {
    display: flex;
    align-items: center;
    p {
      font-size: 1.8rem;
      color: ${(props) => props.theme.color.gray400};
    }
  }

  ${({ theme }) => theme.device.tablet} {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const ProductMainPageMenu = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 2.5rem;
  grid-template-columns: repeat(3, 1fr);

  .button-wrapper,
  button {
    overflow: hidden;
  }
  ${({ theme }) => theme.device.tablet} {
    grid-template-columns: 1fr;
  }
`;

export const MenuBasicSquareButton = styled.button<IAdminMenuProps>`
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

export const ProductMenuButtonContainer = styled.div`
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

export const LinkToStaffWindowButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
  span {
    display: inline-block;
    font-weight: normal;
    font-size: 1.2rem;
    &:first-child {
      font-size: 3rem;
      font-weight: bold;
    }
  }
`;

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

export const ProductList = styled.ul`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(20rem, auto);
  ${({ theme }) => theme.device.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${({ theme }) => theme.device.mobile} {
    grid-template-columns: unset;
  }
`;

export const ManageOptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  ${({ theme }) => theme.device.tablet} {
    flex-wrap: wrap;
  }
  ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ProductListPageButtonContainer = styled.div<{
  options: OptionValue;
}>`
  display: flex;
  align-items: center;
  ${({ options }) => {
    if (options !== "NONE") {
      return css`
        visibility: hidden;
      `;
    }
  }}
`;

export const CreateProductButton = styled(IconButton)``;
export const DeleteProductButton = styled(IconButton)`
  &:hover {
    color: ${(props) => props.theme.color.error600};
  }
`;

export const ProductDetailPageContainer = styled.div`
  box-sizing: border-box;
  display: grid;
  width: 100%;
  height: calc(100vh - 7rem);
  grid-template-columns: 1fr 1fr;
  ${({ theme }) => theme.device.tablet} {
    display: block;
    grid-template-columns: unset;
  }
`;

export const BasicInfoContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  ${({ theme }) => theme.device.tablet} {
    grid-template-rows: unset;
    grid-auto-rows: minmax(30rem, auto);
  }
  ${({ theme }) => theme.device.mobile} {
    grid-auto-rows: unset;
  }
`;

export const ImageContainer = styled.div`
  box-sizing: border-box;
  padding: 1rem;
  div {
    overflow: hidden;
    border-radius: 2rem;
  }
`;

export const ContainerDefaultStyle = styled.div`
  box-sizing: border-box;
  padding: 1rem;
  h2 {
    font-size: 1.8rem;
    font-weight: 900;
    color: ${({ theme }) => theme.color.primary700};
    margin-bottom: 0.7rem;
  }
  .info-box {
    display: flex;
    align-items: center;
    span,
    ul {
      ${SubTitle2};
      margin-left: 1rem;
      span,
      li {
        span {
          &:not(:first-child) {
            margin-left: 1rem;
          }
        }
        margin: 0;
      }
    }
    h3 {
      ${Headline2};
      line-height: 1.5;
    }
  }
  .button-box {
    display: flex;
  }
`;

export const InfoContainer = styled(ContainerDefaultStyle)`
  .info-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    ul {
      display: flex;
      li {
        font-weight: 700;
        font-size: 2.4rem;
        &:not(:first-child) {
          margin-left: 1.4rem;
        }
      }
    }
    span {
      font-size: 2rem;
      strong {
        font-size: 2.4rem;
        font-weight: 700;
      }
    }
  }
`;
export const SalesInfoContainer = styled(BasicInfoContainer)``;
export const SalesInfoSummuryContainer = styled(ContainerDefaultStyle)`
  div:first-child {
    margin-bottom: 2rem;
  }
`;
export const SalesInfoGraphContainer = styled(ContainerDefaultStyle)``;
