import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminMain from "../Components/AdminComponents/AdminMain";
import AdminManageProductAddItem from "../Components/AdminComponents/AdminManageProductAddItem";
import AdminManageProductItemList from "../Components/AdminComponents/AdminManageProductItemList";
import AdminMenu from "../Components/AdminComponents/AdminMenu";
import AdminLayout from "../Layouts/AdminLayout";

const Router = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="login" element={<AdminMain />} />
        <Route path=":id">
          <Route path="menu" element={<AdminMenu />} />
          <Route path="manage-customer-order" />
          <Route path="manage-crew" />
          <Route
            path="manage-product"
            element={<AdminManageProductItemList />}
          />
          <Route path="add-product" element={<AdminManageProductAddItem />} />
        </Route>
      </Route>
      <Route path="/order" />
    </Routes>
  );
};

export default Router;
