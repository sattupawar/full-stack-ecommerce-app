import React from "react";
import NavBar from "../features/navbar/NavBar";
import { ProductDetails } from "../features/productList/ProductDetails";

export const ProductDetailsPage = () => {
  return (
    <div>
      <NavBar>
        <ProductDetails />
      </NavBar>
    </div>
  );
};
