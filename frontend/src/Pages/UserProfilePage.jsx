import React from "react";
import NavBar from "../features/navbar/NavBar";
import UserProfile from "../features/user/components/UserProfile";

const UserProfilePage = () => {
  return (
    <div>
      <NavBar>
        <UserProfile />
      </NavBar>
    </div>
  );
};

export default UserProfilePage;
