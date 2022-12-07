import styled from "styled-components";
import { BasicSquareButton, IconButton } from "@/Components/UI/Atoms";
import { Body1, Body2, Headline1, SubTitle1, SubTitle2 } from "@/lib/styles";

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
export const MenuListWrapper = styled.div`
  margin: 1rem 0;
`;

export const MenuListItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 20% 50% 30%;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid black;
  img {
    border: 1px solid;
    border-color: ${(props) => props.theme.color.gray300};
  }
  h2 {
    ${SubTitle1}
    font-weight: bold;
  }
  span {
    vertical-align: super;
  }
  .price {
    ${SubTitle2}
  }
`;

export const ListItemDetailBox = styled.div`
  padding-left: 2rem;
  ${Body1}
`;
export const RemoveItemBox = styled.div`
  padding-left: 1rem;
  ${Body2}
`;
export const CountBox = styled.div`
  display: flex;
`;
export const DeleteButton = styled(BasicSquareButton)`
  background-color: ${(props) => props.theme.color.gray300};
`;
export const ResetButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const ResetButton = styled(BasicSquareButton)`
  text-align: center;
  background-color: ${(props) => props.theme.color.primary500};
`;
export const AddCountButton = styled(IconButton)`
  color: ${({ theme: { color } }) => color.primary500};
`;

export const MinusCountButton = styled(IconButton)`
  color: ${({ theme: { color } }) => color.error500};
  &:hover {
    color: ${({ theme: { color } }) => color.error800};
  }
`;
