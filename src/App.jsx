import React, { useContext, Suspense, lazy } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Customers from "./pages/Customers";
import { Route, Routes } from "react-router-dom";
import { AdminContext } from "./context/AdminContext";

import { Toaster } from "react-hot-toast";
import Spinner from "./components/Spinner";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Order = lazy(() => import("./pages/Order"));
const Orders = lazy(() => import("./pages/Orders"));
const Product = lazy(() => import("./pages/Product"));
const Products = lazy(() => import("./pages/Products"));

function App() {
  const { adminToken } = useContext(AdminContext);

  return (
    <div className="">
      <Toaster
        toastOptions={{
          className:
            "font-imprima bg-gray-100 shadow-md rounded-md border border-gray-300",
          loading: {
            style: {
              background: "#3B82F6",
              color: "#ffffff",
              borderRadius: "8px",
              padding: "12px",
              border: "1px solid #3B82F6",
            },
            iconTheme: {
              primary: "#ffffff",
              secondary: "#3B82F6",
            },
          },
          success: {
            style: {
              background: "#10B981",
              color: "#ffffff",
              borderRadius: "8px",
              padding: "12px",
              border: "1px solid #10B981",
            },
            iconTheme: {
              primary: "#ffffff",
              secondary: "#10B981",
            },
          },
          error: {
            style: {
              background: "#EF4444",
              color: "#ffffff",
              borderRadius: "8px",
              padding: "12px",
              border: "1px solid #EF4444",
            },
            iconTheme: {
              primary: "#ffffff",
              secondary: "#EF4444",
            },
          },
        }}
      />
      {localStorage.getItem("adminToken") || adminToken ? (
        <div className="flex h-screen">
          <Navbar />
          <div className="flex-1 overflow-auto p-2 md:p-6 bg-[var(--bg-sidecolor)] transition-all duration-300 ease-in-out">
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:productId" element={<Product />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/orders/:orderId" element={<Order />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
