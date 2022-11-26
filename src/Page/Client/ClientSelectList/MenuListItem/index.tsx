/* eslint-disable */
import { Images, Noimage } from "@/Components";
import { MenuListItemProps } from "../../types";
import { MenuListItemBox } from "../styles";
import MenuListItemDetail from "./MenuListItemDetail";
import RemoveMenuListItem from "./RemoveMenuListItem";

const MenuListItem: React.FC<MenuListItemProps> = ({ item }) => {
  return (
    <MenuListItemBox>
      {item.imageUrl ? (
        <div style={{ padding: "0.5rem 1rem 0.5rem 0" }}>
          <Images src={item.imageUrl} alt={item.name} />
        </div>
      ) : (
        <Noimage />
      )}
      <MenuListItemDetail item={item} />
      <RemoveMenuListItem item={item} />
    </MenuListItemBox>
  );
};

export default MenuListItem;
