import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { productListState, ProductListValues, userState } from "@/lib/state";
import graphqlReqeustClient from "@/lib/graphqlRequestClient";
import { useGetProductsQuery } from "@/lib/generated/graphql";
import { Images, Loading, Noimage } from "@/Components";
import { Item } from "./styles";

interface MenuListProps {
  storeId: string | undefined;
  selectHandler: (menuId: number) => void;
}

const MenuList: React.FC<MenuListProps> = ({ storeId, selectHandler }) => {
  const [menuList, setMenuList] = useRecoilState(productListState);
  const { accessToken } = useRecoilValue(userState);

  const { isLoading } = useGetProductsQuery(
    graphqlReqeustClient(accessToken),
    {
      id: Number(storeId)
    },
    {
      onSuccess: (data) => {
        if (data.store?.products) {
          const productList = data.store.products
            .map<ProductListValues>((value) => ({
              id: Number(value.id),
              name: value.name,
              price: value.price,
              imageUrl: value.imageUrl,
              description: value.description,
              options: value.options.map((value) => ({
                id: Number(value.id),
                name: value.name
              })),
              isAvailable: value.isAvailable
            }))
            .filter((value) => value.isAvailable === true);
          setMenuList(productList);
        }
      }
    }
  );

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
