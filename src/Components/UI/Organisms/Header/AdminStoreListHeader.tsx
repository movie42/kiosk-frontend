import { MdAddCircle } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

import { storeStateProps } from "@/lib/state";
import { IconButton } from "@/Components/UI/Atoms";
import { Header } from "@/Page/Admin/Store/styles";
import PageHeader from "./PageHeader";

interface Props {
  store?: storeStateProps[];
}

const AdminStoreListHeader = ({ store }: Props) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const handleMoveToPage = () => {
    navigate(`/admin/${userId}/store/create`);
  };
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
      <IconButton
        ReactIcon={MdAddCircle}
        text="가게등록"
        hidden={false}
        onClick={handleMoveToPage}
      />
    </Header>
  );
};

export default AdminStoreListHeader;
