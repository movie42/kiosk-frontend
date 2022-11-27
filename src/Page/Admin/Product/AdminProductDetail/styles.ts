import { Headline2, SubTitle2 } from "@/lib/styles";
import styled from "styled-components";

export const Wrapper = styled.div`
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
