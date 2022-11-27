import { Loading } from "@/Components";
import { useGetStores } from "../hooks";
import { StoreList, Wrapper } from "./styles";

import { AdminStoreListHeader, StoreListItem } from "@/Components";

const StoreListPage = () => {
  // TODO: 서버 에러인듯 한데 원인 파악을 해보면 myStroe를 요청하면 userId 를 가져와야하는데 가져오지를 못한다...
  const { data: stores, isLoading } = useGetStores();

  return (
    <Wrapper>
      {isLoading && <Loading title="가게 정보를 불러오고 있습니다." />}
      <AdminStoreListHeader store={stores} />
      <StoreList>
        {stores?.map((store) => (
          <StoreListItem key={store.id} store={store} />
        ))}
      </StoreList>
    </Wrapper>
  );
};

export default StoreListPage;
