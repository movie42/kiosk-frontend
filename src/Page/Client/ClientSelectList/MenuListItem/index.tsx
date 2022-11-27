/* eslint-disable */
import { Images, Noimage } from "@/Components";
import { IOrderSelectedItem } from "@/lib/state/productItemState";
import { MenuListItemBox } from "../styles";
import MenuListItemDetail from "./MenuListItemDetail";
import RemoveMenuListItem from "./RemoveMenuListItem";

interface MenuListItemProps {
  item: IOrderSelectedItem;
}

const MenuListItem = ({ item }: MenuListItemProps) => {
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
