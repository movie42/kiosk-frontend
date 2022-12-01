import {
  BasicSquareButton,
  InputDefault,
  LabelDefault
} from "@/Components/UI/Atoms";
import styled, { css } from "styled-components";
import { Body2, Headline2, SubTitle2 } from "@/lib/styles";
import { IAdminMenuProps } from "../interface";
import { OptionValue } from "@/lib/state";

export const CreateProductContainer = styled.div`
  margin-bottom: 8rem;
  form {
    fieldset {
      padding: 0.8rem;
      margin-bottom: 1rem;
      .product-input-container {
        display: grid;
        grid-template-columns: 20% 80%;
        padding: 1rem 0;
        &:not(:last-child) {
          border-bottom: 1px solid ${(props) => props.theme.color.gray300};
        }
        label {
          font-size: 2rem;
          align-self: center;
          font-weight: 700;
          align-self: flex-start;
        }
        input {
          font-size: 2rem;
          border: 0;
          align-self: center;
          outline: none;
        }
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        textarea {
          border: 0;
          font-size: 2rem;
          align-self: center;
          resize: none;
          height: 8vh;
          outline: none;
          &::placeholder {
            font-size: 2rem;
          }
        }
      }
    }
  }
  ${({ theme }) => theme.device.mobile} {
    form {
      fieldset {
        .product-input-container {
          label {
            font-size: 1.6rem;
          }
          input {
            font-size: 1.6rem;
          }
        }
      }
    }
  }
`;

export const CreateProductHeader = styled.div`
  display: flex;
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
`;

export const AddimageUrl = styled(InputDefault)`
  display: none;
`;

export const AddimageUrlLabel = styled(LabelDefault)`
  cursor: pointer;
  color: ${(props) => props.theme.color.primary700};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.8rem;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  color: ${(props) => props.theme.color.fontColorBlack};
  font-size: 2rem;
  border-top: 1px solid ${(props) => props.theme.color.gray300};
  button {
    cursor: pointer;
    border: 0;
    font-size: 2rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    border-radius: 0.3rem;
    line-height: 2.8rem;
  }
  ${({ theme }) => theme.device.mobile} {
    justify-content: center;
  }
`;

export const CreateButton = styled(BasicSquareButton)`
  background-color: ${(props) => props.theme.color.primary600};
`;

export const CancelButton = styled(BasicSquareButton)`
  color: ${(props) => props.theme.color.fontColorWhite};
  margin-right: 0.3rem;
`;

export const ModalChildren = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OptionsField = styled.div`
  .option-input-container,
  .add-option-button-container {
    display: grid;
    grid-template-columns: 20% 80%;
    padding: 1rem 0;
    button {
      cursor: pointer;
      text-align: left;
      padding: 0;
      margin: 0;
      &:hover {
        color: ${(props) => props.theme.color.primary300};
      }
    }
    &:not(:first-child) {
      border-bottom: 1px solid ${(props) => props.theme.color.gray300};
    }
    label {
      font-size: 2rem;
      align-self: center;
      font-weight: 700;
    }
    input {
      font-size: 2rem;
      border: 0;
      align-self: center;
      outline: none;
    }

    .option-label-button-container {
      display: flex;
      align-items: center;
      justify-content: space-around;
      button {
        cursor: pointer;
        font-size: 2rem;
        text-align: left;
        border: 0;
        background-color: unset;
        padding: 0;
        margin: 0;
        color: ${(props) => props.theme.color.error500};
        &:hover {
          color: ${(props) => props.theme.color.error900};
        }
        span {
          position: absolute;
          margin: -1px;
          top: 0;
          left: 0;
          visibility: hidden;
        }
      }
    }
  }
  .add-button {
    cursor: pointer;
    border: unset;
    background-color: unset;
    font-size: 2rem;
    color: ${(props) => props.theme.color.primary700};
    span {
      visibility: hidden;
    }
  }
  ${({ theme }) => theme.device.mobile} {
    .option-input-container,
    .add-option-button-container {
      label {
        font-size: 1.6rem;
      }
      input {
        font-size: 1.6rem;
      }
    }
    .option-input-container {
      grid-template-columns: 30% 70%;
    }
  }
`;

// TODO: 모달 다 옮기면 삭제하기
export const ModalButtonContainer = styled.div`
  display: flex;
  align-self: flex-end;
  button {
    cursor: pointer;
    font-size: 2rem;
    border: 0;
    padding: 0.8rem 1.3rem;
    border-radius: 0.5rem;
    color: ${(props) => props.theme.color.fontColorWhite};

    &.modal-cancel-button {
      background-color: ${(props) => props.theme.color.gray200};
    }

    &.modal-confirm-button {
      background-color: ${(props) => props.theme.color.primary600};
    }

    &:not(:first-child) {
      margin-left: 0.8rem;
    }
  }
`;

export const ProductMainContainer = styled.div``;

export const ProductMainPageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
    width: 100%;
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

export const ProductListPageContainer = styled.div``;

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

export const ButtonItemWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 2.5rem;
  &:not(:first-child) {
    margin-left: 0.7rem;
  }
  button {
    color: ${({ theme }) => theme.color.fontColorBlack};
    background-color: unset;
    padding: 0;
    padding-left: 0.5rem;
  }
`;

export const CreateProductButton = styled(BasicSquareButton)``;
export const DeleteProductButton = styled(BasicSquareButton)``;

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
