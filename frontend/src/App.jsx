import "./App.css";
import { Home } from "./Pages/Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage.jsx";
import { SignupPage } from "./Pages/SignupPage.jsx";
import { CartPage } from "./Pages/CartPage.jsx";
import { CheckoutPage } from "./Pages/CheckoutPage.jsx";
import { ProductDetailsPage } from "./Pages/ProductDetailsPage.jsx";
import { ProtectedChild } from "./features/auth/ProtectedChild.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedUser } from "./features/auth/AuthSlice.js";
import { useEffect } from "react";
import { fetchBasketByIdAsync } from "./features/cart/CartSlice.js";
import Admin, { AdminPage } from "./Pages/AdminPage.jsx";
import PageNotFound from "./Pages/pageNotFound.jsx";
import { OrderSuccessPage } from "./Pages/OrderSuccessPage.jsx";
import UserOrders from "./features/user/components/UserOrders.jsx";
import UserOrderPage from "./Pages/UserOrderPage.jsx";
import UserProfile from "./features/user/components/UserProfile.jsx";
import UserProfilePage from "./Pages/UserProfilePage.jsx";
import { fetchLoggedInUserAsync } from "./features/user/UserSlice.js";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin.jsx";
import AdminProductListPage from "./Pages/AdminProductListPage.jsx";
import AdminProductDetailsPage from "./Pages/AdminProductDetailsPage.jsx";
import AdminProductForm from "./features/admin/AdminProductForm.jsx";
import AdminProductFormPage from "./Pages/AdminProductFormPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedChild>
        <Home />
      </ProtectedChild>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: (
      <ProtectedChild>
        <CartPage />
      </ProtectedChild>
    ),
  },
  {
    path: "/checkout",
    element: (
      <ProtectedChild>
        <CheckoutPage />
      </ProtectedChild>
    ),
  },
  {
    path: "/productdetail/:id",
    element: (
      <ProtectedChild>
        <ProductDetailsPage />
      </ProtectedChild>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminProductListPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/productdetail/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailsPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <ProtectedChild>
        <OrderSuccessPage />
      </ProtectedChild>
    ),
  },
  {
    path: "/orders",
    element: (
      <ProtectedChild>
        <UserOrderPage />
      </ProtectedChild>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedChild>
        <UserProfilePage />
      </ProtectedChild>
    ),
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchBasketByIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  }, [dispatch, user]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
