import { PageHeader } from "@/Components";
import { storeStateProps } from "@/lib/state";
import { MdAddCircle } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

import { AddStoreButton, Header } from "../../../Page/Admin/Store/styles";

interface Props {
  store?: storeStateProps[];
}

const AdminStoreListHeader = ({ store }: Props) => {
  const { userId } = useParams();
  return (
    <Header>
      <PageHeader
        header="가게목록"
        message={
          store?.length !== 0
            ? "가게를 선택하세요."
            : "아직 등록된 가게가 없습니다."
        }
      />
      <AddStoreButton>
        <MdAddCircle />
        <Link to={`/admin/${userId}/store/create`}>가게등록</Link>
      </AddStoreButton>
    </Header>
  );
};

export default AdminStoreListHeader;
