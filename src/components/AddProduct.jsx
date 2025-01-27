import React, { useEffect, useState } from "react";
import { ColorPicker } from "react-color-palette";
import "react-color-palette/css";
import Modal from "./Modal";

export default function AddProduct({
  formData,
  setFormData,
  color,
  setColor,
  setParentModal,
}) {
  // <------------Handle states------------>
  const [openModal, setOpenModal] = useState(false);
  const [sizes, setSizes] = useState(["XS", "S", "M", "L", "XL", "XXL"]);

  // <------------Handle Side Effects------------>
  useEffect(() => {
    console.log("Called");
    if (formData.subcategory === "Shoes") {
      setSizes(["5", "6", "7", "8", "9", "10", "11", "12"]);
    } else {
      setSizes(["XS", "S", "M", "L", "XL", "XXL"]);
    }
  }, [formData]);

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, color: color.hex }));
  }, [color]);

  // <------------Component Functions------------>
  const subcategoryOptions = {
    Men: ["Topwear", "Bottomwear", "Shoes", "Innerwear", "Accessories"],
    Women: ["Dresses", "Skirts", "Tops", "Shoes", "Innerwear", "Accessories"],
    Kids: ["Clothing", "Shoes", "Toys", "Accessories"],
    Unisex: ["Shoes", "Hats", "Scarves", "Jackets"],
  };

  const selectedSizes = [];

  const handleChange = (e) => {
    const { name, files } = e.target;

    if (name === "images") {
      const selectedFiles = Array.from(files);
      setFormData((prevState) => ({
        ...prevState,
        images: [...prevState.images, ...selectedFiles],
      }));
    } else {
      setFormData({ ...formData, [name]: e.target.value });
    }
  };

  const toggleSize = (size) => {
    setFormData((prevData) => ({
      ...prevData,
      sizes: prevData.sizes.includes(size)
        ? prevData.sizes.filter((s) => s !== size)
        : [...prevData.sizes, size],
    }));
  };

  return (
    <form className="space-y-6 p-6 rounded-xl">
      <h2 className="text-2xl font-bold text-[var(--text-color)] mb-6 font-muktaVaani">
        Add New Product
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-[var(--text-color)] font-yantramanav"
          >
            Name:
          </label>
          <input
            placeholder="Enter product name"
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 font-imprima rounded-lg border border-[var(--border-color)] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard"
          />
        </div>

        {/* Price Field */}
        <div className="space-y-2">
          <label
            htmlFor="color"
            className="block text-sm font-medium text-[var(--text-color)] font-yantramanav"
          >
            Price (Ksh.)
          </label>
          <input
            placeholder="Enter product price"
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            required
            step="0.01"
            className="w-full px-4 py-2.5 font-imprima rounded-lg border border-[var(--border-color)] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard"
          />
        </div>

        {/* Quantity Field */}
        <div className="space-y-2">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-[var(--text-color)] font-yantramanav"
          >
            Quantity:
          </label>
          <input
            placeholder="Enter product quantity"
            type="number"
            name="quantity"
            id="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 font-imprima rounded-lg border border-[var(--border-color)] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard"
          />
        </div>

        {/* Category Field */}
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-[var(--text-color)] font-yantramanav"
          >
            Category:
          </label>
          <select
            name="category"
            id="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2.5 font-imprima rounded-lg border border-[var(--border-color)] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard"
          >
            <option value="Men" className="bg-[var(--bg-color)]">
              Men
            </option>
            <option value="Women" className="bg-[var(--bg-color)]">
              Women
            </option>
            <option value="Kids" className="bg-[var(--bg-color)]">
              Kids
            </option>
            <option value="Unisex" className="bg-[var(--bg-color)]">
              Unisex
            </option>
          </select>
        </div>

        {/* Subcategory Field */}
        <div className="space-y-2">
          <label
            htmlFor="subcategory"
            className="block text-sm font-medium text-[var(--text-color)] font-yantramanav"
          >
            Subcategory
          </label>
          <select
            name="subcategory"
            id="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 font-imprima rounded-lg border border-[var(--border-color)] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard"
          >
            {subcategoryOptions[formData.category].map((subcategory) => (
              <option
                key={subcategory}
                value={subcategory}
                className="bg-[var(--bg-color)]"
              >
                {subcategory}
              </option>
            ))}
          </select>
        </div>

        {/* Color Field */}
        <div className="flex items-center">
          <div className="space-y-2 w-full">
            <label
              htmlFor="color"
              className="block text-sm font-medium text-[var(--text-color)] font-yantramanav"
            >
              Color:
            </label>
            <div className="relative">
              <input
                placeholder="Enter product color"
                type="text"
                name="color"
                id="color"
                value={color.hex}
                readOnly
                required
                className="w-full px-4 py-2.5 pr-14 font-imprima rounded-lg border border-[var(--border-color)] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard"
              />
              <div
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-md cursor-pointer border border-gray-300"
                style={{
                  background:
                    "linear-gradient(90deg, #ff0000, #00ff00, #0000ff, #ffff00)",
                }}
                onClick={() => setOpenModal(true)}
              ></div>
              <div
                className="absolute right-12 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-md cursor-pointer border border-gray-300"
                style={{ backgroundColor: color.hex }}
                onClick={() => setOpenModal(true)}
              ></div>

              <Modal
                onSubmitHandler={() => setOpenModal(false)}
                isOpen={openModal}
                title={"Pick a color"}
                button1={"Set"}
                cancelButton={false}
              >
                <ColorPicker color={color} onChange={setColor} />
              </Modal>
            </div>
          </div>
        </div>

        {/* Description Field */}
        <div className="space-y-2 md:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-[var(--text-color)] font-yantramanav"
          >
            Description
          </label>
          <textarea
            onChange={handleChange}
            value={formData.description}
            placeholder="Enter product description"
            name="description"
            id="description"
            rows="4"
            required
            className="w-full px-4 py-2.5 font-imprima rounded-lg border border-[var(--border-color)] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard"
          />
        </div>

        {/* Image Upload Field */}
        <div className="space-y-2 md:col-span-2">
          <label
            htmlFor="images"
            className="block text-sm font-medium text-[var(--text-color)] font-yantramanav"
          >
            Upload Image or Use Camera
          </label>
          <input
            type="file"
            name="images"
            id="images"
            onChange={handleChange}
            accept="image/*"
            capture="environment"
            multiple
            required
            className="w-full px-4 py-2.5 font-imprima rounded-lg border border-[var(--border-color)] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard placeholder-[var(--border-color)]"
          />
          <p className="text-xs text-gray-500">
            You can upload files or use your camera to capture images. (Accepted
            formats: JPG, PNG, GIF)
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="sizes"
            className="block text-sm font-medium text-[var(--text-color)]"
          >
            Sizes
          </label>
          <div className="flex gap-2 flex-wrap">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`w-12 h-12 flex items-center justify-center font-medium border rounded-md cursor-pointer ${
                  formData.sizes.includes(size)
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-transparent text-[var(--text-color)] border-[var(--border-color)]"
                } transition duration-200`}
              >
                {size}
              </button>
            ))}
          </div>
          <input
            type="hidden"
            name="sizes"
            value={selectedSizes.join(",")}
            id="sizes"
          />
        </div>

        {/* Tags Field */}
        <div className="space-y-2">
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-[var(--text-color)]"
          >
            Tags
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            placeholder="Comma-separated tags"
            className="w-full px-4 py-2.5 font-imprima rounded-lg border border-[var(--border-color)] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard placeholder-[var(--border-color)]"
          />
        </div>

        {/* Originality Field */}
        <div className="space-y-2">
          <label
            htmlFor="isOriginal"
            className="block text-sm font-medium text-[var(--text-color)] font-yantramanav"
          >
            Original Product
          </label>
          <select
            name="isOriginal"
            id="isOriginal"
            required
            className="w-full px-4 py-2.5 font-imprima rounded-lg border border-[var(--border-color)] bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-standard"
          >
            {["Yes", "No"].map((option) => (
              <option value="true" className="bg-[var(--bg-color)]">
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end pt-4 space-x-3">
        <button
          onClick={() => setParentModal(false)}
          className="bg-red-500 text-white px-5 py-2 font-muktaVaani rounded-md hover:bg-red-600 transition duration-200"
        >
          Close
        </button>

        <button
          type="submit"
          className="bg-green-600 text-white px-5 py-2 rounded-md font-muktaVaani hover:bg-green-700 transition duration-200"
        >
          Add Product
        </button>
      </div>
    </form>
  );
}
