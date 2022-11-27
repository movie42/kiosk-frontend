import { Images, Loading, Noimage } from "@/Components";
import { Item } from "./styles";
import { ProductListValues } from "@/lib/state/productItemState";

interface MenuListProps {
  isLoading: boolean;
  menuList: ProductListValues[] | undefined;
  selectHandler: (menuId: number) => void;
}

const MenuList = ({ isLoading, menuList, selectHandler }: MenuListProps) => {
  if (isLoading) return <Loading title="등록한 상품을 불러오고 있습니다." />;

  return (
    <ul className="productList">
      {menuList &&
        menuList.map((item) => (
          <Item key={item.id} onClick={() => selectHandler(item.id)}>
            <div className="item-container">
              <div className="image-container">
                {item.imageUrl ? (
                  <Images src={item.imageUrl} alt={item.name} />
                ) : (
                  <Noimage />
                )}
              </div>
              <div className="item-info-container">
                <h3>{item.name}</h3>
                <h4>가격 {item.price.toLocaleString()}원</h4>
              </div>
            </div>
          </Item>
        ))}
    </ul>
  );
};

export default MenuList;
