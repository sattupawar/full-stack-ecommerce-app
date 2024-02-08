import React from "react";
import NavBar from "../features/navbar/NavBar";
import UserOrders from "../features/user/components/UserOrders";

const UserOrderPage = () => {
  return (
    <div>
      {" "}
      <NavBar>
        <UserOrders />
      </NavBar>
    </div>
  );
};

export default UserOrderPage;
