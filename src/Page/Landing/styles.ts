import styled from "styled-components";
import { Headline1 } from "@/lib/styles";
import { BasicSquareButton } from "@/Components/UI/Atoms";

export const LandingWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  :before {
    content: "";
    top: 0;
    right: 0;
    width: 33%;
    height: 100vh;
    position: absolute;
    background: url("https://source.unsplash.com/random/?salad") no-repeat
      center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    z-index: -1;
  }
  h1 {
    ${Headline1}
    line-height: 1.3;
  }
`;

export const LandingContainer = styled.div`
  width: 50%;
  padding: 1rem 2rem;
  h1 {
    font-size: 5.5rem;
    font-weight: 900;
    letter-spacing: -0.2;
    word-break: keep-all;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
`;

export const LandingTitle = styled.h2`
  font-size: 1.2rem;
  line-height: 2;
`;

export const LinkButton = styled(BasicSquareButton)`
  color: #000;
  font-weight: bold;
  background: none;
  padding-left: 0;
`;
