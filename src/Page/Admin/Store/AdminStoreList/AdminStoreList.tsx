import { StoreList, Wrapper } from "../styles";
import { useGetMyStore } from "@/Page/Admin/hooks";
import AdminStoreListHeader from "./AdminStoreListHeader";
import AdminStoreListItem from "./AdminStoreListItem";

const AdminStoreList = () => {
  const { store } = useGetMyStore();

  return (
    <Wrapper>
      <AdminStoreListHeader store={store} />
      <StoreList>
        <AdminStoreListItem store={store} />
      </StoreList>
    </Wrapper>
  );
};

export default AdminStoreList;
