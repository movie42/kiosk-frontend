import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminMain from "../Components/AdminComponents/AdminMain";
import AdminMenu from "../Components/AdminComponents/AdminMenu";
import AdminLayout from "../Layouts/AdminLayout";

const Router = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="login" element={<AdminMain />} />
        <Route path=":id">
          <Route path="menu" element={<AdminMenu />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
