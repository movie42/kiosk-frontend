/* eslint-disable */
import React from "react";

import styled from "styled-components";
import { motion, Variants } from "framer-motion";
import { OptionValue } from "@/lib/state";
import { Images, Noimage } from "../../Atoms";
import { translateLocalCurrency } from "@/lib/utils";

export const ItemWrapper = styled(motion.li)`
  position: relative;
`;

export const Item = styled(motion.div)<{
  selectOption?: OptionValue;
  selected?: boolean;
}>`
  .item-container {
    position: relative;
    cursor: pointer;
    background-color: ${(props) => props.theme.color.background100};
    height: 100%;
    min-width: 20rem;
    overflow: hidden;
    display: grid;
    grid-template-rows: minmax(12rem, 0.9fr) 0.7fr;
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
      background-color: ${(props) =>
        props.selected ? "unset" : props.theme.color.background80};
      z-index: 11;
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
      ${({ theme }) => theme.device.tablet} {
        padding: 2rem;
      }
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

export const boxVariants: Variants = {
  init: { scale: 1 },
  hover: {
    scale: 1,
    transition: {
      duration: 0.4
    }
  }
};
export const imageBoxVariants: Variants = {
  init: { scale: 1 },
  hover: {
    scale: 2,
    transition: {
      duration: 0.4
    }
  }
};

type ListProps = React.LiHTMLAttributes<HTMLLIElement>;

interface ListItemProps extends ListProps {
  itemId?: number;
  price?: number;
  name?: string;
  imageUrl?: string | null;
  selectOption?: any;
  selected?: any;
  itemHandler?: any;
}

const ListItem = ({ ...props }: ListItemProps) => {
  return (
    <ItemWrapper
      variants={boxVariants}
      initial="init"
      whileHover="hover"
      onClick={props.onClick}
    >
      {props.children}
      {props.name && (
        <Item data-id={props.itemId}>
          <div className="item-container">
            <div className="image-container">
              {/* {props.selectOption && props.selectOption.options !== "NONE" && (
                <span className="is-select"></span>
              )} */}
              <span className="transparent-box"></span>
              {props.imageUrl ? (
                <motion.div variants={imageBoxVariants} whileHover="hover">
                  <Images src={props.imageUrl} alt={props.name} />
                </motion.div>
              ) : (
                <Noimage />
              )}
            </div>
            <div className="item-info-container">
              <h3>{props.name}</h3>
              {props.price && (
                <h4>{translateLocalCurrency(props.price, "ko-KR")}원</h4>
              )}
            </div>
          </div>
        </Item>
      )}
    </ItemWrapper>
  );
};

export default ListItem;
