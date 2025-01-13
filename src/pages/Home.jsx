import React from "react";
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

export default function Home() {
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

  const recentOrders = [
    {
      id: "ORD-7842",
      customer: "John Smith",
      product: "Nike Air Max 2024",
      amount: "$299.99",
      status: "Processing",
    },
    {
      id: "ORD-7841",
      customer: "Emma Wilson",
      product: "Wireless Headphones",
      amount: "$159.99",
      status: "Shipped",
    },
    {
      id: "ORD-7840",
      customer: "Michael Brown",
      product: "Smart Watch Pro",
      amount: "$249.99",
      status: "Delivered",
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

  return (
    <div className="md:p-6 my-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-3">
          <h2 className="font-yantramanav font-bold text-white">
            Welcome back, Paul Kamau.
          </h2>
          <p className="text-gray-300 mt-1 font-muktaVaani">
            Here's what's happening with your store today😊
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 relative text-gray-300 hover:text-white">
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
            className="bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-2 text-white">
                  {stat.value}
                </h3>
              </div>
              <div className="p-2bg-gray-700 rounded-lg">
                <stat.icon className="w-6 h-6 text-gray-300" />
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
        <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-yantramanav text-lg font-semibold text-white">
              Recent Orders
            </h3>
            <Link to={"/orders"}>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                View All
              </button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm justify-between text-gray-400 border-b rounded-b-md border-gray-600">
                  <th className="pb-4 pl-4 md:pr-0 pr-8">SN</th>
                  <th className="pb-4 md:pr-0 pr-16">Order ID</th>
                  <th className="pb-4 md:pr-0 pr-16">Customer</th>
                  <th className="pb-4 md:pr-0 pr-32">Product</th>
                  <th className="pb-4 md:pr-0 pr-10">Amount</th>
                  <th className="pb-4 md:pr-0 pr-10">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentOrders.map((order, index) => (
                  <tr
                    key={index}
                    className=" m-4 hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <td className="py-4 pl-4 text-gray-200 rounded-l-md">
                      {index + 1}.
                    </td>
                    <td className="py-4 text-gray-200">{order.id}</td>

                    <td className="py-4 text-gray-200">{order.customer}</td>
                    <td className="py-4 text-gray-400">{order.product}</td>
                    <td className="py-4 text-gray-200">{order.amount}</td>
                    <td className="py-4 rounded-r-md">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-yantramanav text-lg font-semibold text-white">
              Recent Notifications
            </h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
              Mark All Read
            </button>
          </div>
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div className="p-2 bg-gray-700 rounded-lg">
                  <Bell className="w-5 h-5 text-gray-300" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-200">
                    {notification.message}
                  </p>
                  <div className="flex items-center mt-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-400 ml-1">
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
