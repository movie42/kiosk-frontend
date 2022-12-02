import styled from "styled-components";
import { ButtonDefault } from "@/Components/UI/Atoms";
import { SubTitle2 } from "@/lib/styles";

export const Wrapper = styled.div`
  position: relative;
  color: ${(props) => props.theme.color.fontColorBlack};
  .image-container {
    overflow: hidden;
    position: relative;
    height: 25rem;
    .transparent-box {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-color: ${({ theme }) => theme.color.backgroundBlack60};
    }
  }
  .item-info-container {
    align-self: center;
    padding: 2rem;
    .item-title {
      ${SubTitle2}
    }
    h4 {
      font-size: 2rem;
      align-self: end;
    }
  }
  .warning {
    position: absolute;
    top: -3.5rem;
    right: 0.5rem;
    font-size: 2rem;
    color: red;
  }
`;

export const ItemNameContainer = styled.div`
  display: flex;
  font-size: 1.4rem;
  font-weight: 600;
  padding: 0.5rem;
  align-items: center;
  color: ${({ theme }) => theme.color.fontColorWhite};
  margin: 0.4rem;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  h2 {
    margin-left: 0.5rem;
  }
`;
export const OptionButton = styled(ButtonDefault)<{ selected?: boolean }>`
  background-color: ${(props) =>
    props.selected ? props.theme.color.primary800 : props.theme.color.gray300};
  margin-right: 1rem;
  font-size: 1.6rem;
  flex-grow: 1;
`;
export const OrderContainer = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 50px 0.5fr 50px 1fr 1fr;
  column-gap: 10px;
  align-items: center;
`;
export const OptionContainer = styled.div`
  display: flex;
`;
export const CancelButton = styled(ButtonDefault)`
  background-color: ${(props) => props.theme.color.gray300};
  padding: 0.8rem;
  font-family: "Noto Sans KR";
`;
export const OrderButton = styled(ButtonDefault)`
  background-color: ${(props) => props.theme.color.primary800};
  padding: 0.8rem;
  font-family: "Noto Sans KR";
`;

export const Title = styled.h4<{ composition?: boolean }>`
  font-size: 1.7rem;
  font-weight: bold;
  margin: ${(props) =>
    props.composition ? "0.5rem 0 0.5rem" : "2rem 0 0.5rem"};
`;
export const ProductCount = styled.span`
  font-size: 2rem;
  font-weight: bold;
  margin: 0 1.5rem 0.8rem;
  text-align: center;
`;
