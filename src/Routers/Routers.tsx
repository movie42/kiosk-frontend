import { Routes, Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "@/lib/state";
import {
  AdminLayout,
  ClientLayout,
  LandingLayout,
  AdminManageProductLayout,
  AdminLoadingAndGetUser
} from "@/Components";
import Login from "@/Page/Admin/Login/Login";

import {
  ProductManageMainPage,
  ProductDetailPage,
  CreateProductPage,
  ProductListPage
} from "@/Page/Admin/Product";
import {
  StoreListPage,
  StoreCreatePage,
  StoreUpdatePage
} from "@/Page/Admin/Store";
import { Logout } from "@/Page/Admin/Logout";

import { ManageOrderPage } from "@/Page/MangeOrder";

import PageNotFound from "@/Page/Errors/404";
import { ClientMainPage } from "@/Page/Client/ClientMain";
import { ClientMenuPage } from "@/Page/Client/ClientMenu";
import { ClientSelectListPage } from "@/Page/Client/ClientSelectList";
import { AgreementPage, SignUpPage } from "@/Page/Landing/SignUp";
import LandingMainPage from "@/Page/Landing/LandingMainPage";

const Router = () => {
  const { isLogin, id: userId } = useRecoilValue(userState);
  // const store = useRecoilValue(storeState);
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path=":userId">
          <Route path="store">
            <Route path="" element={<Navigate to="list" />} />
            <Route path="list" element={<StoreListPage />} />
            <Route path="create" element={<StoreCreatePage />} />
            <Route path=":storeId">
              <Route path="update" element={<StoreUpdatePage />} />
              <Route path="manage-order" element={<ManageOrderPage />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route
        path="/admin/:userId/store/:storeId/product"
        element={<AdminManageProductLayout />}
      >
        <Route path=":productId" element={<ProductDetailPage />} />
        <Route path="main" element={<ProductManageMainPage />} />
        <Route path="manage-product" element={<ProductListPage />} />
        <Route path="add-product" element={<CreateProductPage />} />
      </Route>

      <Route path="/client" element={<ClientLayout />}>
        <Route path=":userId/:storeId">
          <Route path="" element={<Navigate to="main" />} />
          <Route path="main" element={<ClientMainPage />} />
          <Route path="menu" element={<ClientMenuPage />} />
          <Route path="select-list" element={<ClientSelectListPage />} />
        </Route>
      </Route>

      {/* FIXME: private router로 변경하면 login이 동작하지 않습니다. 왜냐하면
      isLogin이 true이기 때문입니다. login이 전부 끝난 다음에 접근하지 못하도록 변경해야합니다.*/}
      <Route path="/" element={<LandingLayout />}>
        {!isLogin ? (
          <>
            <Route path="/" element={<LandingMainPage />} />
            <Route path="agreement" element={<AgreementPage />} />
          </>
        ) : (
          <Route
            path=""
            element={<Navigate to={`/admin/${userId}/store/list`} />}
          />
        )}
        <Route path="signup" element={<SignUpPage />} />
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
