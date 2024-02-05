import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./app/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./Pages/Home.jsx";
import { LoginPage } from "./Pages/LoginPage.jsx";
import { SignupPage } from "./Pages/SignupPage.jsx";
import { CartPage } from "./Pages/CartPage.jsx";
import { CheckoutPage } from "./Pages/CheckoutPage.jsx";
import { ProductDetailsPage } from "./Pages/ProductDetailsPage.jsx";
import { ProtectedChild } from "./features/auth/ProtectedChild.jsx";
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
