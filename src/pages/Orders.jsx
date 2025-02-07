import React, { useContext, useEffect, useState } from "react";
import Modal from "../components/Modal";
import { Edit, FileUp, Search, Trash } from "lucide-react";
import { AdminContext } from "../context/AdminContext";
import Table from "../components/Table";
import InfoMessage from "../components/InfoComponent";

export default function Orders() {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchModal, setSearchModal] = useState(false);

  const { orders, navigate, adminToken, fetchAllOrders } =
    useContext(AdminContext);

  const columnHeader = {
    sn: "SN",
    customer: "Customer",
    status: "Status",
    amount: "Amount",
    payment: "Date",
  };

  useEffect(() => {
    if (orders && orders.length === 0) {
      fetchAllOrders();
    }
    if (orders && orders.length > 0) {
      setLoading(false);
    }
  }, [adminToken, orders]);

  if (loading && orders) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[var(--card-bg)] rounded-lg">
      <div className="mx-auto">
        {/* Header */}
        <div className="">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[var(--text-color)] font-yantramanav">
              Orders
            </h1>
            {orders && (
              <div className="flex space-x-4">
                <button
                  onClick={() => setOpenModal(true)}
                  className="bg-blue-600 text-white cursor-pointer px-2 md:px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 font-imprima"
                >
                  <Search className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:flex">Search Order</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Products Table */}
        {orders.length > 0 ? (
          <Table
            columnHeader={columnHeader}
            products={orders}
            renderRow={(order, index) => (
              <tr
                onClick={() => {
                  navigate(`/orders/${order._id}`);
                }}
                key={index}
                className="hover: cursor-pointer hover:bg-[var(--border-color)]"
              >
                <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="text-sm font-medium font-muktaVaani text-[var(--text-color)] transition-standard">
                    {index + 1}.
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium font-muktaVaani text-[var(--text-color)] transition-standard">
                    {order.address.firstName} {order.address.lastName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs font-muktaVaani leading-5 font-semibold rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-200 text-green-900"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "Packing"
                        ? "bg-orange-100 text-orange-600"
                        : order.status === "Pending"
                        ? "bg-orange-100 text-orange-800"
                        : order.status === "Confirmed"
                        ? "bg-teal-100 text-teal-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-muktaVaani text-sm text-[var(--text-color)] transition-standard">
                  {order.amount}.00
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-muktaVaani text-sm text-[var(--text-color)] transition-standard">
                  {new Date(order.date).toLocaleDateString()}
                </td>
              </tr>
            )}
          />
        ) : (
          <div className="flex justify-center">
            <InfoMessage
              title={"No Orders Made"}
              message={"Please wait till orders are made"}
            />
          </div>
        )}

        <Modal
          isOpen={openModal}
          onClose={(e) => setOpenModal(false)}
          button1={"Search"}
          button2={"Cancel"}
          title={"Search for an Order"}
        ></Modal>
      </div>
    </div>
  );
}
