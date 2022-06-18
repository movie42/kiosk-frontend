import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import PageHeaderMessage from "../../../Components/PageHeader";
import ButtonDefaultStyle from "../../../Components/Buttons/ButtonDefault";
import { MdAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../../state/userState";

interface IAdminStoreListProps {}

const Wrapper = styled.div``;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AddStoreButton = styled(ButtonDefaultStyle)`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.color.fontColorBlack};
  background-color: unset;
  span {
    margin-left: 0.5rem;
  }
`;

const AdminStoreList = () => {
  const user = useRecoilValue(userState);

  return (
    <Wrapper>
      <Header>
        <PageHeaderMessage
          header="가게목록"
          message="아직 등록된 가게가 없습니다."
        />
        <AddStoreButton>
          <MdAddCircle />
          <Link to={`/admin/${user.id}/store/create`}>가게등록</Link>
        </AddStoreButton>
      </Header>
    </Wrapper>
  );
};

export default AdminStoreList;
