// Order.jsx
import React, { useContext, useEffect, useState } from "react";
import { PackageCheck, Clock, User, Mail, Truck } from "lucide-react";
import { useParams } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

const Order = () => {
  // Mock order data
  const mockOrder = {
    address: {
      firstName: "Paul",
      lastName: "Njoroge",
      email: "njigupaul22@gmail.com",
      street: "Baraka 2 Estate.",
      constituency: "Juja",
    },
    amount: 350,
    checkoutRequestId: "ws_CO_07012025184122810704777637",
    createdAt: "2025-01-07T15:40:23.244Z",
    date: 1736264423232,
    items: [
      { name: "Laptop", quantity: 1 },
      { name: "Wireless Mouse", quantity: 2 },
      { name: "Keyboard", quantity: 1 },
    ],
    payment: false,
    paymentMethod: "Mpesa",
    shippingMethod: { price: 250, method: "Guardian" },
    status: "Pending",
    userId: "6742f573a9001757c0f1d8d2",
  };

  const [order, setOrder] = useState({});

  const { orderId } = useParams();
  const { orders } = useContext(AdminContext);

  const {
    address,
    amount,
    checkoutRequestId,
    date,
    items,
    payment,
    paymentMethod,
    shippingMethod,
    status,
  } = mockOrder;

  useEffect(() => {
    console.log(orderId);
    const selectedOrder = orders.find((order) => order._id === orderId);
    setOrder(selectedOrder);
  }, [orders]);

  return (
    <div className="py-4 px-2 flex justify-center items-center">
      <div className="bg-gray-800 shadow-md rounded-md w-full">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold text-white flex items-center">
            <PackageCheck className="mr-2 text-green-500" />
            Order Details
          </h1>
          <p className="text-sm text-white line-clamp-1 md:mt-2 mt-4 ">
            <span className="font-bold font-yantramanav">Order ID</span>:{" "}
            <span className="font-muktaVaani ">{checkoutRequestId}</span>
          </p>
        </div>
        <div className="p-4 space-y-4">
          {/* Order Status */}
          <div className="flex items-center gap-x-2">
            <span className="font-semibold text-white font-yantramanav">
              Status:
            </span>
            <span
              className={`px-3 py-1 rounded-md text-white text-sm ${
                order.status === "Delivered"
                  ? "bg-green-200 text-green-900 hover:bg-green-300"
                  : order.status === "Shipped"
                  ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  : order.status === "Packing"
                  ? "bg-orange-100 text-orange-600 hover:bg-orange-200"
                  : order.status === "Pending"
                  ? "bg-orange-100 text-orange-800 hover:bg-orange-200"
                  : order.status === "Confirmed"
                  ? "bg-teal-100 text-teal-800 hover:bg-teal-200"
                  : "bg-red-100 text-red-800 hover:bg-red-200"
              }`}
            >
              {status}
            </span>
          </div>

          {/* User Details */}
          <div>
            <h2 className="font-semibold text-white mb-2 flex items-center">
              <User className="mr-2 text-blue-500" />
              Customer Information
            </h2>
            <p className="text-sm text-white">
              <strong>Name:</strong> {address.firstName} {address.lastName}
            </p>
            <p className="text-sm text-white">
              <strong>Email:</strong> {address.email}
            </p>
            <p className="text-sm text-white">
              <strong>Address:</strong> {address.street}, {address.constituency}
            </p>
          </div>

          {/* Payment Info */}
          <div>
            <h2 className="font-semibold text-white mb-2 flex items-center">
              <Mail className="mr-2 text-green-500" />
              Payment Information
            </h2>
            <p className="text-sm text-white">
              <strong>Amount:</strong> Ksh {amount}
            </p>
            <p className="text-sm text-white">
              <strong>Payment Method:</strong> {paymentMethod}
            </p>
            <p className="text-sm text-white">
              <strong>Paid:</strong>{" "}
              {payment ? (
                <span className="text-green-500 font-semibold">Yes</span>
              ) : (
                <span className="text-red-500 font-semibold">No</span>
              )}
            </p>
          </div>

          {/* Shipping Info */}
          <div>
            <h2 className="font-semibold text-white mb-2 flex items-center">
              <Truck className="mr-2 text-orange-500" />
              Shipping Information
            </h2>
            <p className="text-sm text-white">
              <strong>Method:</strong> {shippingMethod.method}
            </p>
            <p className="text-sm text-white">
              <strong>Price:</strong> Ksh {shippingMethod.price}
            </p>
          </div>

          {/* Order Items */}
          <div>
            <h2 className="font-semibold text-white mb-2">Order Items</h2>
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li
                  key={index}
                  className="p-3 bg-whiteborder rounded-md flex justify-between items-center"
                >
                  <span className="text-sm text-white">{item.name}</span>
                  <span className="text-sm text-white">
                    Quantity: {item.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Date Info */}
          <div className="flex items-center justify-between">
            <span className="text-white text-sm">Order Date:</span>
            <span className="text-sm text-white">
              {new Date(date).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
