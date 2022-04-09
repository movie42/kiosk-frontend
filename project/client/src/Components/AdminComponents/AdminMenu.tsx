import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div``;

const AdminMenu = () => {
  return (
    <Wrapper>
      <ul>
        <li>
          <Link to="#">고객 주문 화면</Link>
        </li>
        <li>
          <Link to="#">스탭 주문 화면</Link>
        </li>
        <li>
          <Link to="/admin/1/manage-product">메뉴 관리하기</Link>
        </li>
      </ul>
    </Wrapper>
  );
};

export default AdminMenu;
