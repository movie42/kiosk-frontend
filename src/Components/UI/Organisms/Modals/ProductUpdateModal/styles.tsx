import styled from "styled-components";
import {
  InputDefault,
  LabelDefault,
  BasicSquareButton
} from "@/Components/UI/Atoms";

export const FieldSet = styled.fieldset`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  padding: 1rem 1rem;
  border: 1px solid ${(props) => props.theme.color.gray200};
`;

export const FieldContainer = styled.div`
  display: grid;
  margin-bottom: 0.7rem;
  &:not(:last-child) {
    grid-template-columns: 2.5fr 8fr;
    border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  }
  label,
  input,
  textarea {
    margin: 0;
    padding: 0;
    font-size: 1.8rem;
    border: 0;
    outline: unset;
  }

  input {
    width: 100%;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  textarea {
    width: 100%;
    height: 9rem;
    resize: none;
  }
`;

export const OptionFieldContainer = styled.div`
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
      font-size: 1.8rem;
      align-self: center;
    }
    input {
      font-size: 1.8rem;
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
        font-size: 1.8rem;
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

export const ImageContainer = styled.div`
  margin: 0 auto;
  width: 50%;
`;

export const AddThumbnail = styled(InputDefault)`
  display: none;
`;

export const AddThumbnailLabel = styled(LabelDefault)`
  cursor: pointer;
  color: ${(props) => props.theme.color.primary700};
`;

export const Wrapper = styled.div`
  display: grid;
  overflow-y: hidden;
  grid-template-rows: 1fr 5fr 0.5fr;
`;

export const StateInfoContainer = styled.div`
  margin-bottom: 1rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  button {
    cursor: pointer;
    font-size: 2rem;
    border: 0;
    padding: 0.8rem 1.3rem;
    border-radius: 0.5rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    &.cancel-button {
      background-color: ${(props) => props.theme.color.gray200};
      margin-right: 0.8rem;
    }
    &.confirm-button {
      background-color: ${(props) => props.theme.color.secondary500};
    }
  }
`;

export const FormContainer = styled.div`
  box-sizing: border-box;
  overflow-y: auto;
  form {
    box-sizing: border-box;
  }
`;

export const ConfirmButton = styled(BasicSquareButton)<{
  isSuccess?: boolean;
}>`
  background-color: ${(props) => props.theme.color.error500};
`;
