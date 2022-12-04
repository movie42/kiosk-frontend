import styled from "styled-components";

export const Button = styled.button`
  cursor: pointer;
  font-size: 2.5rem;
  border: 0;
  padding: 0.8rem 1.3rem;
  border-radius: 0.3rem;
  color: ${(props) => props.theme.color.fontColorWhite};
  background-color: ${(props) => props.theme.color.gray300};
`;

export const IconButtonContainer = styled.button`
  cursor: pointer;
  font-size: 2.5rem;
  border: 0;
  color: ${({ theme: { color } }) => color.gray700};
  background-color: unset;
  &:hover {
    color: ${({ theme: { color } }) => color.primary800};
  }
`;

export const ButtonItemContainer = styled.div`
  display: flex;
  align-items: center;
  svg {
    font-size: 2.3rem;
    padding-top: 0.3rem;
    margin-right: 0.3rem;
  }
`;
