import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import Login from "../pages/Login";

export default function PrivateRoute() {
  const { adminToken } = useContext(AdminContext);

  console.log(adminToken);

  // Render logic
  return adminToken || localStorage.getItem("adminToken") ? (
    <Outlet />
  ) : (
    <>
      <Login />
    </>
  );
}
