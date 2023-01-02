/* eslint-disable */
import React from "react";

import { motion } from "framer-motion";
import { Images, Noimage } from "../../Atoms";
import { translateLocalCurrency } from "@/lib/utils";
import { boxVariants, imageBoxVariants, Item, ItemWrapper } from "./styles";

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
