import { useContext, useEffect, useState } from "react";
import { Edit, Trash, Plus, Search } from "lucide-react";
import Modal from "../components/Modal";
import AddProduct from "./../components/AddProduct";
import { useColor } from "react-color-palette";
import "react-color-palette/css";
import Table from "../components/Table";
import { AdminContext } from "../context/AdminContext";

export default function ProductsPage() {
  const [fetchingProducts, setFetchingProducts] = useState(true);
  const [action, setAction] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [color, setColor] = useColor("#ffffff");
  const initialState = {
    name: "",
    discount: "",
    price: "",
    quantity: "",
    category: "Men",
    subCategory: "Topwear",
    description: "",
    sizes: [],
    tags: "",
    color: color.hex,
    isOriginal: "true",
    image: [],
  };
  const [itemData, setItemData] = useState(initialState);

  const { products, fetchProducts } = useContext(AdminContext);

  useEffect(() => {
    setFetchingProducts(true);
    if (products.length === 0) {
      fetchProducts();
    }
    if (products.length > 0) {
      setFetchingProducts(false);
    }
  }, [products]);

  const columnHeader = {
    sn: "SN",
    itemData: "Product",
    status: "Status",
    inventory: "Inventory",
    category: "Category",
    actions: "Actions",
  };

  const editProduct = (item) => {
    setAction("edit");
    setItemData((prevData) => ({ ...prevData, ...item }));
    setOpenModal(true);
  };

  const addProduct = () => {
    setAction("add");
    setItemData(initialState);
    setOpenModal(true);
  };

  if (fetchingProducts) {
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
              Products
            </h1>
            <div className="flex space-x-4">
              <button className="bg-blue-600 text-white px-2 md:px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 font-imprima">
                <Search className="w-4 h-4 md:mr-2" />
                <span className="hidden md:flex">Search Product</span>
              </button>
              <button
                onClick={() => addProduct()}
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
          products={products}
          renderRow={(itemData, index) => (
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
                  {itemData.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs font-muktaVaani leading-5 font-semibold rounded-full ${
                    itemData.quantity === 0
                      ? "bg-red-100 text-red-800"
                      : itemData.quantity <= 10
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {itemData.quantity === 0
                    ? "Out of Stock"
                    : itemData.quantity <= 10
                    ? "Low Stock"
                    : "In Stock"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-muktaVaani text-sm text-[var(--text-color)] transition-standard">
                {itemData.quantity}
              </td>

              <td className="px-6 py-4 whitespace-nowrap font-muktaVaani text-sm text-[var(--text-color)] transition-standard">
                {itemData.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  className="text-blue-600 hover:text-blue-500 mr-4"
                  onClick={() => editProduct(itemData)}
                >
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
          title={action === "edit" ? "Update Product" : "Add Product"}
        >
          <AddProduct
            formData={itemData}
            setFormData={setItemData}
            color={color}
            setColor={setColor}
            setParentModal={setOpenModal}
            action={action}
          />
        </Modal>
      </div>
    </div>
  );
}
