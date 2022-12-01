import styled, { css } from "styled-components";

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

export const ButtonItemContainer = styled.div<{ hidden: boolean }>`
  display: flex;
  align-items: center;
  svg {
    font-size: 2.3rem;
    padding-top: 0.3rem;
    margin-right: 0.3rem;
  }
  ${({ hidden }) => {
    if (hidden) {
      return css`
      span{
            position: absolute;
            top:0;
            left:0;
            width:1px;
            height:1px
            margin: -1px -1px;
            
        }
      `;
    }
  }}
`;
