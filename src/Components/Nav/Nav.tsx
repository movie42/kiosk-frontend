import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { Headline2 } from "../../mixin";
import { NavLinkProps } from "react-router-dom";
import { HTMLElements } from "framer-motion/types/render/html/supported-elements";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const TransparentsBackground = styled.span`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.color.backgroundBlack80};
`;

const CloseIcon = styled(AiOutlineClose)`
  cursor: pointer;
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 2.8rem;
  z-index: 10;
`;

const LinkContainer = styled.nav`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 40vw;
  min-width: 20rem;
  max-width: 35rem;
  z-index: 100;
  padding: 0.8rem;
  background-color: ${(props) => props.theme.color.background100};
  ul {
    li {
      a {
        ${Headline2}
        font-weight: 500;
        text-decoration: unset;
        color: ${(props) => props.theme.color.fontColorBlack};
        &:hover {
          color: ${(props) => props.theme.color.primary700};
        }
      }
    }
  }
`;

interface INavProps {
  setNavState: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Nav = ({ setNavState, children, ...props }: INavProps) => {
  useEffect(() => {
    return () => setNavState(false);
  }, [setNavState]);

  return (
    <Wrapper>
      <LinkContainer>
        <CloseIcon onClick={() => setNavState(false)} />
        <ul onClick={() => setNavState(false)}>{children}</ul>
      </LinkContainer>
      <TransparentsBackground />
    </Wrapper>
  );
};

export default Nav;
