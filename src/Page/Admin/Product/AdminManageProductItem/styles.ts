import { ButtonDefault } from "@/Components";
import { Option } from "@/lib/state";
import styled, { css } from "styled-components";

export const Container = styled.div``;

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

export const ButtonContainer = styled.div<{ options: Option }>`
  display: flex;
  align-items: center;
  ${({ options }) => {
    if (options !== Option.NONE) {
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

export const CreateProductButton = styled(ButtonDefault)``;
export const DeleteProductButton = styled(ButtonDefault)``;
