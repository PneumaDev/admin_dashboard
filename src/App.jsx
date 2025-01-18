import React, { useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import { Route, Routes } from "react-router-dom";
import { AdminContext } from "./context/AdminContext";
import Login from "./pages/Login";

function App() {
  const { adminToken } = useContext(AdminContext);

  if (localStorage.getItem("adminToken")) {
    return (
      <div className="flex h-screen ">
        <Navbar />
        <div className="flex-1 overflow-auto p-2 md:p-6 bg-gray-700">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
          </Routes>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Login />
      </div>
    );
  }
}

export default App;
