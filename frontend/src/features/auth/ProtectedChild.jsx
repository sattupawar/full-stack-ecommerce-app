import React from "react";
import { selectLoggedUser } from "./AuthSlice";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedChild = ({ children }) => {
  const createUser = useSelector(selectLoggedUser);

  if (!createUser) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
};
