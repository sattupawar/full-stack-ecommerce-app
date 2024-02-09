import { Link } from "react-router-dom";
import { NavBar } from "../features/navbar/NavBar";
import ProductList from "../features/productList/ProductList";

export const Home = () => {
  return (
    <div>
      <NavBar>
        <ProductList />
      </NavBar>
     </div>
  );
};
