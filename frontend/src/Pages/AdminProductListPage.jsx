import React from "react";
import NavBar from "../features/navbar/NavBar";
import AdminProductList from "../features/admin/AdminProductList";
import { Link } from "react-router-dom";

const AdminProductListPage = () => {
  return (
    <div>
      <NavBar>
        <AdminProductList />
      </NavBar>
    </div>
  );
};

export default AdminProductListPage;
