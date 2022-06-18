import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Page/Admin/Login/AdminLogin";
import AdminManageProductAddItem from "../Page/Admin/AdminManageProductAddItem";
import AdminManageProductItemList from "../Page/Admin/AdminManageProductItemList";
import AdminMain from "../Page/Admin/AdminMain";
import AdminLayout from "../Layouts/AdminLayout";
import PageNotFound from "../Page/Errors/404";
import MangeOrderMain from "../Page/MangeOrder/MangeOrderMain";
import ClientLayout from "../Layouts/ClientLayout";
import ClientMain from "../Page/Client/ClientMain";
import ClientMenu from "../Page/Client/ClientMenu";
import ClientSelectList from "../Page/Client/ClientSelectList";
import LandingMain from "../Page/Landing/LandingMain";
import SignUp from "../Page/Landing/SignUp";
import Agreement from "../Page/Landing/Agreement";
import AdminStoreList from "../Page/Admin/Store/AdminStoreList";
import AdminCreateStore from "../Page/Admin/Store/AdminCreateStore";
import AdminUpdateStore from "../Page/Admin/Store/AdminUpdateStore";
import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";
import Logout from "../Page/Admin/Logout";
import LandingLayout from "../Layouts/LandingLayout";

const Router = () => {
  const { isLogin } = useRecoilValue(userState);

  return (
    <Routes>
      {isLogin && (
        <>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path=":id">
              <Route path="store">
                <Route path="" element={<Navigate to="list" />} />
                <Route path="list" element={<AdminStoreList />} />
                <Route path="create" element={<AdminCreateStore />} />
                <Route path="update" element={<AdminUpdateStore />} />
                <Route path=":id">
                  <Route path="main" element={<AdminMain />} />
                  <Route
                    path="manage-product"
                    element={<AdminManageProductItemList />}
                  />
                  <Route
                    path="add-product"
                    element={<AdminManageProductAddItem />}
                  />
                  <Route path="manage-order" element={<MangeOrderMain />} />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="/client" element={<ClientLayout />}>
            <Route path="" element={<Navigate to="/client/main" />} />
            <Route path="main" element={<ClientMain />} />
            <Route path="menu" element={<ClientMenu />} />
            <Route path="select-list" element={<ClientSelectList />} />
          </Route>
        </>
      )}
      <Route path="/" element={<LandingLayout />}>
        <Route path="/" element={<LandingMain />} />
        <Route path="agreement" element={<Agreement />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
