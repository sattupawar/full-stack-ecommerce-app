import React from "react";
import NavBar from "../features/navbar/NavBar";
import AdminOrders from "../features/admin/AdminOrders";

const AdminOrderPage = () => {
  return (
    <div>
      <NavBar>
        <AdminOrders />
      </NavBar>
    </div>
  );
};

export default AdminOrderPage;
