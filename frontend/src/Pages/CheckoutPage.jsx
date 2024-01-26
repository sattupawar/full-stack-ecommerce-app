import React from "react";
import { Checkout } from "./Checkout";
import NavBar from "../features/navbar/NavBar";

export const CheckoutPage = () => {
  return (
    <div>
      <NavBar>
        <Checkout />
      </NavBar>
    </div>
  );
};
