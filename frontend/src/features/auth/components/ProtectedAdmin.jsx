import React from "react";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../AuthSlice";
import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {
  const user = useSelector(selectLoggedUser);
  console.log(user);

  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }

  if (user && user.role !== "admin") {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  return children;
};

export default ProtectedAdmin;
