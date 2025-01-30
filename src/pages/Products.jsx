import { useContext, useState } from "react";
import { Edit, Trash, Plus, Search } from "lucide-react";
import Modal from "../components/Modal";
import AddProduct from "./../components/AddProduct";
import { useColor } from "react-color-palette";
import "react-color-palette/css";
import { generateSKU, logFormData, mockProducts } from "../assets/assets";
import Table from "../components/Table";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";

export default function ProductsPage() {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [color, setColor] = useColor("#ffffff");
  const [formData, setFormData] = useState({
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
  });

  const { backendUrl, adminToken } = useContext(AdminContext);

  const onSubmit = async () => {
    setLoading(true);
    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("quantity", formData.quantity);
    form.append("price", formData.price);
    form.append("category", formData.category);
    form.append("subCategory", formData.subCategory);
    form.append("bestSeller", formData.bestSeller);
    form.append("sizes", JSON.stringify(formData.sizes));
    form.append("sku", generateSKU());
    form.append("brand", formData.brand);
    form.append("tags", JSON.stringify(formData.tags.split(",")));
    form.append("discount", formData.discount);
    form.append("isOriginal", formData.isOriginal);

    console.log(`Processing formData: ${formData.name}`);
    console.log(`Product images:`, formData.image);
    // Create an array of promises for image fetches
    const imagePromises = formData.image.map((img, index) => {
      console.log(`Appending file directly: ${img.name}`);
      form.append(`image${index + 1}`, img);
      return Promise.resolve();
    });

    // Wait for all images to be processed before continuing
    await Promise.all(imagePromises);

    logFormData(form);

    try {
      const response = await axios.post(backendUrl + "/api/product/add", form, {
        headers: { token: adminToken },
      });

      console.log(response);

      if (!response.data.success) {
        throw new Error(
          `Failed to add product ${formData.name}: ${response.data.message}`
        );
      }

      console.log(`Successfully added product: ${formData.name}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const columnHeader = {
    sn: "SN",
    formData: "Product",
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
          renderRow={(formData, index) => (
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
                  {formData.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs font-muktaVaani leading-5 font-semibold rounded-full ${
                    formData.status === "In Stock"
                      ? "bg-green-100 text-green-800"
                      : formData.status === "Low Stock"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {formData.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-muktaVaani text-sm text-[var(--text-color)] transition-standard">
                {formData.inventory}
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-muktaVaani text-sm text-[var(--text-color)] transition-standard">
                {formData.category}
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
            loading={loading}
          />
        </Modal>
      </div>
    </div>
  );
}
