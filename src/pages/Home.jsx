import React, { useContext, useEffect, useState } from "react";
import {
  Users,
  ShoppingBag,
  DollarSign,
  Package,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { undraw } from "../assets/assets";
import InfoMessage from "../components/InfoComponent";

export default function Home() {
  const { orders, navigate, fetchAllOrders, loading, adminToken } =
    useContext(AdminContext);

  useEffect(() => {
    if (orders && orders.length === 0) {
      fetchAllOrders();
    }
  }, [adminToken]);

  const stats = [
    {
      title: "Total Revenue",
      value: "$124,563.00",
      change: "+12.5%",
      isIncrease: true,
      icon: DollarSign,
    },
    {
      title: "Active Orders",
      value: "45",
      change: "+23.1%",
      isIncrease: true,
      icon: ShoppingBag,
    },
    {
      title: "New Customers",
      value: "156",
      change: "-4.5%",
      isIncrease: false,
      icon: Users,
    },
    {
      title: "Product Stock",
      value: "1,245",
      change: "+8.2%",
      isIncrease: true,
      icon: Package,
    },
  ];

  const notifications = [
    {
      message: "New order received from Emma Wilson",
      time: "5 minutes ago",
      type: "order",
    },
    {
      message: "Stock alert: iPhone 15 Pro (5 items remaining)",
      time: "1 hour ago",
      type: "stock",
    },
    {
      message: "Customer review: 5 stars from John Smith",
      time: "2 hours ago",
      type: "review",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  return (
    <div className="md:p-6 my-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-3">
          <h2 className="font-yantramanav font-semibold text-[var(--text-color)] transition-all duration-300 ease-in-out md:text-start text-center text-xl">
            Welcome back, Paul Kamau.
          </h2>
          <p className="text-[var(--text-color)] mt-1 font-muktaVaani md:text-start text-center text-base">
            Here's what's happening with your store today😊
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 relative text-[var(--text-color)] hover:text-white">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[var(--card-bg)] duration-300 ease-in-out rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-2 text-[var(--text-color)] transition duration-300 ease-in-out">
                  {stat.value}
                </h3>
              </div>
              <div className="p-2bg-gray-700 rounded-lg">
                <stat.icon className="w-6 h-6 text-[var(--text-color)]" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              {stat.isIncrease ? (
                <ArrowUpRight className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              )}
              <span
                className={`ml-1 text-sm ${
                  stat.isIncrease ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-gray-400 text-sm ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-[var(--card-bg)] transition-standard rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-yantramanav text-lg font-semibold text-[var(--text-color)] transition-standard">
              Recent Orders
            </h3>
            <Link to={"/orders"}>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                View All
              </button>
            </Link>
          </div>
          {orders ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm justify-between text-gray-400 border-b rounded-b-md border-gray-600">
                    <th className="pb-4  pl-4 pr-8">SN</th>
                    <th className="pb-4  pr-16">Customer</th>
                    <th className="pb-4  pr-32">Product</th>
                    <th className="pb-4  pr-10">Amount</th>
                    <th className="pb-4  pr-16">Status</th>
                    <th className="pb-4  pr-10">Order ID</th>
                  </tr>
                </thead>
                {orders && (
                  <tbody className="text-sm gap-y-10">
                    {orders.slice(0, 5).map((order, index) => (
                      <tr
                        onClick={() => {
                          navigate(`/orders/${order._id}`);
                        }}
                        key={index}
                        className="m-4 pt-4 hover:bg-[var(--hover-bg)] hover:shadow-lg transition-all duration-300 cursor-pointer"
                      >
                        <td className="py-4 pl-4 text-[var(--text-color)] transition-standard rounded-l-md font-muktaVaani">
                          {index + 1}.
                        </td>

                        <td className="py-4 text-[var(--text-color)] transition-standard font-muktaVaani">
                          {order.address.firstName} {order.address.lastName}
                        </td>
                        <td className="py-4 text-gray-400">
                          <span className="text-[var(--text-color)] transition-standard font-muktaVaani line-clamp-1">
                            {order.items[0].name}
                          </span>
                        </td>
                        <td className="py-4 text-[var(--text-color)] transition-standard font-muktaVaani">
                          Ksh. {order.amount}
                        </td>
                        <td className="py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 font-muktaVaani ${
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
                        </td>
                        <td className="py-4 text-[var(--text-color)] transition-standard rounded-r-md font-muktaVaani">
                          {order._id.slice(0, 10)}...
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          ) : (
            <div className="flex justify-center">
              <InfoMessage
                title={"No Orders Made"}
                message={"Please wait till orders are made"}
              />
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="bg-[var(--card-bg)] transition-standard rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-yantramanav text-md md:text-lg font-semibold text-[var(--text-color)]">
              Recent Notifications
            </h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm cursor-pointer font-medium">
              Mark All Read
            </button>
          </div>
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-[var(--hover-bg)] cursor-pointer"
              >
                <div className="p-2 bg-gray-700 rounded-lg">
                  <Bell className="w-5 h-5 text-[var(--bg-color)] " />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[var(--text-color)] font-yantramanav line-clamp-1">
                    {notification.message}
                  </p>
                  <div className="flex items-center mt-1">
                    <Clock className="w-4 h-4 font-muktaVaani" />
                    <span className="text-xs text-[var(--text-color) transition-standard font-muktaVaani ml-1">
                      {notification.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
