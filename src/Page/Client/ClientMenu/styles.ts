import styled from "styled-components";
import { ButtonDefault } from "@/Components";
import { Headline1, SubTitle2 } from "@/lib/styles";

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

export const Container = styled.div`
  ul.productList {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(20rem, auto);
  }
`;
export const SubTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  padding: 0.8rem 0 1.3rem 0;
`;

export const Item = styled.li`
  .item-container {
    position: relative;
    cursor: pointer;
    background-color: ${(props) => props.theme.color.background100};
    height: 100%;
    min-width: 20rem;
    overflow: hidden;
    display: grid;
    grid-template-rows: minmax(12rem, 0.9fr) 0.8fr;
    border: 1px solid ${({ theme }) => theme.color.gray300};
    border-radius: 0.4rem;
    text-decoration: none;
    color: ${(props) => props.theme.color.fontColorBlack};
    .is-select {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 4;
    }
    .image-container {
      overflow: hidden;
      position: relative;
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
      padding: 0.8rem;
      h3 {
        font-size: 3rem;
        font-weight: bold;
        margin-bottom: 0.6rem;
      }
      h4 {
        font-size: 2rem;
        align-self: end;
      }
    }
  }
`;

// Modal style
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
