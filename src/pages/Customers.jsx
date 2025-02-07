import React, { useContext, useEffect, useState } from "react";
import Table from "../components/Table";
import InfoMessage from "../components/InfoComponent";
import Modal from "../components/Modal";
import { AdminContext } from "../context/AdminContext";
import { Search } from "lucide-react";
import Spinner from "../components/Spinner";

export default function Customers() {
  // const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const { customers, fetchCustomers, adminToken, loading, navigate } =
    useContext(AdminContext);

  useEffect(() => {
    console.log(customers);
    if (customers && customers.length === 0) {
      fetchCustomers();
    }
  }, [adminToken, customers]);

  if (loading && customers) {
    return <Spinner />;
  }

  const columnHeader = {
    sn: "SN",
    customer: "Name",
    email: "Email",
    phone: "Phone",
    payment: "Date",
  };

  return (
    <div className="p-6 bg-[var(--card-bg)] rounded-lg">
      <div className="mx-auto">
        {/* Header */}
        <div className="">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[var(--text-color)] font-yantramanav">
              Customers
            </h1>
            {customers && (
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
        {customers ? (
          <Table
            columnHeader={columnHeader}
            products={customers}
            renderRow={(customer, index) => (
              <tr
                onClick={() => {
                  navigate(`/customers/${customer._id}`);
                }}
                key={index}
                className="hover: cursor-pointer hover:bg-[var(--border-color)]"
              >
                <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="text-sm font-medium font-muktaVaani text-[var(--text-color)] transition-standard">
                    {index + 1}.
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="text-sm font-medium font-muktaVaani text-[var(--text-color)] transition-standard">
                    {customer.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="text-sm font-medium font-muktaVaani text-[var(--text-color)] transition-standard">
                    {customer.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium  flex items-center font-muktaVaani text-[var(--text-color)] transition-standard">
                    -
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium  flex items-center font-muktaVaani text-[var(--text-color)] transition-standard">
                    -
                  </div>
                </td>
              </tr>
            )}
          />
        ) : (
          <div className="flex justify-center">
            <InfoMessage
              title={"No customers Made"}
              message={"Please wait till new customers join"}
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
