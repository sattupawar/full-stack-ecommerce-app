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
      <ProtectedChild>
        <AdminPage />
      </ProtectedChild>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchBasketByIdAsync(user.id));
    }
  }, [dispatch, user]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
