import React from "react";
import Cart from "../features/cart/Cart";
import NavBar from "../features/navbar/NavBar";

export const CartPage = () => {
  return (
    <div>
      {" "}
      <NavBar>
        <Cart />
      </NavBar>
    </div>
  );
};
