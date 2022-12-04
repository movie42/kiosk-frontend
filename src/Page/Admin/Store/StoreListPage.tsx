import { useGetStores } from "../hooks";
import { Wrapper } from "./styles";

import { AdminStoreListHeader } from "@/Components/UI/Organisms";
import { Loading, StoreListItem } from "@/Components/UI/Molecules";
import { List } from "@/Components/UI/Molecules/ListItem/styles";

const StoreListPage = () => {
  const { data: stores, isLoading } = useGetStores();

  return (
    <Wrapper>
      {isLoading && <Loading title="가게 정보를 불러오고 있습니다." />}
      <AdminStoreListHeader store={stores} />
      <List>
        {stores?.map((store) => (
          <StoreListItem key={store.id} store={store} />
        ))}
      </List>
    </Wrapper>
  );
};

export default StoreListPage;
