import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Page/Admin/Login/AdminLogin";
import AdminManageProductAddItem from "../Page/Admin/Product/AdminManageProductAddItem";
import AdminManageProductItemList from "../Page/Admin/Product/AdminManageProductItemList";
import AdminMain from "../Page/Admin/Product/AdminManageProductMain";
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
import AdminManageProductLayout from "../Layouts/AdminManageProductLayout";
import AdminLoadingAndGetUser from "../Page/Admin/Login/AdminLoadingAndGetUser";
import AdminProductDetail from "../Page/Admin/Product/AdminProductDetail";
import { storeState } from "../state/storeState";

const Router = () => {
  const { isLogin } = useRecoilValue(userState);
  const store = useRecoilValue(storeState);

  return (
    <Routes>
      {isLogin && (
        <>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path=":userId">
              <Route path="store">
                <Route path="" element={<Navigate to="list" />} />
                <Route path="list" element={<AdminStoreList />} />
                <Route path="create" element={<AdminCreateStore />} />
                <Route path=":storeId">
                  <Route path="update" element={<AdminUpdateStore />} />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route
            path="/admin/:userId/store/:storeId/product"
            element={<AdminManageProductLayout />}
          >
            <Route path=":productId" element={<AdminProductDetail />} />
            <Route path="main" element={<AdminMain />} />
            <Route
              path="manage-product"
              element={<AdminManageProductItemList />}
            />
            <Route path="manage-order" element={<MangeOrderMain />} />
            <Route path="add-product" element={<AdminManageProductAddItem />} />
          </Route>
          {store.isAvailable && (
            <Route path="/client" element={<ClientLayout />}>
              <Route path=":userId/:storeId">
                <Route path="" element={<Navigate to="main" />} />
                <Route path="main" element={<ClientMain />} />
                <Route path="menu" element={<ClientMenu />} />
                <Route path="select-list" element={<ClientSelectList />} />
              </Route>
            </Route>
          )}
        </>
      )}
      {/* TODO: private router로 변경하면 login이 동작하지 않습니다. 왜냐하면
      isLogin이 true이기 때문입니다. login이 전부 끝난 다음에 접근하지 못하도록 변경해야합니다.*/}
      <Route path="/" element={<LandingLayout />}>
        {!isLogin ? (
          <>
            <Route path="/" element={<LandingMain />} />
            <Route path="agreement" element={<Agreement />} />
          </>
        ) : (
          <Route
            path="/"
            element={<Navigate to="/admin/:userId/store/list" />}
          />
        )}
        <Route path="signup" element={<SignUp />} />
        <Route
          path="login"
          element={!isLogin ? <Login /> : <AdminLoadingAndGetUser />}
        />
        <Route path="logout" element={<Logout />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
