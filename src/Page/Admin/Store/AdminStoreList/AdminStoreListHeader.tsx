import { PageHeader } from "@/Components";
import { storeStateProps, userState } from "@/lib/state";
import { MdAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AddStoreButton, Header } from "../styles";

interface Props {
  store: storeStateProps[];
}

const AdminStoreListHeader = ({ store }: Props) => {
  const user = useRecoilValue(userState);
  return (
    <Header>
      <PageHeader
        header="가게목록"
        message={
          store.length !== 0
            ? "가게를 선택하세요."
            : "아직 등록된 가게가 없습니다."
        }
      />
      <AddStoreButton>
        <MdAddCircle />
        <Link to={`/admin/${user.id}/store/create`}>가게등록</Link>
      </AddStoreButton>
    </Header>
  );
};

export default AdminStoreListHeader;
