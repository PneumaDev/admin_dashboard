import React, { useContext, useEffect, useState } from "react";
import { PackageCheck, Clock, User, Mail, Truck } from "lucide-react";
import { useParams } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

const Order = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { orderId } = useParams();
  const { orders } = useContext(AdminContext);

  useEffect(() => {
    // Simulate loading state and find the order
    setLoading(true);
    const timeout = setTimeout(() => {
      if (orders && orders.length > 0) {
        const selectedOrder = orders.find((order) => order._id === orderId);
        if (selectedOrder) {
          setOrder(selectedOrder);
        }
      }
      setLoading(false);
    });

    return () => clearTimeout(timeout);
  }, [orders, orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-white text-lg">Order not found</p>
      </div>
    );
  }

  return (
    <div className="py-4 flex justify-center items-center">
      <div className="bg-gray-800 shadow-md rounded-md w-full">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold text-white flex items-center font-imprima">
            <PackageCheck className="mr-2 text-green-500 " />
            Order Details
          </h1>
          <p className="text-sm text-white line-clamp-1 md:mt-2 mt-4">
            <span className="font-bold font-yantramanav">Order ID</span>:{" "}
            <span className="font-muktaVaani ">{order._id}</span>
          </p>
        </div>
        <div className="p-4 space-y-4">
          {/* Order Status */}
          <div className="border-b pb-4 border-gray-700">
            <div className="flex items-center gap-x-2 mb-4">
              <span className="font-semibold text-white font-yantramanav">
                Status:
              </span>
              <span
                className={`px-2 py-1 rounded-md text-white font-muktaVaani text-sm ${
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
                {order.status}
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between md:m-8 bg-gray-700 rounded-md gap-y-10 md:p-10 p-5 shadow-lg">
              {/* User Details */}
              <div className="p-4 border-b border-gray-500">
                <h2 className="font-semibold mb-2 flex items-center text-blue-500">
                  <User className="mr-2 text-blue-700" />
                  Customer Information
                </h2>
                <div className="flex flex-col gap-y-4 mt-4">
                  <p className="text-sm text-white font-muktaVaani">
                    <strong className="font-yantramanav">Name:</strong>{" "}
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className="text-sm text-white font-muktaVaani">
                    <strong className="font-yantramanav">Email:</strong>{" "}
                    {order.address.email}
                  </p>
                  <p className="text-sm text-white font-muktaVaani">
                    <strong className="font-yantramanav">Address:</strong>{" "}
                    {order.address.street}, {order.address.constituency}
                  </p>
                </div>
              </div>

              {/* Payment Info */}
              <div className="p-4 border-b border-gray-500">
                <h2 className="font-semibold mb-2 flex items-center text-green-500">
                  <Mail className="mr-2 text-green-700" />
                  Payment Information
                </h2>
                <div className="flex flex-col gap-y-4 mt-4">
                  <p className="text-sm text-white font-muktaVaani">
                    <strong className="font-yantramanav">Amount:</strong> Ksh.{" "}
                    {order.amount}
                  </p>
                  <p className="text-sm text-white font-muktaVaani">
                    <strong className="font-yantramanav">
                      Payment Method:
                    </strong>{" "}
                    {order.paymentMethod}
                  </p>
                  <p className="text-sm text-white font-muktaVaani">
                    <strong className="font-yantramanav">Paid:</strong>{" "}
                    {order.payment ? (
                      <span className="text-green-500 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-500 font-semibold">No</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="p-4  md:border-b border-gray-500">
                <h2 className="font-semibold text-orange-500 mb-2 flex items-center">
                  <Truck className="mr-2 text-orange-700" />
                  Shipping Information
                </h2>
                <div className="flex flex-col gap-y-4 mt-4">
                  <p className="text-sm text-white">
                    <strong>Method:</strong> {order.shippingMethod.method}
                  </p>
                  <p className="text-sm text-white">
                    <strong>Price:</strong> Ksh. {order.shippingMethod.price}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h2 className="font-semibold text-white mb-2">Order Items</h2>
            <ul className="space-y-2">
              {order.items.map((item, index) => (
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
              {new Date(order.date).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
