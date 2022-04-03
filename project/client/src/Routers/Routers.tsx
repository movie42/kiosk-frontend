import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminMain from "../Components/AdminComponents/AdminMain";
import AdminLayout from "../Layouts/AdminLayout";

const Router = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<AdminMain />} />
      </Route>
    </Routes>
  );
};

export default Router;
