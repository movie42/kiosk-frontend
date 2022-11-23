import { StoreList, Wrapper } from "../styles";
import useGetMyStore from "../hooks/useGetMyStore";
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
