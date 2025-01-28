import { useState } from "react";
import { Edit, Trash, Plus, Search } from "lucide-react";
import Modal from "../components/Modal";
import AddProduct from "./../components/AddProduct";
import { useColor } from "react-color-palette";
import "react-color-palette/css";
import { mockProducts } from "../assets/assets";
import Table from "../components/Table";

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [color, setColor] = useColor("#ffffff");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "Men",
    subcategory: "Topwear",
    description: "",
    sizes: [],
    tags: "",
    color: color.hex,
    isOriginal: "true",
    images: [],
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const onSubmit = async () => {
    console.log(formData);
  };

  const columnHeader = {
    sn: "SN",
    product: "Product",
    status: "Status",
    inventory: "Inventory",
    category: "Category",
    actions: "Actions",
  };

  return (
    <div className="p-6 bg-[var(--card-bg)] rounded-lg">
      <div className="mx-auto">
        {/* Header */}
        <div className="">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[var(--text-color)] font-yantramanav">
              Products
            </h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setOpenModal(true)}
                className="bg-blue-600 text-white px-2 md:px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 font-imprima"
              >
                <Search className="w-4 h-4 md:mr-2" />
                <span className="hidden md:flex">Search Product</span>
              </button>
              <button
                onClick={() => setOpenModal(true)}
                className="bg-blue-600 text-white px-2 md:px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 font-imprima"
              >
                <Plus className="w-4 h-4 md:mr-2" />
                <span className="hidden md:flex">Add Product</span>
              </button>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <Table
          columnHeader={columnHeader}
          products={mockProducts}
          renderRow={(product, index) => (
            <tr
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
                  {product.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs font-muktaVaani leading-5 font-semibold rounded-full ${
                    product.status === "In Stock"
                      ? "bg-green-100 text-green-800"
                      : product.status === "Low Stock"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-muktaVaani text-sm text-[var(--text-color)] transition-standard">
                {product.inventory}
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-muktaVaani text-sm text-[var(--text-color)] transition-standard">
                {product.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-500 mr-4">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="text-red-600 hover:text-red-500">
                  <Trash className="w-5 h-5" />
                </button>
              </td>
            </tr>
          )}
        />

        <Modal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          title={"Add Product"}
        >
          <AddProduct
            formData={formData}
            setFormData={setFormData}
            color={color}
            setColor={setColor}
            onSubmitHandler={onSubmit}
            setParentModal={setOpenModal}
          />
        </Modal>
      </div>
    </div>
  );
}
