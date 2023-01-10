/* eslint-disable */
import React from "react";

import { motion } from "framer-motion";
import { Images, Noimage } from "../../Atoms";
import { translateLocalCurrency } from "@/lib/utils";
import { imageBoxVariants, Item, ItemWrapper } from "./styles";
import { OptionValue } from "@/lib/state";

interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  itemId?: number;
  price?: number;
  name?: string;
  imageUrl?: string | null;
  selected?: boolean;
  itemHandler?: any;
  selectOption?: OptionValue;
}

const ListItem = ({
  itemId,
  price,
  name,
  imageUrl,
  selected,
  itemHandler,
  selectOption,
  ...props
}: ListItemProps) => {
  return (
    <ItemWrapper {...props}>
      {props.children}
      {name && (
        <Item data-id={itemId}>
          {selectOption && selectOption !== "NONE" && !selected && (
            <span className="is-select"></span>
          )}
          <div className="item-container">
            <div className="image-container">
              <span className="transparent-box"></span>
              {imageUrl ? (
                <motion.div variants={imageBoxVariants} whileHover="hover">
                  <Images src={imageUrl} alt={name} />
                </motion.div>
              ) : (
                <Noimage />
              )}
            </div>
            <div className="item-info-container">
              <h3>{name}</h3>
              {price && <h4>{translateLocalCurrency(price, "ko-KR")}원</h4>}
            </div>
          </div>
        </Item>
      )}
    </ItemWrapper>
  );
};

export default ListItem;
