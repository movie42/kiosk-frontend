import { ButtonDefault, InputDefault, LabelDefault } from "@/Components";
import styled from "styled-components";

export const Container = styled.div`
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
          height: 40vh;
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

export const CreateButton = styled(ButtonDefault)`
  background-color: ${(props) => props.theme.color.primary600};
`;

export const CancelButton = styled(ButtonDefault)`
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
